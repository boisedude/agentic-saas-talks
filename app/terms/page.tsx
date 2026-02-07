import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Agentic SaaS Talks website.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Last updated: February 7, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">About This Website</h2>
            <p>
              Agentic SaaS Talks is an informational website that serves as a companion to a
              YouTube webcast series about AI, SaaS, and agentic architectures. This site is not
              owned or operated by any corporation. It does not sell any products or services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Informational Use Only
            </h2>
            <p>
              All content on this website &mdash; including episode descriptions, blog posts,
              guest biographies, and timestamps &mdash; is provided for informational and
              educational purposes only. Nothing on this site constitutes professional, legal,
              financial, or technical advice.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Opinions and Views
            </h2>
            <p>
              The views and opinions expressed by hosts, guests, and blog authors are their own
              and do not necessarily reflect the views of this website, its operators, its sponsor,
              or any affiliated organizations. Guest appearances do not imply endorsement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Video Content
            </h2>
            <p>
              Episode videos are hosted on YouTube and are subject to the{" "}
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                YouTube Terms of Service
              </a>
              . This website does not host, stream, or embed video content. Thumbnails displayed
              on this site are loaded from YouTube&apos;s public image servers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Guest and Host Information
            </h2>
            <p>
              This website displays publicly available information about webcast guests and hosts,
              including names, professional bios, and links to public LinkedIn profiles. This
              information is used for editorial purposes in connection with the webcast series.
            </p>
            <p className="mt-3">
              If you are a featured guest or host and would like your information corrected or
              removed, please contact us at{" "}
              <a
                href="mailto:guest@agentic-saas-talks.com"
                className="text-blue-400 underline hover:text-blue-300"
              >
                guest@agentic-saas-talks.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              External Links
            </h2>
            <p>
              This website contains links to third-party websites including YouTube, LinkedIn, and
              our sponsor&apos;s website. We are not responsible for the content, privacy
              practices, or availability of these external sites. Following any external link is at
              your own discretion.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Intellectual Property
            </h2>
            <p>
              Website design and original written content (blog posts, episode descriptions) are
              the property of Agentic SaaS Talks. Video content is the property of its respective
              creators and is hosted on YouTube. Guest names and likenesses are used with
              permission for promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Limitation of Liability
            </h2>
            <p>
              This website and its content are provided &quot;as is&quot; without warranties of
              any kind, either express or implied. We are not liable for any damages arising from
              your use of this website, reliance on its content, or interaction with any
              third-party services linked from it.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Changes to These Terms
            </h2>
            <p>
              We may update these terms from time to time. Changes will be posted on this page
              with an updated revision date. Continued use of the website after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Contact</h2>
            <p>
              If you have questions about these terms, you can reach us at{" "}
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
