#!/bin/bash

# ============================================
# Agentic SaaS Talks Rsync Deployment Script
# ============================================
# Much faster than FTP - only transfers changed bytes
#
# Setup:
#   1. Enable SSH in Hostinger hPanel (Websites > Dashboard > SSH Access)
#   2. Add your SSH public key to Hostinger
#   3. chmod +x deploy.sh
#
# Usage:
#   ./deploy.sh              # Build and deploy
#   ./deploy.sh --dry        # Preview what would be uploaded (no changes)
#   ./deploy.sh --skip-build # Deploy without rebuilding
# ============================================

# CONFIGURATION - Hostinger SSH details
SSH_USER="u951885034"
SSH_HOST="191.101.13.61"
SSH_PORT="65002"
SSH_KEY="$HOME/.ssh/id_ed25519"
REMOTE_DIR="/home/${SSH_USER}/domains/agentic-saas-talks.com/public_html"
LOCAL_DIR="./out"

# IndexNow configuration
INDEXNOW_KEY="9e1acafdcd794350a153a4cdf2450147"
SITE_HOST="agentic-saas-talks.com"

# Parse arguments
DRY_RUN=""
SKIP_BUILD=false

for arg in "$@"; do
    case $arg in
        --dry)
            DRY_RUN="--dry-run"
            ;;
        --skip-build)
            SKIP_BUILD=true
            ;;
    esac
done

echo "=========================================="
echo "Agentic SaaS Talks Rsync Deployment"
if [ -n "$DRY_RUN" ]; then
    echo "(DRY RUN - no files will be transferred)"
fi
echo "=========================================="
echo ""

# Step 1: Build (unless skipped)
if [ "$SKIP_BUILD" = false ]; then
    echo "[1/6] Building Next.js static site..."
    npm run build

    if [ $? -ne 0 ]; then
        echo "ERROR: Build failed!"
        exit 1
    fi
else
    echo "[1/6] Skipping build (--skip-build)"
fi

# Verify build output exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo "ERROR: Build output directory '$LOCAL_DIR' not found!"
    echo "Run 'npm run build' first."
    exit 1
fi

# Step 2: Deploy with rsync
echo ""
echo "[2/6] Deploying to ${SSH_HOST}..."
echo "      Local:  ${LOCAL_DIR}/"
echo "      Remote: ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"
echo ""

rsync -avz --progress --delete \
    $DRY_RUN \
    -e "ssh -p ${SSH_PORT} -i ${SSH_KEY}" \
    "${LOCAL_DIR}/" \
    "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Rsync failed!"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Ensure SSH is enabled in Hostinger hPanel"
    echo "  2. Add your SSH public key to Hostinger"
    echo "  3. Test SSH connection: ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST}"
    exit 1
fi

# Step 3: Notify IndexNow (skip on dry run)
if [ -z "$DRY_RUN" ]; then
    echo ""
    echo "[3/6] Notifying IndexNow..."

    SITEMAP="${LOCAL_DIR}/sitemap.xml"
    if [ -f "$SITEMAP" ]; then
        # Extract URLs from sitemap.xml
        URLS=$(grep -oP '<loc>\K[^<]+' "$SITEMAP")
        URL_LIST=""
        for url in $URLS; do
            if [ -n "$URL_LIST" ]; then
                URL_LIST="${URL_LIST},"
            fi
            URL_LIST="${URL_LIST}\"${url}\""
        done

        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
            -H "Content-Type: application/json; charset=utf-8" \
            -d "{
                \"host\": \"${SITE_HOST}\",
                \"key\": \"${INDEXNOW_KEY}\",
                \"keyLocation\": \"https://${SITE_HOST}/${INDEXNOW_KEY}.txt\",
                \"urlList\": [${URL_LIST}]
            }")

        URL_COUNT=$(echo "$URLS" | wc -l)
        if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "202" ]; then
            echo "      IndexNow notified successfully (${URL_COUNT} URLs, HTTP ${RESPONSE})"
        else
            echo "      IndexNow notification returned HTTP ${RESPONSE} (non-fatal)"
        fi
    else
        echo "      Sitemap not found at ${SITEMAP}, skipping IndexNow"
    fi
fi

# Step 4: Purge Cloudflare cache (skip on dry run)
# The zone has a cache-everything rule (4h edge TTL), so deploys are stale
# for up to 4h unless we purge. Token lives at ~/.cloudflare-token.
if [ -z "$DRY_RUN" ]; then
    echo ""
    echo "[4/6] Purging Cloudflare cache..."
    CF_ZONE="ad15899b816fb724b67ab95c75c3891e"
    if [ -f "$HOME/.cloudflare-token" ]; then
        CF_TOKEN=$(cat "$HOME/.cloudflare-token")
        CF_RESP=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
            "https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/purge_cache" \
            -H "Authorization: Bearer ${CF_TOKEN}" \
            -H "Content-Type: application/json" \
            --data '{"purge_everything":true}')
        if [ "$CF_RESP" = "200" ]; then
            echo "      Cloudflare cache purged (HTTP ${CF_RESP})"
        else
            echo "      Cloudflare purge returned HTTP ${CF_RESP} (non-fatal)"
        fi
    else
        echo "      ~/.cloudflare-token not found, skipping purge"
    fi
fi

# Step 5: Warm the edge cache (skip on dry run)
# Hostinger's shared WAF 403s some origin fetches it cannot be told to allow
# (in Sep 2026 about 1 in 10 for Bingbot and GPTBot). After a purge every page
# is an origin fetch for whoever asks first, so we ask first: once a page is
# cached, crawlers get Cloudflare's copy for the 4h TTL.
if [ -z "$DRY_RUN" ] && [ -f "${LOCAL_DIR}/sitemap.xml" ]; then
    echo ""
    echo "[5/6] Warming Cloudflare cache..."
    WARM_OK=0; WARM_FAIL=""
    for url in $(grep -oP '<loc>\K[^<]+' "${LOCAL_DIR}/sitemap.xml") "https://${SITE_HOST}/sitemap.xml" "https://${SITE_HOST}/robots.txt"; do
        code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
        if [ "$code" = "200" ]; then WARM_OK=$((WARM_OK + 1)); else WARM_FAIL="${WARM_FAIL} ${code}:${url}"; fi
    done
    echo "      ${WARM_OK} URLs cached${WARM_FAIL:+, not cached:${WARM_FAIL}}"
fi

# Step 6: Resubmit the sitemap to Google (skip on dry run)
# IndexNow reaches Bing and Yandex only; Google re-reads a sitemap when it is resubmitted.
if [ -z "$DRY_RUN" ]; then
    echo ""
    echo "[6/6] Resubmitting sitemap to Google Search Console..."
    if [ -f "$HOME/.gsc-credentials.json" ]; then
        GSC_OUT=$(python3 "$(dirname "$0")/scripts/submit-sitemap.py" 2>&1 | tail -1)
        echo "      ${GSC_OUT}"
    else
        echo "      ~/.gsc-credentials.json not found, skipping"
    fi
fi

echo ""
echo "=========================================="
if [ -n "$DRY_RUN" ]; then
    echo "Dry run complete! Run without --dry to deploy."
else
    echo "Deployment complete!"
fi
echo "=========================================="
echo "Site: https://agentic-saas-talks.com"
