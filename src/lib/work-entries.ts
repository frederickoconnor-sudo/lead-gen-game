export type CaseStudySection = {
  heading: string;
  body: string;
  metric?: { value: string; label: string };
  secondaryMetric?: { value: string; label: string };
};

export type WorkEntry = {
  slug: string;
  shortTitle?: string;
  title: string;
  hook: string;
  category: string;
  company: string;
  what: string;
  why: string;
  result: string;
  file?: string;
  link?: string;
  preview?: string;
  thumbnail?: string;
  images?: { src: string; alt: string; caption?: string }[];
  featured?: boolean;
  caseStudy?: { sections: CaseStudySection[] };
};

export const CATEGORIES = [
  "Positioning & Messaging",
  "Competitive Intelligence",
  "Sales Enablement",
  "GTM & Launches",
  "Customer Stories",
  "Thought Leadership",
  "Blogs",
  "Podcasts",
  "Interactive",
] as const;

// Editorial order: featured items placed for clean 3-col grid rows (2+1, 2+1, 1+1+1, …)
export const workEntries: WorkEntry[] = [
  {
    slug: "hunters-soc-datasheet",
    title: "Hunters SOC Platform Datasheet",
    hook: "Positioned Hunters as the SIEM for lean security teams with enterprise-grade needs.",
    category: "Positioning & Messaging",
    company: "Hunters",
    what: "A product datasheet positioning Hunters as a SIEM built for small security teams with enterprise-grade security needs but without enterprise-grade security budgets.",
    why: "Hunters redefined its ICP and positioning, and the solution brief needed to reflect this change and convey the value of Hunters to smaller security teams.",
    result: "Sales liked that it spoke directly to Hunters' new ICP instead of a broad audience, and started sharing it with prospects.",
    file: "/work/hunters-soc-datasheet.pdf",
    preview: "/work/previews/hunters-soc-datasheet.pdf.png",
    thumbnail: "/work/previews/hunters-soc-datasheet.pdf.png",
    featured: true,
  },
  {
    slug: "bugsnag-messaging-framework",
    title: "BugSnag Messaging Framework",
    hook: "Single source of truth for how sales, CS, and demand gen talk about BugSnag.",
    category: "Positioning & Messaging",
    company: "BugSnag / SmartBear",
    what: "A messaging framework for BugSnag covering the problem statement, value proposition, three value drivers, differentiators, and customer proof points.",
    why: "Sales, customer success, and demand generation needed a single source of truth on how to talk about BugSnag and convey how it helped developers fix bugs in mobile apps before customer experience and revenue were impacted.",
    result: "Validated by listening to Gong recordings of sales calls. Prospects, in their own words, confirmed they experienced the problems the messaging described.",
    file: "/work/bugsnag-messaging-doc.pdf",
    preview: "/work/previews/bugsnag-messaging-doc.pdf.png",
  },
  {
    slug: "hunters-anvilogic-battlecard",
    title: "Hunters vs. Anvilogic Battlecard",
    hook: "A repeatable playbook for every deal where Anvilogic showed up.",
    category: "Competitive Intelligence",
    company: "Hunters",
    what: "A competitive battlecard covering Anvilogic's weaknesses, Hunters' advantages, discovery questions, and a real sales anecdote.",
    why: "Hunters sales reps kept running into Anvilogic in deals, and needed a way to reframe those conversations.",
    result: "Gave sellers a repeatable way to qualify or disqualify a deal early, using real discovery questions instead of guessing at fit.",
    file: "/work/hunters-vs-anvilogic-battlecard.pptx",
    preview: "/work/previews/hunters-vs-anvilogic-battlecard.pptx.png",
    thumbnail: "/work/previews/hunters-vs-anvilogic-battlecard.pptx.png",
    featured: true,
  },
  {
    slug: "hunters-icp-positioning",
    shortTitle: "Hunters ICP & Positioning",
    title: "Repositioning Hunters Around the Customers Who Saw the Most Value",
    hook: "How customer and deal research led to a tighter ICP, new positioning, and a sales cycle that moved from nine months to six.",
    category: "Positioning & Messaging",
    company: "Hunters",
    what: "A research-driven ICP and repositioning project that narrowed Hunters' target customer from a broad enterprise market to smaller security teams with enterprise-grade needs.",
    why: "The sales cycle was inconsistent — some deals closed in four months, others took ten or longer. The CFO asked Product Marketing to understand the drivers and help create a more predictable pipeline.",
    result: "The typical sales cycle moved from nine months to six, and deal flow became more consistent, improving forecasting.",
    caseStudy: {
      sections: [
        {
          heading: "The challenge",
          body: "Hunters had an inconsistent sales cycle. Some deals closed in four months, while others took ten months or longer. With fundraising talks coming the following year, our CFO asked Product Marketing to understand what was driving the difference and help create a more predictable sales cycle.",
        },
        {
          heading: "What I did",
          body: "I started with the people closest to our customers: Sales, Sales Engineering, and Customer Success. I wanted to understand which deals closed fastest, which customers were happiest after purchasing Hunters, and what value they saw in the product.\n\nI also spoke directly with customers to hear, in their words, why they chose Hunters and the value it delivered.",
        },
        {
          heading: "The insight",
          body: "One clear pattern emerged: medium-sized organizations with smaller security teams were seeing the most value from Hunters.\n\nPreviously, we'd been marketing to everybody. And when you market to everyone, you sell to no one.\n\nThese customers told us they valued Hunters because it handled foundational security work, including building data pipelines and running detection rules. That freed their analysts to spend more time on higher-value work like hunting for threats.",
        },
        {
          heading: "The positioning",
          body: "I used that insight to narrow our positioning.\n\nInstead of trying to be the SIEM for everybody, we positioned Hunters around smaller security teams with enterprise-grade security needs, but without the enterprise-grade budget to hire large teams of analysts.\n\nThe important part was that this wasn't positioning created in a conference room. It came directly from patterns we saw across our customers and deals.",
        },
        {
          heading: "Taking it to market",
          body: "I brought the new positioning into sales briefs, solution briefs, and content, and enabled our Sales team on the new message.",
        },
        {
          heading: "The impact",
          metric: { value: "9 → 6 months", label: "Typical sales cycle" },
          body: "Deals began closing more consistently, with the typical sales cycle moving from nine months to six. The increased consistency also helped improve sales forecasting.",
        },
      ],
    },
  },
  {
    slug: "hunters-mssp-launch",
    shortTitle: "Hunters MSSP Launch",
    title: "Launching Hunters for Managed Security Service Providers",
    hook: "Built the positioning and GTM motion for Hunters' MSSP offering, helping land 3 MSSPs in six months and supporting a program that eventually grew to roughly 30.",
    category: "GTM & Launches",
    company: "Hunters",
    what: "Product marketing ownership of Hunters' MSSP go-to-market: messaging, positioning, sales enablement, and an ABM demand gen motion targeting a CEO-curated list of 50 MSSPs.",
    why: "Hunters was launching a product line for managed security service providers and needed positioning, a go-to-market motion, and sales enablement to support it.",
    result: "Landed 3 of the targeted 4 MSSPs in six months. The program eventually grew to roughly 30 MSSPs using Hunters.",
    caseStudy: {
      sections: [
        {
          heading: "The opportunity",
          body: "Hunters was launching a product line for managed security service providers (MSSPs). Unlike a typical enterprise customer, an MSSP needed to use Hunters across multiple end customers while protecting its own margins.\n\nI owned Product Marketing for the launch, working across Product, Sales, leadership, and Demand Gen to take the offering to market.",
        },
        {
          heading: "Understanding the value",
          body: "I started with Product to understand why Hunters was a strong fit for both MSSPs and their end customers.\n\nOne of the biggest parts of the story was protecting margins.\n\nFeatures like multi-tenancy meant an MSSP didn't have to keep adding analysts as it added customer accounts. One analyst could monitor multiple accounts.\n\nPre-built detection rules and integrations also helped analysts get customers up and running faster without spending as much time on low-level foundational work.",
        },
        {
          heading: "Setting the goal",
          body: "Before going to market, I aligned with leadership on how we'd measure success: land 4 MSSPs in 6 months. That gave us a concrete business outcome to build the launch around.",
        },
        {
          heading: "Building and validating the story",
          body: "I turned what I'd learned from Product into messaging and positioning around the problems MSSPs cared about.\n\nProduct validated the messaging for technical accuracy, while the MSSP Sales team validated whether it was a story they felt comfortable taking into customer conversations.",
        },
        {
          heading: "Taking it to market",
          body: "Rather than running a broad campaign, I worked with Demand Gen on an ABM play.\n\nOur CEO had identified roughly 50 MSSPs we wanted to pursue, so concentrating our efforts on those accounts made more sense than marketing broadly.\n\nI also enabled the entire MSSP Sales team on the new messaging and positioning and created GTM assets they could use with prospects.",
        },
        {
          heading: "The result",
          metric: { value: "3 MSSPs in 6 months", label: "Against a goal of 4" },
          secondaryMetric: { value: "~30 MSSPs", label: "Eventually using Hunters" },
          body: "We came just short of the initial goal, but the results gave leadership enough confidence in the opportunity to continue investing in the MSSP program.",
        },
      ],
    },
  },
  {
    slug: "bugsnag-homepage-copy",
    title: "BugSnag Homepage Copy",
    hook: "Rewrote the homepage to say what BugSnag does, who it's for, and why it matters.",
    category: "Positioning & Messaging",
    company: "BugSnag / SmartBear",
    what: "The homepage copy for BugSnag's website, captured as a screenshot in August 2026 since the live page changes over time.",
    why: "Prior homepage copy didn't clearly convey what BugSnag did, who should use it, and the business value it provided.",
    result: "5% increase in homepage traffic in the month after the homepage was updated.",
    thumbnail: "/work/bugsnag-homepage.png",
    images: [
      {
        src: "/work/bugsnag-homepage.png",
        alt: "BugSnag homepage screenshot, August 2026",
        caption: "Screenshot captured August 2026 — live page changes over time.",
      },
    ],
  },
  {
    slug: "bugsnag-vertical-pages",
    title: "BugSnag Vertical Pages",
    hook: "Industry-specific messaging for media, retail, and hospitality that outperformed broad campaigns.",
    category: "Positioning & Messaging",
    company: "BugSnag / SmartBear",
    what: "Messaging and web pages for three core verticals — media, retail, and hospitality — captured as screenshots since the live pages change over time.",
    why: "BugSnag had no messaging speaking to the specific problems these industries faced. Built vertical-specific messaging focused on how BugSnag solved problems unique to each one.",
    result: "Powered LinkedIn ad campaigns for each vertical that generated 948K impressions and got more clicks than previous ads using broad, general messaging.",
    thumbnail: "/work/bugsnag-hospitality-vertical.png",
    images: [
      {
        src: "/work/bugsnag-retail-vertical.png",
        alt: "BugSnag retail vertical page screenshot, August 2026",
        caption: "Retail vertical — screenshot captured August 2026.",
      },
      {
        src: "/work/bugsnag-hospitality-vertical.png",
        alt: "BugSnag hospitality vertical page screenshot, August 2026",
        caption: "Hospitality vertical — screenshot captured August 2026.",
      },
      {
        src: "/work/bugsnag-media-vertical.png",
        alt: "BugSnag media vertical page screenshot, August 2026",
        caption: "Media vertical — screenshot captured August 2026.",
      },
    ],
  },
  {
    slug: "tamr-first-call-deck",
    title: "Tamr First Call Deck",
    hook: "Reframed Tamr around business outcomes, not features — and sales actually used it.",
    category: "Sales Enablement",
    company: "Tamr",
    what: "The sales deck used on first calls with prospects, framing Tamr's data mastering platform around business outcomes rather than technical features.",
    why: "Prospects were more familiar with legacy MDM tools, so the deck needed to reframe the conversation around using AI to clean up dirty data, instead of relying on manual rules.",
    result: "Sales actually used this deck in prospect calls and didn't revert back to the old one.",
    file: "/work/tamr-first-call-deck.pptx",
    preview: "/work/previews/tamr-first-call-deck.pptx.png",
    thumbnail: "/work/previews/tamr-first-call-deck.pptx.png",
  },
  {
    slug: "hunters-gigaom-radar-messaging",
    title: "Hunters GigaOm Radar Messaging Package",
    hook: "Turned third-party analyst recognition into a usable sales conversation tool.",
    category: "Sales Enablement",
    company: "Hunters",
    what: "An overview for sales on how to talk about Hunters' recognition as a Fast Moving Leader in the GigaOm SIEM Radar.",
    why: "Third-party reports only matter if sales knows how to use them in conversations. This overview helped sales articulate why the recognition mattered to the companies they were pursuing.",
    result: "Gave Hunters credible, analyst-backed recognition to support its claim as the ideal SIEM for small security teams.",
    file: "/work/hunters-gigaom-radar-messaging.pdf",
    preview: "/work/previews/hunters-gigaom-radar-messaging.pdf.png",
  },
  {
    slug: "hunters-win-flash-template",
    title: "Hunters Win Flash Template",
    hook: "A system for capturing what actually won deals — built from scratch.",
    category: "Sales Enablement",
    company: "Hunters",
    what: "A template for capturing why and how Hunters won a sales deal: the competitive context, what resonated with the customer, and the key insights behind the close.",
    why: "Sales wins weren't being documented, so wins had to be pieced together from Salesforce notes and POC documents after the fact. Initially ran this personally, interviewing sellers and sales engineers after each closed deal; once the team understood what to include, sellers and SEs filled it out themselves, with editing support provided.",
    result: "Used in sales enablement sessions as a guide for sellers sharing their win stories with the team. When a seller asked in Slack for details on a specific deal, another seller pointed them to a win flash that had been written. Someone from product said it gave real insight into which features actually mattered to customers.",
    file: "/work/hunters-win-flash-template.docx",
    preview: "/work/previews/hunters-win-flash-template.docx.png",
  },
  {
    slug: "pennymac-customer-story",
    title: "PennyMac Customer Story",
    hook: "Marquee brand story on moving past a legacy SIEM with Hunters and Snowflake.",
    category: "Customer Stories",
    company: "Hunters",
    what: "A customer story on how PennyMac used Hunters' security data lake, built on Snowflake, to modernize its SIEM approach.",
    why: "Hunters wanted a marquee brand to share its story and show the value the SIEM provided.",
    result: "Published on Hunters' blog and shared by sales with prospects.",
    link: "https://www.hunters.security/en/blog/pennymac-security-data-lake-snowflake",
    featured: true,
  },
  {
    slug: "kudelski-security-customer-story",
    title: "Kudelski Security Customer Story",
    hook: "How a major MSSP built a modern SIEM program on Hunters and Snowflake.",
    category: "Customer Stories",
    company: "Hunters",
    what: "A customer story, shared at Snowflake Summit, on how Kudelski Security, a managed security service provider, used Hunters' security data lake, built on Snowflake, to give its customers a modern SIEM.",
    why: "Hunters needed MSSP customer stories to attract other MSSPs and show the value of building a program around Hunters.",
    result: "Published on Hunters' blog and referenced by the MSSP sales team in conversations with other MSSPs.",
    link: "https://www.hunters.security/en/blog/kudelski-security-data-lake-snowflake-0",
  },
  {
    slug: "xactly-customer-story",
    title: "Xactly Customer Story",
    hook: "How Xactly used Hunters' security data lake to modernize its SIEM approach.",
    category: "Customer Stories",
    company: "Hunters",
    what: "A customer story, shared at Snowflake Summit, on how Xactly used Hunters' security data lake, built on Snowflake, to modernize its SIEM approach.",
    why: "Hunters needed stories from customers in its new ICP — companies with smaller security teams — and Xactly's SIEM journey fit that need perfectly.",
    result: "Published on Hunters' blog and shared by sales with prospects.",
    link: "https://www.hunters.security/en/blog/xactly-security-data-lake-snowflake-0",
  },
  {
    slug: "tamr-bicycle-manufacturer-case-study",
    title: "Tamr Bicycle Manufacturer Case Study",
    hook: "How a manufacturer used Tamr to identify top suppliers and negotiate better prices.",
    category: "Customer Stories",
    company: "Tamr",
    what: "A customer story on how a bicycle manufacturer used Tamr's data mastering platform to get a clear picture of who their top suppliers were, to negotiate prices better.",
    why: "Supplier mastering was a key vertical for Tamr's new SaaS solution, and this story showed the business value of that product.",
    result: "Used by sales in conversations with prospects considering Tamr for supplier mastering.",
    link: "https://www.tamr.com/bicycle-manufacturer-customer-story",
  },
  {
    slug: "tamr-financial-services-case-study",
    title: "\"Know Your Customers\" Case Study",
    hook: "How a financial services firm built trusted customer records — and better service — with Tamr.",
    category: "Customer Stories",
    company: "Tamr",
    what: "A case study on how a major financial services company used Tamr to develop trusted customer records and use that information to provide better customer service.",
    why: "Tamr needed stories from customers using its platform for cleaning up customer data, a major Tamr use case.",
    result: "Used by sales in conversations with financial services firms considering Tamr.",
    link: "https://www.tamr.com/know-your-customers-drive-your-growth",
  },
  {
    slug: "tamr-google-cloud-bigquery",
    title: "Tamr × Google Cloud / BigQuery",
    hook: "Co-bylined technical piece on Google Cloud's blog, written for Tamr's CPO.",
    category: "Thought Leadership",
    company: "Tamr",
    what: "A co-branded technical article on Google Cloud's blog, ghostwritten for Tamr's CPO, on how Tamr delivers master data management at scale using BigQuery.",
    why: "Tamr's Google Cloud partnership needed a credible, technical story that put Tamr in front of Google's own developer and data audience.",
    result: "Published on Google Cloud's blog under the CPO's byline. Used by a Google seller to introduce Tamr to a retailer, who eventually bought Tamr and ran it on Google Cloud.",
    link: "https://cloud.google.com/blog/products/data-analytics/how-tamr-delivers-master-data-management-at-scale-with-bigquery",
    featured: true,
  },
  {
    slug: "bugsnag-application-stability-index",
    title: "BugSnag Application Stability Index",
    hook: "Original benchmark report letting companies compare app stability against their peers.",
    category: "Thought Leadership",
    company: "BugSnag / SmartBear",
    what: "An original benchmark report built from anonymized BugSnag customer data, letting companies compare their app stability against their peers.",
    why: "There was no way for a BugSnag customer to know if their stability score was actually good. This gave them a real industry benchmark, while giving marketing original content unique to SmartBear that could be used in campaigns.",
    result: "Written and ready before being laid off; published after leaving, so there are no adoption results to share — happy to walk through the process behind building it.",
    link: "https://fredjo.xyz/BugSnag_Application-Stability-Index.pdf",
    featured: true,
  },
  {
    slug: "smartbear-observability-blog",
    title: "Modern Apps Broke Observability. Here's How We Fix It.",
    hook: "The argument that modern application architectures broke traditional observability tools.",
    category: "Blogs",
    company: "BugSnag / SmartBear",
    what: "A blog post ghostwritten for a BugSnag sales engineer, arguing that modern application architectures broke the assumptions traditional observability tools were built on.",
    why: "Technical credibility on this topic mattered more coming from someone customer-facing and technical.",
    result: "Published on SmartBear's blog under the sales engineer's byline, used in conversations with prospects.",
    link: "https://smartbear.com/blog/modern-apps-broke-observability-heres-how-we-fix-it/",
  },
  {
    slug: "hunters-next-gen-siem-blog",
    title: "Next-Gen SIEM, AI, and Cloud SecOps",
    hook: "A point-of-view piece on where AI and cloud are taking the SIEM category.",
    category: "Blogs",
    company: "Hunters",
    what: "A blog post on how AI and cloud architecture are reshaping what a modern SIEM needs to do.",
    why: "Part of Hunters' broader content strategy establishing a point of view on where the SIEM category was heading.",
    result: "Published on Hunters' blog.",
    link: "https://www.hunters.security/en/blog/next-gen-siem-ai-cloud-secops",
  },
  {
    slug: "datamasters-data-and-the-city",
    title: "Data and the City",
    hook: "Boston's Chief Data Officer on how a city uses data to serve its residents.",
    category: "Podcasts",
    company: "Tamr",
    what: "One of the first 18 episodes of DataMasters, Tamr's podcast. This episode featured Boston's Chief Data Officer.",
    why: "Produced the first 18 episodes of DataMasters — recruiting guests, developing episode ideas, writing interview questions, and prepping both guest and host. The podcast was a product marketing and brand effort to establish Tamr as a thought leader and new voice in the master data management space.",
    result: "Published as part of the DataMasters series, which established Tamr's voice in the MDM space.",
    link: "https://www.tamr.com/podcast/data-and-the-city",
  },
  {
    slug: "datamasters-el-al-airlines",
    title: "How Data Keeps El Al Airlines Airborne",
    hook: "El Al's CDO on using data for preventive maintenance and keeping aircraft flying.",
    category: "Podcasts",
    company: "Tamr",
    what: "An episode of DataMasters featuring El Al Israel Airlines' CDO on how the company uses data for preventive maintenance.",
    why: "Produced the first 18 episodes of DataMasters — recruiting guests, developing episode ideas, writing interview questions, and prepping both guest and host. The podcast was a product marketing and brand effort to establish Tamr as a thought leader and new voice in the master data management space.",
    result: "Published as part of the DataMasters series, which established Tamr's voice in the MDM space.",
    link: "https://www.tamr.com/podcast/how-data-keeps-el-al-israel-airlines-airborne-2",
  },
  {
    slug: "bugsnag-arcade-games",
    title: "BugSnag Arcade Games",
    hook: "Retro arcade games built to reach technical audiences through interactive content.",
    category: "Interactive",
    company: "BugSnag / SmartBear",
    what: "Retro-style arcade games built with Claude Code, using real BugSnag error types pulled from documentation.",
    why: "To reach technical audiences through interactive content instead of traditional marketing.",
    result: "Live and playable at fredjo.xyz/interactive.",
    link: "/games",
  },
];

export function getEntryBySlug(slug: string): WorkEntry | undefined {
  return workEntries.find((e) => e.slug === slug);
}

export function getEntriesByCategory(category: string): WorkEntry[] {
  return workEntries.filter((e) => e.category === category);
}
