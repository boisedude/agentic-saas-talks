#!/usr/bin/env python3
"""Ask Google Search Console how each sitemap URL is indexed, and summarize.

Uses the URL Inspection API (quota 2,000 calls/day; each call takes seconds, so a
full run is 10 to 30 minutes). Prints a count per coverage state, then every URL
that is not "Submitted and indexed". Credential and setup: see submit-sitemap.py.

Run from the repo root as `python3 -P scripts/gsc-coverage.py` (the -P keeps the
scripts directory off sys.path so nothing here shadows a stdlib module).
"""
import collections
import os
import re
import sys
import time
import urllib.request

PROPERTY = "sc-domain:agentic-saas-talks.com"
SITEMAP = "https://agentic-saas-talks.com/sitemap.xml"
CREDS = os.path.expanduser("~/.gsc-credentials.json")

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
except ImportError:
    sys.exit("google-api-python-client not installed (see submit-sitemap.py)")

creds = service_account.Credentials.from_service_account_file(
    CREDS, scopes=["https://www.googleapis.com/auth/webmasters"]
)
inspect = build("searchconsole", "v1", credentials=creds, cache_discovery=False).urlInspection().index()

xml = urllib.request.urlopen(
    urllib.request.Request(SITEMAP, headers={"User-Agent": "Mozilla/5.0"})
).read().decode()
urls = [u for u in re.findall(r"<loc>(.*?)</loc>", xml) if not re.search(r"\.(png|jpe?g|webp)$", u)]
print(f"{len(urls)} page URLs in the sitemap", flush=True)

rows = []
for url in urls:
    for attempt in range(3):
        try:
            r = inspect.inspect(body={"inspectionUrl": url, "siteUrl": PROPERTY}).execute()
            r = r["inspectionResult"]["indexStatusResult"]
            rows.append((url, r.get("coverageState", "?"), r.get("lastCrawlTime", "")[:10]))
            break
        except Exception as e:  # transient 500s and timeouts are routine on this API
            if attempt == 2:
                rows.append((url, f"ERROR: {str(e)[:80]}", ""))
            time.sleep(2 * (attempt + 1))
    time.sleep(0.3)

print()
for state, n in collections.Counter(r[1] for r in rows).most_common():
    print(f"{n:3}  {state}")
print()
for url, state, crawled in rows:
    if state != "Submitted and indexed":
        print(f"{state:40} {crawled:10} {url}")
