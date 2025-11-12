// TypeScript type definitions
export interface Timestamp {
  time: string
  title: string
}

export interface Guest {
  name: string
  linkedIn: string
  bio: string
  photo?: string
}

export interface Episode {
  id: number
  title: string
  description: string
  date: string
  videoUrl: string
  duration: string
  tags: string[]
  timestamps?: Timestamp[]
  guests?: Guest[]
}

// All episodes from the Agentic SaaS Talks playlist (newest first)
export const episodes: Episode[] = [
  {
    id: 17,
    title: "Agentic Architectures: Building AI Apps that Think and Scale",
    description: "AI applications are evolving from simple prompt-driven tools into agentic systems — intelligent applications that can reason, act, and adapt. But as builders race to bring these apps to market, the same questions keep coming up: What should we build ourselves? What should we leverage from the ecosystem? And how do we operate these apps as a managed service at scale? In this session, our guests unpack the architectural patterns, design choices, and deployment models shaping the next wave of agentic innovation. From front-end frameworks like Vercel + Next.js, to AWS-native AI services, to control planes that automate everything between — this is a blueprint for taking your Agentic App from prototype to managed platform.",
    date: "2025-01-20",
    videoUrl: "https://www.youtube.com/watch?v=g3L5RVtQb4s",
    duration: "57 min",
    tags: ["AI Architecture", "Agentic Systems", "SaaS"],
    timestamps: [
      { time: "00:00", title: "Welcome & Setting the Stage: Agentic Future of SaaS" },
      { time: "04:15", title: "What Is MCP? Building Human-Language APIs" },
      { time: "10:30", title: "Data Privacy, Speed & Human in the Loop" },
      { time: "17:45", title: "Architecting the Future: Frontend to Backend Evolution" },
      { time: "24:50", title: "AI Compute Meets Data Sovereignty" },
      { time: "32:10", title: "Disposable SaaS & the Rise of Fast-Fashion Software" },
      { time: "38:25", title: "Agentic Architectures & Personalized Applications" },
      { time: "45:10", title: "Data as the Ultimate Moat in the Agentic Economy" },
      { time: "51:00", title: "New AI Tools & Discoveries of the Week" },
      { time: "55:10", title: "Closing Thoughts: The CLI Comeback & The Future of Workflows" },
    ],
  },
  {
    id: 16,
    title: "From SaaS to Agentic SaaS: Autonomy, Orchestration & Opportunity",
    description: "Exploring the evolution from traditional SaaS to Agentic SaaS, discussing autonomous systems, orchestration patterns, and the opportunities this shift creates for builders and operators.",
    date: "2024-12-16",
    videoUrl: "https://www.youtube.com/watch?v=5v5BWl9l4OY",
    duration: "51 min",
    tags: ["Agentic SaaS", "Autonomy", "Orchestration"],
  },
  {
    id: 15,
    title: "Evolution of DBaaS with Xata Founder",
    description: "Deep dive into the evolution of Database as a Service (DBaaS) with the founder of Xata, exploring modern approaches to database management and the future of data infrastructure.",
    date: "2024-12-02",
    videoUrl: "https://www.youtube.com/watch?v=reDzpXynnEw",
    duration: "67 min",
    tags: ["DBaaS", "Database", "Infrastructure"],
  },
  {
    id: 14,
    title: "Accelerating Dev Experience & SaaS Testing",
    description: "Discussion on improving developer experience and implementing effective testing strategies for SaaS applications at scale.",
    date: "2024-11-25",
    videoUrl: "https://www.youtube.com/watch?v=UaPP1X6LpiY",
    duration: "64 min",
    tags: ["Developer Experience", "Testing", "SaaS"],
  },
  {
    id: 13,
    title: "From Chaos to Control with Omnistrate's Founders",
    description: "The Omnistrate founders share their journey from navigating chaos in software distribution to building a control plane that brings order and scalability.",
    date: "2024-10-28",
    videoUrl: "https://www.youtube.com/watch?v=Wp1iEZnhJ-o",
    duration: "62 min",
    tags: ["Control Plane", "Omnistrate", "SaaS Operations"],
  },
  {
    id: 12,
    title: "Founders, Fraud, and the Future of AI with Joshua Mckenty",
    description: "Joshua Mckenty, founder of Polyguard AI, discusses the intersection of fraud detection, AI, and the challenges facing modern founders.",
    date: "2024-10-21",
    videoUrl: "https://www.youtube.com/watch?v=VVMJdjrx7Fw",
    duration: "68 min",
    tags: ["AI", "Fraud Detection", "Startups"],
  },
  {
    id: 11,
    title: "From Prompt to Product AI with OriginAI CEO",
    description: "The CEO of OriginAI shares insights on taking AI from prompt engineering to production-ready products.",
    date: "2024-09-16",
    videoUrl: "https://www.youtube.com/watch?v=OcLtP30pRhI",
    duration: "65 min",
    tags: ["AI Products", "Prompt Engineering", "Production AI"],
  },
  {
    id: 10,
    title: "Mastering Growth Through Subscription with AWS Experts",
    description: "AWS experts and Capgemini Director discuss subscription-based growth models and strategies for SaaS businesses.",
    date: "2024-09-09",
    videoUrl: "https://www.youtube.com/watch?v=XL8kWY_QuQw",
    duration: "62 min",
    tags: ["Subscriptions", "Growth", "AWS"],
  },
  {
    id: 9,
    title: "Inside the AI Agent Swarm with Rox CTO",
    description: "The CTO of Rox provides an inside look at AI agent swarms and multi-agent coordination systems.",
    date: "2024-08-26",
    videoUrl: "https://www.youtube.com/watch?v=oHH2Nmv-h28",
    duration: "57 min",
    tags: ["AI Agents", "Multi-Agent Systems", "Coordination"],
  },
  {
    id: 8,
    title: "Pricing and Packaging for SaaS Companies",
    description: "AWS experts and Schematic founder discuss pricing strategies and packaging approaches for successful SaaS businesses.",
    date: "2024-08-19",
    videoUrl: "https://www.youtube.com/watch?v=7s_CmfUqWQY",
    duration: "61 min",
    tags: ["Pricing", "Packaging", "SaaS Strategy"],
  },
  {
    id: 7,
    title: "The Spine AI Story with Ashwin Raman",
    description: "Ashwin Raman shares the journey and vision behind Spine AI.",
    date: "2024-08-12",
    videoUrl: "https://www.youtube.com/watch?v=d5FfOJoYcDc",
    duration: "60 min",
    tags: ["AI", "Startup Journey", "Spine AI"],
  },
  {
    id: 6,
    title: "Building Vertical SaaS with Plotline and Checkly Leaders",
    description: "Leaders from Plotline and Checkly discuss building and scaling vertical SaaS businesses.",
    date: "2024-08-05",
    videoUrl: "https://www.youtube.com/watch?v=AuGAgLANqxU",
    duration: "59 min",
    tags: ["Vertical SaaS", "Product Strategy", "Scaling"],
  },
  {
    id: 5,
    title: "From Idea to Launch: The AutoBlocks Journey with Adam Nolte",
    description: "Adam Nolte shares the AutoBlocks journey from initial idea to successful product launch.",
    date: "2024-07-29",
    videoUrl: "https://www.youtube.com/watch?v=TEFW1zesu2k",
    duration: "56 min",
    tags: ["Product Launch", "Startup Journey", "AutoBlocks"],
  },
  {
    id: 4,
    title: "From Startup to Scale-up with Confluent",
    description: "The Head of Global Partnerships at Confluent discusses the transition from startup to scale-up phase.",
    date: "2024-07-22",
    videoUrl: "https://www.youtube.com/watch?v=eu94ja61HKM",
    duration: "61 min",
    tags: ["Scaling", "Partnerships", "Confluent"],
  },
  {
    id: 3,
    title: "SaaS Deployment Models — From Fully Hosted to BYOC",
    description: "AWS and Omnistrate experts explore various SaaS deployment models including fully hosted, BYOC (Bring Your Own Cloud), and hybrid approaches.",
    date: "2024-07-15",
    videoUrl: "https://www.youtube.com/watch?v=GBnflK7Dnfo",
    duration: "61 min",
    tags: ["Deployment Models", "BYOC", "Cloud Architecture"],
  },
  {
    id: 2,
    title: "The Importance of Cloud Marketplaces with Labra's CEO",
    description: "Labra's CEO discusses the growing importance of cloud marketplaces for SaaS distribution and growth.",
    date: "2024-07-08",
    videoUrl: "https://www.youtube.com/watch?v=pK9_l1eAvRk",
    duration: "49 min",
    tags: ["Cloud Marketplaces", "Distribution", "AWS Marketplace"],
  },
  {
    id: 1,
    title: "How will AI Impact SaaS Builders",
    description: "AWS experts discuss how AI is transforming the SaaS landscape and what it means for builders and operators.",
    date: "2024-07-01",
    videoUrl: "https://www.youtube.com/watch?v=NwyIMZbhJno",
    duration: "64 min",
    tags: ["AI Impact", "SaaS", "AWS"],
  },
]
