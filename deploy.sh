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
    echo "[1/3] Building Next.js static site..."
    npm run build

    if [ $? -ne 0 ]; then
        echo "ERROR: Build failed!"
        exit 1
    fi
else
    echo "[1/3] Skipping build (--skip-build)"
fi

# Verify build output exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo "ERROR: Build output directory '$LOCAL_DIR' not found!"
    echo "Run 'npm run build' first."
    exit 1
fi

# Step 2: Deploy with rsync
echo ""
echo "[2/3] Deploying to ${SSH_HOST}..."
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
    echo "[3/3] Notifying IndexNow..."

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

echo ""
echo "=========================================="
if [ -n "$DRY_RUN" ]; then
    echo "Dry run complete! Run without --dry to deploy."
else
    echo "Deployment complete!"
fi
echo "=========================================="
echo "Site: https://agentic-saas-talks.com"
