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

/** Find an episode by its numeric ID */
export function getEpisodeById(id: number): Episode | undefined {
  return episodes.find((ep) => ep.id === id)
}

// All episodes from the Agentic SaaS Talks playlist (newest first)
export const episodes: Episode[] = [
  {
    id: 24,
    title: "Agentic SaaS Talks — 2025 Year in Review",
    description: "The first show of the new year as the hosts look back on a full year of conversations from the podcast. Bill Tarr, Markus Kaiser, Ermin Dzinic, Kamal Gupta, and host Michael Cooper share the most important lessons learned from founders, operators, and cloud leaders across SaaS, AI, and modern cloud platforms — and what those lessons mean heading into 2026.",
    date: "2026-01-09",
    videoUrl: "https://www.youtube.com/watch?v=-nOw7Gr07S4",
    duration: "56 min",
    tags: ["AI & Agents", "SaaS Strategy", "Cloud Infrastructure"],
  },
  {
    id: 20,
    title: "The Agentic SaaS Executive Summit - Live Event",
    description: "A live summit event featuring two panel discussions: 'Agentic AI: Revolution, Evolution or Hype?' examining how Agentic AI is reshaping the SaaS landscape, and 'Commercializing Open Source: Paths, Tradeoffs & Lessons' exploring strategies for building sustainable businesses around open technologies.",
    date: "2025-12-02",
    videoUrl: "https://www.youtube.com/watch?v=LFNcqf9oolY",
    duration: "105 min",
    tags: ["AI & Agents", "Open Source", "SaaS Strategy"],
    timestamps: [
      { time: "00:00", title: "Introduction & Welcome" },
      { time: "15:00", title: "Panel 1: Agentic AI - Revolution, Evolution or Hype?" },
      { time: "60:00", title: "Panel 2: Commercializing Open Source" },
    ],
    guests: [
      {
        name: "Shriram Sridharan",
        linkedIn: "https://www.linkedin.com/in/shrirams/",
        bio: "CTO at Rox, building enterprise AI agent swarms."
      },
      {
        name: "Guy Korland",
        linkedIn: "https://www.linkedin.com/in/guykorland/",
        bio: "CEO at FalkorDB, leading graph database innovation."
      },
      {
        name: "Mihir Pandya",
        linkedIn: "https://www.linkedin.com/in/mihirpandya/",
        bio: "Director of Engineering at Scale AI."
      },
      {
        name: "Peter Farkas",
        linkedIn: "https://www.linkedin.com/in/peterfarkaspercona/",
        bio: "CEO at Percona, enterprise open source database solutions."
      },
      {
        name: "Peter Zaitsev",
        linkedIn: "https://www.linkedin.com/in/peterzaitsev/",
        bio: "Founder at Percona, pioneer in open source database technology."
      }
    ],
  },
  {
    id: 19,
    title: "Leaning into Agentic: How HoneySales Pivoted to an AI-Driven Future",
    description: "Episode 19 examines what it means to pivot a SaaS company into an agentic architecture. HoneySales provides a real-world example: a startup that shifted from traditional sales workflows to an AI-driven, multi-agent system operating on AWS. This episode helps founders and engineering leaders understand the technical, organizational, and customer-facing implications of transitioning to Agentic SaaS.",
    date: "2025-11-28",
    videoUrl: "https://www.youtube.com/watch?v=8rcMqtsPDaI",
    duration: "58 min",
    tags: ["AI & Agents", "SaaS Strategy", "Founder Stories"],
    guests: [
      {
        name: "Denis Zatsepin",
        linkedIn: "https://www.linkedin.com/in/denis-zatsepin/",
        bio: "Founder and CEO of HoneySales, leading the company's pivot to an AI-driven, agentic sales platform.",
      }
    ],
  },
  {
    id: 18,
    title: "Deploying Agentic Applications: From Multi-Tenant to \"SaaS Anywhere\"",
    description: "In today's session, we're unpacking one of the most critical questions for modern AI companies: How do you actually deploy agentic applications? Join us as we break down how agentic systems will be deployed at scale, what changes SaaS companies must prepare for, and what the future of agent-driven architectures looks like.",
    date: "2025-11-14",
    videoUrl: "https://www.youtube.com/watch?v=zjG96VWKDZQ",
    duration: "66 min",
    tags: ["AI Architecture", "SaaS Strategy", "Cloud Infrastructure"],
    timestamps: [
      { time: "00:00", title: "Welcome to Agentic SaaS Talks Episode 18" },
      { time: "03:10", title: "Why SaaS Deployment Got Complicated" },
      { time: "10:25", title: "Enterprise Requirements: Compliance, Cost, Security & Latency" },
      { time: "17:40", title: "Common Real-World Patterns: Observability & Security Vendors" },
      { time: "22:55", title: "BYOC, BYOA, On-Prem & Hybrid Deployment Models" },
      { time: "30:45", title: "Three SaaS Deployment Patterns (Armen's Framework)" },
      { time: "37:05", title: "Cloud-Native Tools to Support SaaS Distribution (AWS Focus)" },
      { time: "45:20", title: "Control Plane vs Application Plane: Why Control Planes Matter" },
      { time: "52:40", title: "What Is Control Plane as a Service? (Omnistrate Deep Dive)" },
      { time: "1:00:10", title: "Future of Agentic Systems, Multi-Data Access & Closing Thoughts" },
    ],
  },
  {
    id: 21,
    title: "From Open-Source to SaaS with Head of Engineering at Onehouse",
    description: "Varun Madan, Head of Engineering at Onehouse, walks through the journey of transforming the open-source Apache Hudi project into a high-performance, enterprise-ready SaaS platform. Covers data lakehouse architecture, building SaaS offerings, and includes a live demo of real-time data ingestion.",
    date: "2025-10-10",
    videoUrl: "https://www.youtube.com/watch?v=xjeLLZHM3lY",
    duration: "23 min",
    tags: ["Open Source", "Data & Databases", "SaaS Strategy"],
    timestamps: [
      { time: "00:00", title: "Intro: Data Quality for Agentic AI" },
      { time: "01:15", title: "What is a Data Lakehouse & Why It Matters" },
      { time: "03:50", title: "Apache Hudi: From Uber to Open Source" },
      { time: "05:45", title: "Lake vs Warehouse vs Lakehouse" },
      { time: "08:00", title: "Key Lakehouse Features: Indexes, Metadata, Speed" },
      { time: "10:20", title: "From Open Source to SaaS: Building Onehouse" },
      { time: "13:00", title: "Solving Real-World Enterprise Data Challenges" },
      { time: "16:00", title: "Live Demo: Ingesting Kafka Data into Onehouse" },
      { time: "19:30", title: "Running AI Workloads with Ray" },
      { time: "21:30", title: "Final Thoughts & How to Get Started" },
    ],
    guests: [
      {
        name: "Varun Madan",
        linkedIn: "https://www.linkedin.com/in/varunmadan/",
        bio: "Head of Engineering at Onehouse, transforming Apache Hudi into enterprise SaaS."
      }
    ],
  },
  {
    id: 22,
    title: "Taming AI Complexity with Head of Engineering at Anyscale",
    description: "Jaikumar Ganesha (JK), Head of Engineering at Anyscale, breaks down modern AI infrastructure challenges and how Ray (the open-source compute framework) is powering production-grade AI at scale. Covers the 'AI complexity wall,' distributed training, and includes a live demo of building a multimodal AI app.",
    date: "2025-10-08",
    videoUrl: "https://www.youtube.com/watch?v=OzWr7wm7v_M",
    duration: "25 min",
    tags: ["AI Architecture", "Open Source", "Founder Stories"],
    timestamps: [
      { time: "00:00", title: "Intro & Speaker Welcome" },
      { time: "01:00", title: "AI Complexity Wall" },
      { time: "03:00", title: "Why 90% of AI projects never reach production" },
      { time: "04:30", title: "What is Ray? Introduction" },
      { time: "06:00", title: "Key Trends: Multimodal, Agentic AI & Post-Training" },
      { time: "09:00", title: "How Ray supports complex ML use cases" },
      { time: "12:00", title: "The Modern AI/ML Stack" },
      { time: "15:00", title: "Ray Data for Multimodal Workloads" },
      { time: "17:30", title: "Pipeline Example: Resize, Segment, Classify" },
      { time: "20:00", title: "Ray + Anyscale: Making Production Easy" },
      { time: "22:30", title: "Demo: Developer Workflow & Auto-Scaling" },
      { time: "24:00", title: "Recap & Try Ray Today" },
    ],
    guests: [
      {
        name: "Jaikumar Ganesha",
        linkedIn: "https://www.linkedin.com/in/jaikumarganesha/",
        bio: "Head of Engineering at Anyscale, scaling AI infrastructure with Ray."
      }
    ],
  },
  {
    id: 23,
    title: "Revolutionizing AI SaaS: Control Plane Innovation and Modern Cloud Models with Anyscale",
    description: "A conversation filmed at AWS offices in San Francisco about how Anyscale empowers teams to build, scale, and operate complex ML workflows. Covers control plane architecture, the evolution of SaaS, and advice for SaaS founders adapting to the agentic future.",
    date: "2025-08-20",
    videoUrl: "https://www.youtube.com/watch?v=HgoMTnS4i2o",
    duration: "14 min",
    tags: ["AI & Agents", "Cloud Infrastructure", "Founder Stories"],
    timestamps: [
      { time: "00:00", title: "Intro & Event Overview" },
      { time: "00:38", title: "What is Anyscale and its Value Proposition?" },
      { time: "01:31", title: "Ease of Operating Ray and SaaS Delivery Models" },
      { time: "04:19", title: "Use Cases: Media, Social, and Multimodal Data" },
      { time: "06:08", title: "Effortless Scaling, Cluster Management, and Developer Efficiency" },
      { time: "08:44", title: "Control Plane, Data Plane, and SaaS Models Explained" },
      { time: "09:43", title: "Is 'SaaS Dead'? The Evolution of Software Delivery" },
      { time: "12:28", title: "Advice for SaaS Founders in an Agentic and Cloud-First World" },
    ],
  },
  {
    id: 17,
    title: "Agentic Architectures: Building AI Apps that Think and Scale",
    description: "AI applications are evolving from simple prompt-driven tools into agentic systems — intelligent applications that can reason, act, and adapt. But as builders race to bring these apps to market, the same questions keep coming up: What should we build ourselves? What should we leverage from the ecosystem? And how do we operate these apps as a managed service at scale? In this session, our guests unpack the architectural patterns, design choices, and deployment models shaping the next wave of agentic innovation. From front-end frameworks like Vercel + Next.js, to AWS-native AI services, to control planes that automate everything between — this is a blueprint for taking your Agentic App from prototype to managed platform.",
    date: "2025-01-20",
    videoUrl: "https://www.youtube.com/watch?v=g3L5RVtQb4s",
    duration: "57 min",
    tags: ["AI Architecture", "AI & Agents", "SaaS Strategy"],
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
    description: "Welcome to Agentic SaaS Talks! For the past 16 episodes this series has been known as SaaS Monday, Live on Friday — our deep dives with AWS and some amazing founders and builders on how to design, build and scale great SaaS products. Today we're rebranding to reflect a massive shift in the industry: the rise of agentic systems — AI-driven software that acts autonomously, collaborates intelligently and continuously improves itself.",
    date: "2024-12-16",
    videoUrl: "https://www.youtube.com/watch?v=5v5BWl9l4OY",
    duration: "51 min",
    tags: ["AI & Agents", "SaaS Strategy"],
    timestamps: [
      { time: "00:00", title: "Intro: The Future of Agentic SaaS" },
      { time: "02:05", title: "Why SaaS Delivery Is Getting Cheaper & Faster" },
      { time: "07:12", title: "Fast-Fashion SaaS: Build, Launch, Discard" },
      { time: "11:48", title: "Balancing Speed with Security & Stability" },
      { time: "17:22", title: "How AI Is Transforming Back Office Operations" },
      { time: "23:40", title: "Building Guardrails for Agentic Apps" },
      { time: "30:10", title: "Infrastructure as Product: The New Paradigm" },
      { time: "38:55", title: "Real-World AI Agent Story: Lufthansa's Lisa" },
      { time: "44:45", title: "Data Retention, Privacy & Digital Legacy" },
      { time: "48:30", title: "Open-Source LLMs & Closing the AI Access Gap" },
    ],
  },
  {
    id: 15,
    title: "Evolution of DBaaS with Xata Founder",
    description: "Tudor Golubenco – CTO of Xata and co-founder of Packetbeat joins us to explore how DBaaS for Postgres has matured, what Builders need today, and where the next wave of innovation is headed. Postgres has long been a cornerstone open-source database. What's changed dramatically is how it's delivered as a managed service (DBaaS) — from the early days of AWS RDS to today's serverless, developer-first platforms like Xata.",
    date: "2024-12-02",
    videoUrl: "https://www.youtube.com/watch?v=reDzpXynnEw",
    duration: "67 min",
    tags: ["Data & Databases", "Cloud Infrastructure"],
    timestamps: [
      { time: "00:00", title: "Risks of AI Agents Modifying Production Databases" },
      { time: "07:15", title: "Protecting Data Integrity with Branches & Pre-Set Queries" },
      { time: "15:40", title: "Why Database Schema Changes Are Complex & Risky" },
      { time: "23:10", title: "Safe Schema Deployment: Branching & Deterministic Plans" },
      { time: "30:45", title: "Human Error vs Poor Tooling: Reducing Production Risks" },
      { time: "37:20", title: "AI Agents in Database Operations: Productivity & Limits" },
      { time: "44:00", title: "Leverage AI, Don't Delegate It Completely" },
      { time: "50:30", title: "Making Secure Best Practices the Easiest Path" },
      { time: "56:45", title: "Favorite AI Tools & Tips from the Experts" },
      { time: "1:02:30", title: "Using Agents.md Files to Improve AI Coding Accuracy" },
    ],
    guests: [
      {
        name: "Tudor Golubenco",
        linkedIn: "https://www.linkedin.com/in/tudor-golubenco/",
        bio: "CTO of Xata and co-founder of Packetbeat, bringing deep expertise in database systems and developer tooling."
      }
    ],
  },
  {
    id: 14,
    title: "Accelerating Dev Experience & SaaS Testing",
    description: "Exploring the future of SaaS Anywhere — how testing, virtualization, and cloud abstraction continue to move up the stack. Our guest of honor is Eli Aleyner, now Head of Technology Alliances at Docker and co-founder of AtomicJar, the team behind Testcontainers. Eli's career spans Pivotal, VMware Tanzu, AtomicJar, and now Docker, giving him a front-row seat to how infrastructure has evolved from virtualization to containerization to developer testing.",
    date: "2024-11-25",
    videoUrl: "https://www.youtube.com/watch?v=UaPP1X6LpiY",
    duration: "64 min",
    tags: ["Developer Experience", "SaaS Strategy", "Founder Stories"],
    timestamps: [
      { time: "00:00", title: "Welcome & Guest Introductions: SaaS, Docker, and Developer Experience" },
      { time: "06:11", title: "Why Consistency is the Key to Building Scalable Software" },
      { time: "14:26", title: "Cutting Cloud Costs: How Local Development & Docker Save You Money" },
      { time: "23:06", title: "Multi-Cloud Portability & Leveraging Cheap GPUs for AI Workloads" },
      { time: "31:16", title: "Navigating Compliance & Data Residency in Multi-Region Deployments" },
      { time: "39:46", title: "Docker's Partnership Strategy: Balancing Open Source and Commercial Success" },
      { time: "46:21", title: "Introducing Docker MCP Catalog: Revolutionizing Cloud-Native Ecosystems" },
      { time: "53:16", title: "Open Source vs. Commercial Products: How Docker Strikes the Balance" },
      { time: "59:41", title: "The Agentic Future: Complex App Distribution & the Rise of Autonomous Platforms" },
      { time: "1:03:00", title: "Final Thoughts: The Future of Cloud, Containers, and Developer Tools" },
    ],
    guests: [
      {
        name: "Eli Aleyner",
        linkedIn: "https://www.linkedin.com/in/elialeyner/",
        bio: "Head of Technology Alliances at Docker and co-founder of AtomicJar (Testcontainers). Previously at Pivotal and VMware Tanzu."
      }
    ],
  },
  {
    id: 13,
    title: "From Chaos to Control with Omnistrate's Founders",
    description: "How do SaaS companies move from chaos to control? The answer: SaaS control planes — the mission control that powers scale, speed, and security across multi-tenant systems. Join the Omnistrate founders as they discuss building control planes for modern SaaS.",
    date: "2024-10-28",
    videoUrl: "https://www.youtube.com/watch?v=Wp1iEZnhJ-o",
    duration: "62 min",
    tags: ["Cloud Infrastructure", "SaaS Strategy"],
    timestamps: [
      { time: "00:00", title: "Introduction to Control Plane Flexibility" },
      { time: "04:30", title: "Modular Architecture: Use What You Need" },
      { time: "09:15", title: "Decoupling Control Plane for Diverse Organizations" },
      { time: "13:45", title: "Importance of Observability & Third-Party Tools" },
      { time: "18:30", title: "Build vs Buy Decision for Startups" },
      { time: "23:00", title: "Challenges in Multi-Cloud and Multi-Tenancy" },
      { time: "28:20", title: "Control Plane as an Operating System" },
      { time: "33:10", title: "Agentic AI and Modern Software Evolution" },
      { time: "39:00", title: "Control Planes for Agent Management" },
      { time: "44:30", title: "AI's Role in Dynamic, Smarter Control Planes" },
      { time: "50:00", title: "Future Vision: Control Plane as Business Co-Pilot" },
      { time: "55:00", title: "Closing Remarks & Final Thoughts" },
    ],
  },
  {
    id: 12,
    title: "Founders, Fraud, and the Future of AI with Joshua Mckenty",
    description: "Joshua McKenty—legendary cloud architect, OpenStack co-founder, and now CEO of Polyguard—joins us for a no-fluff, high-impact conversation on innovating inside NASA, scaling SaaS from scratch (and from the edge), fighting synthetic identity fraud with AI, and why trust, privacy, and infrastructure are converging in 2025.",
    date: "2024-10-21",
    videoUrl: "https://www.youtube.com/watch?v=VVMJdjrx7Fw",
    duration: "68 min",
    tags: ["AI & Agents", "Security & Identity", "Founder Stories"],
    timestamps: [
      { time: "00:00", title: "Intro: Identity, Security & the AI Shift" },
      { time: "05:12", title: "Why All Cybersecurity Is an Identity Problem" },
      { time: "10:43", title: "The Internet's Original Sin: Anonymity vs Accountability" },
      { time: "15:10", title: "Remote Hiring Fraud & North Korea Sanctions" },
      { time: "19:33", title: "How Polyguard AI Verifies Identity in Video & Remote Hiring" },
      { time: "24:00", title: "SaaS, Privacy Trade-offs & User Data Vulnerabilities" },
      { time: "29:12", title: "AI Agents, Identity Delegation & the New Trust Crisis" },
      { time: "34:40", title: "Beyond OAuth: Scoped Tokens & Chain of Trust" },
      { time: "39:26", title: "Why Blockchain Can't Solve Identity" },
      { time: "44:15", title: "Centralized Identity: Nation States vs Big Tech vs Polyguard AI" },
      { time: "49:05", title: "Agent-Based Commerce & Real-World Identity" },
      { time: "53:30", title: "What We Learned from AI This Week (Tools & Trends)" },
      { time: "59:48", title: "Cloud Code, Cursor & Spec-First AI Development" },
      { time: "1:04:00", title: "Closing: MCP, Agents & Polyguard AI's Role in the Future" },
    ],
    guests: [
      {
        name: "Joshua McKenty",
        linkedIn: "https://www.linkedin.com/in/joshuamckenty/",
        bio: "CEO of Polyguard AI, OpenStack co-founder, and former cloud architect at NASA. Pioneer in cloud infrastructure and now tackling synthetic identity fraud."
      }
    ],
  },
  {
    id: 11,
    title: "From Prompt to Product AI with OriginAI CEO",
    description: "This episode explores how Generative AI is transforming application development—making it faster, more accessible, and more modular. We focus on how platforms like Origin AI are helping founders and product leaders move from idea to working application logic using natural language and structured prompts.",
    date: "2024-09-16",
    videoUrl: "https://www.youtube.com/watch?v=OcLtP30pRhI",
    duration: "65 min",
    tags: ["AI Architecture", "AI & Agents"],
    timestamps: [
      { time: "00:00", title: "Introduction & Context Setting" },
      { time: "05:30", title: "The Challenge of Contextual Awareness in AI Agents" },
      { time: "12:00", title: "Building Intelligent Agents: Managing Data Flows and Security" },
      { time: "18:45", title: "Compliance as a Key to Secure AI Code Generation" },
      { time: "26:30", title: "The Power of Agent-to-Agent Monitoring for Compliance" },
      { time: "33:00", title: "Domain Expertise & Guardrails: Essential for Reliable AI Outputs" },
      { time: "40:15", title: "SaaS Principles Applied to Agentic AI Security" },
      { time: "46:00", title: "AI Agents Surpassing Human Compliance Checks" },
      { time: "52:00", title: "Fun Prompt Tricks: Are You Sure? and Beyond" },
      { time: "56:00", title: "Checking AI's Sources: Avoiding Hallucinations" },
      { time: "59:30", title: "Best Practices for Using AI with New Technologies" },
      { time: "1:03:30", title: "Closing Thoughts" },
    ],
  },
  {
    id: 10,
    title: "Mastering Growth Through Subscription with AWS Experts",
    description: "This episode focuses on turning SaaS growth strategy into scalable revenue using proven frameworks from subscription leaders. AWS experts and Capgemini Director discuss subscription-based growth models and strategies for SaaS businesses.",
    date: "2024-09-09",
    videoUrl: "https://www.youtube.com/watch?v=XL8kWY_QuQw",
    duration: "62 min",
    tags: ["Growth & Pricing", "SaaS Strategy"],
    timestamps: [
      { time: "00:00", title: "Intro: Why SaaS Pricing Is Harder Than It Looks" },
      { time: "03:45", title: "ROI Mindset: Thinking Beyond Customer Satisfaction" },
      { time: "07:30", title: "Measuring Value: Revenue per Employee Metric" },
      { time: "11:10", title: "How to Frame ROI Conversations with Customers" },
      { time: "15:20", title: "Making ROI Tangible: Show, Don't Just Tell" },
      { time: "18:45", title: "Frameworks for Monetization at Different Stages" },
      { time: "23:00", title: "Why Cost-Plus Pricing Fails Most SaaS Startups" },
      { time: "27:20", title: "Value Metrics: Time Saved, Cost Reduced, Revenue Gained" },
      { time: "31:40", title: "MVP Pricing: Art, Science & Customer Interviews" },
      { time: "36:05", title: "Communicating Pricing Changes Without Backlash" },
      { time: "41:00", title: "AI, Usage-Based Pricing & the Credit Model Shift" },
      { time: "47:15", title: "Challenges with Billing, Metering & Cost Visibility" },
      { time: "53:00", title: "Rapid Fire Q&A: Pricing Tips, Churn Mistakes, Final Advice" },
      { time: "58:00", title: "Final Takeaways & Thank You" },
    ],
  },
  {
    id: 9,
    title: "Inside the AI Agent Swarm with Rox CTO",
    description: "We dive into how Rox is pioneering the world's first enterprise-ready AI Agent Swarm—built to transform how revenue teams operate. Join us as we speak with Shriram Sridharan, co-founder of Rox, about his journey from scaling cloud infrastructure at Confluent and Amazon Aurora to launching a new kind of SaaS platform powered by agent-based AI.",
    date: "2024-08-26",
    videoUrl: "https://www.youtube.com/watch?v=oHH2Nmv-h28",
    duration: "57 min",
    tags: ["AI & Agents", "Founder Stories"],
    timestamps: [
      { time: "00:00", title: "Introduction" },
      { time: "03:20", title: "What Is Rox?" },
      { time: "07:10", title: "Rox as an Operating System for Revenue" },
      { time: "10:45", title: "Omnistrate & Control Planes: Operating Systems for Distribution" },
      { time: "14:30", title: "From Idea to Unicorn: Orchestrating with AI" },
      { time: "18:00", title: "Practical AI Agent Use: Automating Revenue Ops" },
      { time: "21:20", title: "Human + AI: The Role That Won't Be Replaced" },
      { time: "24:50", title: "Abstraction & the New Desktop: World as OS" },
      { time: "28:15", title: "Interoperability & Agent-to-Agent Communication" },
      { time: "31:40", title: "Missing Link: Bridging People & Technology" },
      { time: "35:10", title: "Integrations, Partnerships & Data Connectivity" },
      { time: "38:30", title: "Advice for Founders: Build + Sell + Automate" },
      { time: "42:00", title: "Challenges in Adoption: Retraining & Trust" },
      { time: "45:30", title: "Closing Thoughts & Next Steps" },
    ],
    guests: [
      {
        name: "Shriram Sridharan",
        linkedIn: "https://www.linkedin.com/in/shrirams/",
        bio: "Co-founder and CTO of Rox. Previously scaled cloud infrastructure at Confluent and Amazon Aurora."
      }
    ],
  },
  {
    id: 8,
    title: "Pricing and Packaging for SaaS Companies",
    description: "In this episode of SaaS Mondays Live, we dive into one of the most critical—and often most challenging—aspects of SaaS growth: Pricing and Packaging. Flynn Glover (Founder & CEO of Schematic) and Akshay Patel (SaaS/AI Product Strategist at AWS) unpack proven pricing strategies, innovative packaging models, and the latest trends shaping how SaaS companies monetize.",
    date: "2024-08-19",
    videoUrl: "https://www.youtube.com/watch?v=7s_CmfUqWQY",
    duration: "61 min",
    tags: ["Growth & Pricing", "SaaS Strategy"],
    timestamps: [
      { time: "00:00", title: "Intro: PLG, AI & Growth in Modern SaaS" },
      { time: "05:12", title: "Rethinking CAC in a Product-Led World" },
      { time: "10:04", title: "Can Enterprise SaaS Embrace PLG?" },
      { time: "15:26", title: "PLG Beyond Acquisition: Feature Adoption & Innovation" },
      { time: "20:44", title: "Measuring Free Tier Success & Developer Adoption" },
      { time: "26:31", title: "What Is a SaaS Growth Team Really?" },
      { time: "32:40", title: "Amazon's Team Model for Growth Execution" },
      { time: "37:50", title: "Agentic AI & The Shift Toward Outcome-Based Pricing" },
      { time: "44:18", title: "Pricing Agentic AI: Attribution, Enforcement & Risk" },
      { time: "50:02", title: "Final Thoughts: Pricing Is Not a Feature, It's a Strategy" },
    ],
    guests: [
      {
        name: "Flynn Glover",
        linkedIn: "https://www.linkedin.com/in/flynnglover/",
        bio: "Founder & CEO of Schematic, helping SaaS companies optimize their pricing and packaging strategies."
      }
    ],
  },
  {
    id: 7,
    title: "The Spine AI Story with Ashwin Raman",
    description: "A special Notes from a Founder edition featuring Ashwin Raman, Co-founder and CTO of Spine AI—the world's first iterative deep research platform, built for speed, scale, and substance. Ashwin shares his journey building AI research tools from the ground up.",
    date: "2024-08-12",
    videoUrl: "https://www.youtube.com/watch?v=d5FfOJoYcDc",
    duration: "60 min",
    tags: ["AI & Agents", "Founder Stories"],
    timestamps: [
      { time: "00:00", title: "Intro: Building AI Research Tools from the Ground Up" },
      { time: "05:12", title: "Data Sovereignty: Does AI Need to Stay in Canada or Europe?" },
      { time: "11:04", title: "Public Product Launch: What Worked and What Surprised Us" },
      { time: "16:38", title: "Vision vs. Feedback: When to Stick, When to Pivot" },
      { time: "22:06", title: "How Many Users Are Enough? And Which Feedback to Trust" },
      { time: "28:10", title: "AI Coding & Developer Productivity: What's Changed in a Year" },
      { time: "33:30", title: "Hallucinations in Research AI: How to Avoid Made-Up Answers" },
      { time: "39:44", title: "Centralized vs. Distributed Data in AI Workflows" },
      { time: "46:10", title: "Top Use Cases: Medical, Sales Intelligence, and Private Credit" },
      { time: "53:25", title: "Final Advice for AI Founders" },
    ],
    guests: [
      {
        name: "Ashwin Raman",
        linkedIn: "https://www.linkedin.com/in/ashwinraman/",
        bio: "Co-founder and CTO of Spine AI, building the world's first iterative deep research platform."
      }
    ],
  },
  {
    id: 6,
    title: "Building Vertical SaaS with Plotline and Checkly Leaders",
    description: "Leaders from Checkly and Plotline share lessons on building and scaling successful Vertical SaaS businesses. We explore how these companies carved out niches, delivered deep value to specific industries, and navigated the infrastructure, product, and growth challenges that come with building vertical-first platforms.",
    date: "2024-08-05",
    videoUrl: "https://www.youtube.com/watch?v=AuGAgLANqxU",
    duration: "59 min",
    tags: ["SaaS Strategy", "Growth & Pricing"],
    timestamps: [
      { time: "00:00", title: "Intro: Building SaaS products and learning from failure" },
      { time: "04:10", title: "When nobody uses your feature: Handling tough conversations" },
      { time: "07:30", title: "Creating a no-blame culture around failed experiments" },
      { time: "10:05", title: "Case study: Why the GitHub sync feature was shut down" },
      { time: "15:30", title: "Should startups say yes to every customer request?" },
      { time: "18:40", title: "Opportunity cost and the power of saying no" },
      { time: "24:00", title: "Letting go of features you're emotionally attached to" },
      { time: "31:40", title: "Series A vs. Series B: When to innovate vs. double down" },
      { time: "36:20", title: "Checkly's strategic focus on Playwright integration" },
      { time: "53:45", title: "Why AWS is more than just infrastructure for SaaS founders" },
    ],
  },
  {
    id: 5,
    title: "From Idea to Launch: The AutoBlocks Journey with Adam Nolte",
    description: "Adam Nolte, Co-Founder & CTO of AutoBlocks.ai — the OS for AI Product Teams — shares the real-world journey of building AutoBlocks from the ground up: how the idea was born, the challenges faced while building for AI product teams, key lessons from turning vision into a launched product, and insights on the future of AI tooling and infrastructure.",
    date: "2024-07-29",
    videoUrl: "https://www.youtube.com/watch?v=TEFW1zesu2k",
    duration: "56 min",
    tags: ["Founder Stories", "AI Architecture"],
    timestamps: [
      { time: "00:00", title: "Introduction about Autoblocks' impact on AI industry" },
      { time: "03:45", title: "Efficiency gains from AI in sales, marketing, product design, and development" },
      { time: "08:30", title: "The future of product innovation with AI and continuous iteration" },
      { time: "13:20", title: "How AI reduces workforce size but increases business creation opportunities" },
      { time: "17:15", title: "Real-world example: Using ChatGPT to understand legacy code" },
      { time: "21:00", title: "Overview of Autoblocks platform and its role in AI tooling ecosystem" },
      { time: "25:40", title: "Autoblocks' flexible integration with various AI models and tooling" },
      { time: "30:50", title: "Importance of feedback loops and human-in-the-loop in AI development" },
      { time: "35:10", title: "The evolving landscape of LLMs: open-source, closed-source, and specialized models" },
      { time: "40:00", title: "The role of data quality and consolidation in AI's future success" },
      { time: "43:30", title: "Parallels between cloud computing multi-tenancy and AI personalization" },
      { time: "47:20", title: "The cyclical nature of the tech industry and AI evolution" },
      { time: "50:10", title: "How to get started with Autoblocks and engage with their team" },
      { time: "53:30", title: "Upcoming AWS event and closing remarks" },
    ],
    guests: [
      {
        name: "Adam Nolte",
        linkedIn: "https://www.linkedin.com/in/adamnolte/",
        bio: "Co-Founder & CTO of AutoBlocks.ai, building the OS for AI Product Teams."
      }
    ],
  },
  {
    id: 4,
    title: "From Startup to Scale-up with Confluent",
    description: "The Head of Global Partnerships at Confluent discusses the transition from startup to scale-up phase. You've landed your first customers—now what? Scaling your SaaS business means more than just adding infrastructure. It means building repeatable onboarding, managing support without burning out your team, and delivering consistent experiences across multiple clouds and SaaS Deployment Models.",
    date: "2024-07-22",
    videoUrl: "https://www.youtube.com/watch?v=eu94ja61HKM",
    duration: "61 min",
    tags: ["Growth & Pricing", "Founder Stories"],
  },
  {
    id: 3,
    title: "SaaS Deployment Models — From Fully Hosted to BYOC",
    description: "AWS and Omnistrate experts explore various SaaS deployment models including fully hosted, BYOC (Bring Your Own Cloud), and hybrid approaches. A candid, technical discussion on the spectrum of SaaS deployment models—from fully hosted, to Private VPC, to BYOA/BYOC. We cover architecture patterns, real-world challenges, and the native cloud services that can (or can't) help you scale.",
    date: "2024-07-15",
    videoUrl: "https://www.youtube.com/watch?v=GBnflK7Dnfo",
    duration: "61 min",
    tags: ["Cloud Infrastructure", "SaaS Strategy"],
  },
  {
    id: 2,
    title: "The Importance of Cloud Marketplaces with Labra's CEO",
    description: "Sridhar Adusumilli, CEO of Labra.io, discusses why Cloud Marketplaces matter for SaaS growth, the role of AWS Marketplace in SaaS success (EMEA vs USA), technical considerations for integrating SaaS with Cloud Marketplaces, and go-to-market strategies for SaaS on Cloud Marketplaces.",
    date: "2024-07-08",
    videoUrl: "https://www.youtube.com/watch?v=pK9_l1eAvRk",
    duration: "49 min",
    tags: ["Growth & Pricing", "Cloud Infrastructure"],
    guests: [
      {
        name: "Sridhar Adusumilli",
        linkedIn: "https://www.linkedin.com/in/sridhara/",
        bio: "CEO of Labra.io, helping SaaS companies succeed on cloud marketplaces."
      }
    ],
  },
  {
    id: 1,
    title: "How will AI Impact SaaS Builders",
    description: "AWS experts discuss how AI is transforming the SaaS landscape and what it means for builders and operators. This inaugural episode explores the impact of AI on SaaS development, deployment, and operations.",
    date: "2024-07-01",
    videoUrl: "https://www.youtube.com/watch?v=NwyIMZbhJno",
    duration: "64 min",
    tags: ["AI & Agents", "SaaS Strategy"],
  },
]
