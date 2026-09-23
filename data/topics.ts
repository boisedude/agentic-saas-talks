// Per-topic page copy, keyed by episode tag. `title` and `intro` lead with the phrase
// people search for (volumes from DataForSEO, 2026-09); a tag missing here falls back
// to generic copy. The intro is the page's meta description and its visible lede.
export interface TopicCopy {
  title: string
  intro: string
}

export const topicCopy: Record<string, TopicCopy> = {
  "AI & Agents": {
    title: "What Is Agentic AI? Episodes on AI Agents",
    intro:
      "Agentic AI is software that plans, calls tools and acts toward a goal with limited human input, instead of answering one prompt at a time. These episodes cover agentic AI examples from production: sales agent swarms, coding agents, agent governance and the economics of running agents all day.",
  },
  "AI Architecture": {
    title: "Agentic Architecture Episodes",
    intro:
      "How to design AI applications that reason, act and scale: agentic architecture patterns, memory and context for agents, and deploying AI into customer clouds.",
  },
  "Cloud Infrastructure": {
    title: "BYOC and Control Plane Episodes",
    intro:
      "BYOC (Bring Your Own Cloud) runs a vendor's software inside the customer's own cloud account while the vendor still operates it. These episodes cover BYOC, SaaS control planes, air-gapped deployment and delivering software across AWS, other clouds and on-prem.",
  },
  "Data & Databases": {
    title: "DBaaS and Vector Search Episodes",
    intro:
      "Database as a service (DBaaS) in the AI era: Postgres as a service, vector search and hybrid retrieval, databases on Kubernetes, and keeping data consistent across many databases.",
  },
  "Developer Experience": {
    title: "AI Coding Agents and Developer Experience Episodes",
    intro:
      "How AI coding agents change software development: spec-driven development, testing AI-generated code, and taking a feature from customer feedback to shipped code.",
  },
  "Founder Stories": {
    title: "Founder Stories: AI and SaaS Startup Interviews",
    intro:
      "Founders and engineering leaders on building AI and SaaS companies: what they built, what broke, and what they would do differently.",
  },
  "Growth & Pricing": {
    title: "SaaS Pricing Models and AWS Marketplace Episodes",
    intro:
      "SaaS pricing models, packaging and subscription growth, plus selling through AWS Marketplace and other cloud marketplaces.",
  },
  "Open Source": {
    title: "Open Source AI and Business Model Episodes",
    intro:
      "Turning open source AI projects into businesses: open source business models, licensing in the age of AI, open core, and taking open source software to production on AWS.",
  },
  "SaaS Strategy": {
    title: "The Future of SaaS: Strategy Episodes",
    intro:
      "Is SaaS dead, or changing shape? These episodes cover the future of SaaS in the agentic era: deployment models, pricing, go-to-market and how AI changes what a SaaS company sells.",
  },
  "Security & Identity": {
    title: "Zero Trust and AI Security Episodes",
    intro:
      "Security when software runs close to customer data: zero trust between vendor and customer, keeping data in the customer's own account, and fighting identity fraud with AI.",
  },
}
