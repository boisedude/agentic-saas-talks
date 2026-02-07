import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Agentic SaaS Talks website.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Last updated: February 7, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Overview</h2>
            <p>
              Agentic SaaS Talks (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the
              website at agentic-saas-talks.com. This is an informational website providing
              educational content about AI, SaaS, and agentic architectures. It is not owned or
              operated by any corporation and does not sell any products or services.
            </p>
            <p className="mt-3">
              This page describes what information is collected when you visit the site and how it
              is used.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Information We Collect</h2>
            <p>
              We use Google Analytics (measurement ID: G-3TLS4354D6) to collect anonymous usage
              data about how visitors interact with our website. This includes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or source</li>
              <li>Browser type and device information</li>
              <li>Approximate geographic location (country/city level)</li>
              <li>Interactions such as clicks and scrolls</li>
            </ul>
            <p className="mt-3">
              We do not collect personally identifiable information such as your name, email
              address, or phone number through our website or analytics. We do not require account
              creation, logins, or form submissions of any kind.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Cookies</h2>
            <p>
              Google Analytics uses cookies to distinguish unique users and to throttle the
              request rate. The primary cookies are:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">_ga</strong> &mdash; Used to distinguish
                users. Expires after 2 years.
              </li>
              <li>
                <strong className="text-foreground">_ga_&lt;ID&gt;</strong> &mdash; Used to
                persist session state. Expires after 2 years.
              </li>
            </ul>
            <p className="mt-3">
              These cookies are set by Google and are subject to{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Google&apos;s Privacy Policy
              </a>
              . No other cookies are set by this website. You can disable cookies in your browser
              settings at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Third-Party Services</h2>
            <p>
              Our website links to and loads content from third-party services. When you interact
              with these services, their own privacy policies apply. We have no control over the
              data these services collect.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">YouTube (Google)</strong> &mdash; Episode
                thumbnails are loaded from YouTube&apos;s image servers (i.ytimg.com). When you
                click to watch an episode, you leave this site and are directed to YouTube, which
                is subject to{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">LinkedIn</strong> &mdash; We link to host and
                guest LinkedIn profiles. Clicking these links takes you to LinkedIn, which is
                subject to{" "}
                <a
                  href="https://www.linkedin.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  LinkedIn&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Omnistrate</strong> &mdash; Our sponsor&apos;s
                website is linked from the homepage and footer. Visiting their site is subject to
                Omnistrate&apos;s own privacy policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Guest and Host Information
            </h2>
            <p>
              This website displays publicly available, non-sensitive information about podcast
              hosts and guests, including names, professional bios, and links to public LinkedIn
              profiles. This information is published for editorial and promotional purposes
              related to the webcast series.
            </p>
            <p className="mt-3">
              If you are a guest or host and would like your information updated or removed,
              please contact us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Data Retention</h2>
            <p>
              Analytics data is retained in Google Analytics for the default retention period of
              14 months. We do not store any personal data on our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Your Choices</h2>
            <p>
              You can opt out of Google Analytics tracking by:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
              <li>Disabling cookies in your browser settings</li>
              <li>Using a browser with built-in tracking protection</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Children&apos;s Privacy</h2>
            <p>
              This website is not directed at children under the age of 13. We do not knowingly
              collect any personal information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Contact</h2>
            <p>
              If you have questions about this privacy policy, you can reach us at{" "}
              <a
                href="mailto:guest@agentic-saas-talks.com"
                className="text-blue-400 underline hover:text-blue-300"
              >
                guest@agentic-saas-talks.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
