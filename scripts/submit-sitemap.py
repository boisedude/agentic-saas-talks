#!/usr/bin/env python3
"""Resubmit the sitemap to Google Search Console, so Google re-reads it after a deploy.

Google retired sitemap pings in 2023; a Search Console submit is the supported way to
say "this changed". Without it, Google re-read this sitemap once (2026-02-07, when it
listed 6 URLs) and not again for seven months.

Credential: the service account at ~/.gsc-credentials.json (full user on the property).
Setup (once): pip install --user --break-system-packages google-auth google-api-python-client
"""
import os
import sys

PROPERTY = "sc-domain:agentic-saas-talks.com"
SITEMAP = "https://agentic-saas-talks.com/sitemap.xml"
CREDS = os.path.expanduser("~/.gsc-credentials.json")

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
except ImportError:
    sys.exit("google-api-python-client not installed (see docstring)")

creds = service_account.Credentials.from_service_account_file(
    CREDS, scopes=["https://www.googleapis.com/auth/webmasters"]
)
sitemaps = build("searchconsole", "v1", credentials=creds, cache_discovery=False).sitemaps()
sitemaps.submit(siteUrl=PROPERTY, feedpath=SITEMAP).execute()
state = sitemaps.get(siteUrl=PROPERTY, feedpath=SITEMAP).execute()
print(f"submitted; last read by Google {state.get('lastDownloaded', 'never')}")
