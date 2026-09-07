export interface Host {
  name: string
  linkedIn: string
  bio: string
  photo?: string
  role?: string
  company?: string
  companyUrl?: string
  /** Areas of subject-matter expertise, surfaced as schema.org `knowsAbout`
   *  to strengthen author/entity authority signals for AI answer engines. */
  expertise?: string[]
}

export const hosts: Host[] = [
  {
    name: "Ermin Dzinic",
    linkedIn: "https://www.linkedin.com/in/ermindzinic/",
    bio: "Former founder and entrepreneur with deep experience bringing new cloud solutions to market. Community organizer passionate about exploring AI-driven transformation, hosting Munich meetups on GenAI and modern platform strategies. Architect at AWS, based in Munich, Germany.",
    photo: "/ermin-dzinic.jpg",
    role: "Co-Host",
    company: "Amazon Web Services",
    companyUrl: "https://aws.amazon.com",
    expertise: ["Generative AI", "Cloud Architecture", "Platform Strategy", "Go-to-Market"],
  },
  {
    name: "Bill Tarr",
    linkedIn: "https://www.linkedin.com/in/billtarr/",
    bio: "Technology strategist and community leader with over 20 years helping hundreds of companies bring innovative solutions to the cloud. Explores the intersection of AI and multi-tenant platforms, speaking globally on modern software architecture and cloud-native design. Principal Partner Solutions Architect at AWS, based in San Diego, California.",
    photo: "/bill-tarr.jpg",
    role: "Co-Host",
    company: "Amazon Web Services",
    companyUrl: "https://aws.amazon.com",
    expertise: ["Multi-Tenant SaaS", "Cloud-Native Architecture", "Software Architecture", "AI Platforms"],
  },
  {
    name: "Kamal Gupta",
    linkedIn: "https://www.linkedin.com/in/kkgupta2/",
    bio: "Systems architect and builder who helped create Amazon Aurora and pioneered cloud-native database technologies. Author of award-winning research on distributed systems and event streaming platforms. Now building the future of cloud infrastructure as Founder and CEO of Omnistrate, based in Palo Alto, California.",
    photo: "/kamal-gupta.jpg",
    role: "Co-Host",
    company: "Omnistrate",
    companyUrl: "https://www.omnistrate.com",
    expertise: ["Distributed Systems", "Cloud Databases", "Amazon Aurora", "Event Streaming", "Control Planes"],
  },
  {
    name: "Markus Kaiser",
    linkedIn: "https://www.linkedin.com/in/kai5er/",
    bio: "Cloud architect and innovation advocate with deep expertise in helping startups scale. Passionate about exploring how AI is reshaping software development and pioneering new agentic-SaaS business models. Currently at Amazon Web Services, based in Munich, Germany.",
    photo: "/markus-kaiser.jpg",
    role: "Co-Host",
    company: "Amazon Web Services",
    companyUrl: "https://aws.amazon.com",
    expertise: ["Cloud Architecture", "Startup Scaling", "Agentic SaaS", "AI in Software Development"],
  },
  {
    name: "Michael Cooper",
    linkedIn: "https://www.linkedin.com/in/michaeldc/",
    bio: "Seasoned strategist who empowers technical founders to build, scale, and win in competitive markets. Specializes in strategic partnerships, ecosystem development, and go-to-market strategy for cloud and AI platforms. Former Global Sales leader for Microsoft Cloud and author. Founder of AGLedger.ai, based in the United States.",
    photo: "/michael-cooper.jpg",
    role: "Co-Host",
    company: "AGLedger.ai",
    companyUrl: "https://agledger.ai",
    expertise: ["Go-to-Market Strategy", "Strategic Partnerships", "Ecosystem Development", "Cloud & AI Platforms"],
  }
]
