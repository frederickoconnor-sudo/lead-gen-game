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
  whyLabel?: string;
  result?: string;
  myRole?: string;
  additionalSections?: { heading: string; body: string }[];
  relatedWork?: { slug: string; label: string };
  cardMetric?: { value: string; label: string };
  displayOrder?: number;
  file?: string;
  link?: string;
  preview?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailPosition?: string;
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
    why: "Built from the broader ICP and positioning work that repositioned Hunters around lean security teams with enterprise-grade needs. The solution brief needed to reflect that change and speak directly to the new ICP.",
    myRole: "Positioning · Copywriting",
    relatedWork: { slug: "hunters-icp-positioning", label: "See the positioning strategy →" },
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
    myRole: "Messaging strategy · Customer research · Cross-functional validation",
    relatedWork: { slug: "bugsnag-homepage-copy", label: "See the homepage execution →" },
    additionalSections: [
      {
        heading: "How I built the messaging",
        body: "I started with the people closest to customers — Sales, Sales Engineering, and Customer Success — to understand the problems customers were trying to solve around mobile app observability.\n\nI also talked directly with customers and listened to recordings of sales calls to understand why they bought BugSnag, the business outcomes they were seeing, and the language they used to describe those problems.\n\nI used those insights and customer language to build the messaging framework, then ran it back through Sales, Sales Engineering, Customer Success, and Product. I wanted to make sure the messaging reflected how BugSnag was actually being talked about in the field and that the technical details were accurate.",
      },
    ],
    result: "Validated by listening to Gong recordings of sales calls. Prospects, in their own words, confirmed they experienced the problems the messaging described.",
    file: "/work/bugsnag-messaging-doc.pdf",
    preview: "/work/previews/bugsnag-messaging-doc.pdf.png",
    thumbnail: "/work/previews/bugsnag-messaging-doc.pdf.png",
  },
  {
    slug: "hunters-anvilogic-battlecard",
    title: "Hunters vs. Anvilogic Battlecard",
    hook: "A repeatable playbook for every deal where Anvilogic showed up.",
    category: "Competitive Intelligence",
    company: "Hunters",
    what: "A competitive battlecard covering Anvilogic's weaknesses, Hunters' advantages, discovery questions, and a real sales anecdote.",
    why: "Hunters sales reps kept running into Anvilogic in deals, and needed a way to reframe those conversations.",
    myRole: "Competitive research · Positioning · Sales enablement",
    additionalSections: [
      {
        heading: "Building the competitive point of view",
        body: "I talked with Sales, Sales Engineering, Product, and customers who had evaluated both Hunters and Anvilogic to understand where we won and lost.\n\nI also followed Anvilogic's website, LinkedIn posts, and blog to understand how they positioned themselves and where the product was headed.\n\nOne important difference was Anvilogic's reliance on Splunk. That gave Sales a useful discovery path with prospects that were considering moving away from Splunk. In one competitive deal, the prospect had talked with Anvilogic but wanted to move off Splunk, which made Anvilogic a poor fit for where they wanted their security stack to go.",
      },
    ],
    result: "Gave sellers a repeatable way to qualify or disqualify a deal early, using real discovery questions instead of guessing at fit.",
    file: "/work/hunters-vs-anvilogic-battlecard.pptx",
    preview: "/work/previews/hunters-vs-anvilogic-battlecard.pptx.png",
    thumbnail: "/work/previews/hunters-vs-anvilogic-battlecard.pptx.png",
    featured: true,
  },
  {
    slug: "hunters-icp-positioning",
    displayOrder: 0,
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
    slug: "tamr-saas-launch",
    shortTitle: "Tamr SaaS Launch",
    title: "Launching Tamr's SaaS Offering Without Confusing the Core Product Story",
    hook: "Launched Tamr's SaaS offering with a clear platform story, generating roughly $600K in pipeline in six months and two closed deals.",
    category: "GTM & Launches",
    company: "Tamr",
    what: "Led the product marketing for Tamr's SaaS launch — resolving an internal messaging problem before it reached Sales, then building the platform story and enablement that took the offering to market.",
    why: "Tamr Cloud was being positioned internally as a replacement for Tamr Core. Without a clear platform narrative, that framing would create confusion for Sales and customers when the offering launched.",
    result: "Generated roughly $600K in pipeline in six months and closed two deals.",
    caseStudy: {
      sections: [
        {
          heading: "The context",
          body: "Tamr was preparing to launch Tamr Cloud, a new SaaS offering that would sit alongside Tamr Core, its existing public-cloud deployment option.\n\nThe launch opportunity was significant, but there was an early messaging problem: internally, Cloud was beginning to sound like a replacement for Core.",
        },
        {
          heading: "The challenge",
          body: "A few months before launch, Product was giving regular updates on Tamr Cloud.\n\nIn those updates, the team would sometimes inadvertently position Cloud against Tamr Core.\n\nThat created a risk for Sales.\n\nThe story we actually needed was not \"Cloud is better than Core.\" It was: Tamr is one platform with two deployment options, and the right choice depends on the customer's needs.",
        },
        {
          heading: "Identifying the messaging problem",
          body: "I raised the issue with the Product Manager because I was concerned the internal language would create confusion once we formally enabled Sales.\n\nHe initially felt sellers would understand the distinction once the training happened.\n\nI asked him to listen to how Sales was already talking about Core and Cloud.\n\nTwo weeks later, during a town hall, a seller asked: \"Once Tamr Cloud comes out, will we still sell Tamr Core?\"\n\nThat made the problem tangible.",
        },
        {
          heading: "Reframing the launch story",
          body: "The Product Manager and I worked together to change the internal message.\n\nInstead of positioning the two offerings against each other, we framed Tamr as a single platform with two deployment options.\n\nBoth were valid choices depending on a customer's business and technical needs.\n\nThat clearer platform story became the foundation for Sales enablement around the launch.\n\nWhen the formal enablement happened, sellers understood the distinction between Core and Cloud and when to position each one.",
        },
        {
          heading: "Preparing Sales",
          body: "I led Sales enablement around the new platform story: Tamr was one platform with two deployment options.\n\nThe goal wasn't to push every customer toward Cloud. Sellers needed to understand how to position both options and work with customers to determine which deployment was right for their needs.",
        },
        {
          heading: "Taking Tamr Cloud to market",
          body: "I worked with Demand Gen on the launch campaign, including content about using Tamr to clean BigQuery data, outreach to existing customers with expansion potential for Tamr Cloud, and follow-up with prospects who had been interested in Tamr but wanted a SaaS offering.\n\nWe launched Tamr Cloud at Google Cloud Next, since the product was built on Google Cloud. I planned the booth talk track so the team could clearly explain the new offering and how it fit within the broader Tamr platform.",
        },
        {
          heading: "The result",
          metric: { value: "~$600K", label: "Pipeline generated in six months" },
          secondaryMetric: { value: "2", label: "Closed deals" },
          body: "The SaaS launch generated roughly $600K in pipeline in its first six months and ultimately resulted in two closed deals.",
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
    slug: "hunters-ai-assistant-adoption",
    shortTitle: "Hunters AI Assistant Adoption",
    title: "Turning Around Adoption of Hunters' AI Assistant",
    hook: "How customer research and a messaging reset helped turn around adoption of Hunters' AI assistant from 17% to 50%.",
    category: "GTM & Launches",
    company: "Hunters",
    what: "Led the effort to understand and reverse low adoption of Hunters' AI assistant — customer interviews, a messaging reset, Sales and CS enablement, and a customer webinar.",
    why: "At the four-month mark, adoption was only 17% against a six-month goal of 50%. The existing approach wasn't working.",
    result: "Reached 50% adoption at month eight — two months past the original deadline, but a genuine turnaround from the trajectory at month four.",
    caseStudy: {
      sections: [
        {
          heading: "The challenge",
          body: "Hunters launched an AI assistant with a goal of getting half of the customer base to adopt it within six months.\n\nAt the four-month mark, adoption was only 17%.\n\nIt was clear we were not going to reach the goal with the existing approach, so my first step was to understand why.",
        },
        {
          heading: "Learning from customers",
          body: "I worked with Customer Success to interview customers who were using the AI assistant and customers who were not.\n\nCustomers who had adopted it told us it helped them investigate alerts faster and address alert fatigue.\n\nCustomers who had not adopted it said they did not understand the value.\n\nOur messaging focused too heavily on the AI capabilities and sounded similar to every other company promoting an AI assistant.\n\nThe technology had become the story instead of the customer problem.",
        },
        {
          heading: "Resetting the message",
          body: "I rewrote the messaging to focus less on the AI itself and more on the outcomes customers were seeing, including faster investigations and less time spent dealing with alert fatigue.\n\nI then enabled both Sales and Customer Success on the new messaging.\n\nSales could use the story with prospects, while Customer Success could use it to help existing customers understand where the feature fit into their workflow.\n\nI also worked with Demand Gen on a customer webinar featuring a customer who was actively using the AI assistant.\n\nRather than having Marketing explain the value, we let a customer tell the story in their own words.",
        },
        {
          heading: "The result",
          metric: { value: "17% → 50%", label: "Customer adoption" },
          body: "We did not hit the original six-month deadline.\n\nBut by month eight, half of the customer base was using the AI assistant.\n\nThe experience reinforced something I try to carry into every launch: even when there is pressure around an exciting technology, the technology cannot become the story. The customer problem and business outcome still have to come first.",
        },
      ],
    },
  },
  {
    slug: "tamr-partner-gtm",
    shortTitle: "Tamr Partner GTM",
    title: "Building Tamr's Partner GTM Motion from Scratch",
    hook: "Built Tamr's partner GTM motion with AWS, Google Cloud, and Snowflake, helping partner-influenced deals reach 50% of ARR in year one and 60% in year two.",
    category: "GTM & Launches",
    company: "Tamr",
    what: "Built Tamr's partner go-to-market motion from scratch — better-together positioning for AWS, Google Cloud, and Snowflake, Sales enablement, and Demand Gen activation.",
    why: "Tamr had major technology partnerships in place but no partner marketing foundation behind them — no positioning, no messaging, no GTM motion, and a clear business goal to make half of ARR partner-influenced.",
    result: "Partner-influenced ARR reached 50% in year one and 60% in year two.",
    cardMetric: { value: "50% → 60%", label: "Partner-Influenced ARR" },
    caseStudy: {
      sections: [
        {
          heading: "The opportunity",
          body: "Tamr had major technology partnerships with AWS, Google Cloud, and Snowflake, but there was no real go-to-market foundation behind them.\n\nThere was no positioning, no messaging, no better-together story, no joint collateral, and no Demand Gen motion.\n\nThere was, however, a clear business goal: half of Tamr's ARR needed to come from partner-influenced deals.",
        },
        {
          heading: "Building the story",
          body: "I started with Product to understand how Tamr worked with AWS, Google Cloud, and Snowflake from a technical standpoint.\n\nI then talked to customers who were already using Tamr alongside those platforms to understand what value they were seeing and what problems the combination helped them solve.\n\nUsing those conversations, I created positioning and messaging for Tamr with each of the three partners.\n\nEach partnership needed its own clear better-together narrative rather than one generic partner story.",
        },
        {
          heading: "Taking it to market",
          body: "I enabled the Sales team on the new positioning so sellers could confidently explain why Tamr and each partner were stronger together.\n\nI also worked with Demand Gen to bring the partner stories into webinars, campaigns, conference speaking opportunities, and content.\n\nThis turned the partnerships from logos and technical integrations into a repeatable GTM motion.",
        },
        {
          heading: "The result",
          metric: { value: "50%", label: "Partner-influenced ARR in year one" },
          secondaryMetric: { value: "60%", label: "Partner-influenced ARR in year two" },
          body: "The program met the 50% goal in the first year and exceeded it the following year.",
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
    why: "The previous homepage led with 'Your application's favorite application.' It was memorable, but it didn't clearly tell someone new to BugSnag what the product did or whether it was relevant to them.\n\nThe messaging also leaned heavily on technical capabilities without connecting them to the larger business outcomes — providing a better customer experience and protecting revenue.\n\nI rewrote the homepage around clarity. When someone landed on the page, I wanted them to quickly understand what BugSnag did, who it was for, and why it mattered to the business.",
    whyLabel: "Clarifying the product story",
    myRole: "Messaging strategy · Copywriting",
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
    slug: "bugsnag-retail-vertical",
    shortTitle: "BugSnag Retail Vertical",
    title: "BugSnag Retail Vertical Page",
    hook: "Retail-specific positioning for how app bugs crash conversion — especially during peak shopping seasons.",
    category: "Positioning & Messaging",
    company: "BugSnag / SmartBear",
    what: "A vertical landing page for retail and e-commerce companies, focused on how app bugs cost conversion and revenue — with messaging built around high-stakes moments like Black Friday.",
    why: "Part of a vertical messaging effort to translate BugSnag's core product story into industry-specific business problems. BugSnag had no messaging that spoke to retailers specifically, so this page connected app stability directly to conversion and revenue — speaking to e-commerce teams, not a broad developer audience.",
    myRole: "Vertical messaging · Copywriting",
    result: "Across the vertical campaigns: 948K LinkedIn impressions, outperforming previous campaigns using broader messaging.",
    thumbnail: "/work/bugsnag-retail-vertical.png",
    thumbnailPosition: "object-top",
    images: [
      {
        src: "/work/bugsnag-retail-vertical.png",
        alt: "BugSnag retail vertical page — Prevent Bugs From Crashing Conversion",
        caption: "Screenshot captured August 2026 — live page changes over time.",
      },
    ],
  },
  {
    slug: "bugsnag-hospitality-vertical",
    shortTitle: "BugSnag Hospitality Vertical",
    title: "BugSnag Hospitality Vertical Page",
    hook: "Hospitality-specific positioning for how app bugs disrupt the digital guest experience — from booking to check-in to ordering.",
    category: "Positioning & Messaging",
    company: "BugSnag / SmartBear",
    what: "A vertical landing page for hotels, restaurants, and hospitality brands, focused on how app bugs break the end-to-end digital guest experience across reservations, check-in, and in-venue ordering.",
    why: "Part of a vertical messaging effort to translate BugSnag's core product story into industry-specific business problems. Hospitality apps handle high-stakes customer moments across booking, check-in, and in-venue ordering. BugSnag needed messaging that spoke to those specific use cases — not generic developer tooling — to reach the teams responsible for guest experience.",
    myRole: "Vertical messaging · Copywriting",
    result: "Across the vertical campaigns: 948K LinkedIn impressions, outperforming previous campaigns using broader messaging.",
    thumbnail: "/work/bugsnag-hospitality-vertical.png",
    thumbnailPosition: "object-top",
    images: [
      {
        src: "/work/bugsnag-hospitality-vertical.png",
        alt: "BugSnag hospitality vertical page — From Bookings to Burgers, No Bugs Allowed",
        caption: "Screenshot captured August 2026 — live page changes over time.",
      },
    ],
  },
  {
    slug: "bugsnag-media-vertical",
    shortTitle: "BugSnag Media Vertical",
    title: "BugSnag Media Vertical Page",
    hook: "Media-specific positioning for how app bugs drive streaming viewers to competitors before they ever come back.",
    category: "Positioning & Messaging",
    company: "BugSnag / SmartBear",
    what: "A vertical landing page for streaming and media companies, focused on how app bugs cause viewers to drop off during high-stakes moments — finale nights, live events, new releases — and switch platforms.",
    why: "Part of a vertical messaging effort to translate BugSnag's core product story into industry-specific business problems. Streaming audiences are quick to leave when apps fail. BugSnag needed messaging framed around viewer retention and subscriber churn, not just error tracking, to resonate with media teams.",
    myRole: "Vertical messaging · Copywriting",
    result: "Across the vertical campaigns: 948K LinkedIn impressions, outperforming previous campaigns using broader messaging.",
    thumbnail: "/work/bugsnag-media-vertical.png",
    thumbnailPosition: "object-top",
    images: [
      {
        src: "/work/bugsnag-media-vertical.png",
        alt: "BugSnag media vertical page — Don't Let Bugs Steal Your Viewers",
        caption: "Screenshot captured August 2026 — live page changes over time.",
      },
    ],
  },
  {
    slug: "tamr-first-call-deck",
    displayOrder: 1,
    title: "Tamr First Call Deck",
    hook: "Reframed Tamr around business outcomes, not features — and sales actually used it.",
    category: "Sales Enablement",
    company: "Tamr",
    what: "The sales deck used on first calls with prospects, framing Tamr's data mastering platform around business outcomes rather than technical features.",
    why: "Prospects were more familiar with legacy MDM tools, so the deck needed to reframe the conversation around using AI to clean up dirty data, instead of relying on manual rules.",
    myRole: "Sales enablement · Narrative strategy · Copywriting",
    additionalSections: [
      {
        heading: "Rebuilding the first-call story",
        body: "The old first-call deck started by talking about Tamr. It didn't do enough to establish the problem Tamr solved or why a prospect should care, and it lacked a strong example of the kind of messy data customers were actually dealing with.\n\nI rebuilt the story to start with the problem of dirty data before introducing Tamr. From there, I explained why Tamr was different — particularly its use of AI — and added a real customer data example to make the problem and solution more concrete.\n\nI also reworked the product architecture slide with clearer examples of the data Tamr cleaned and how the product worked, so sellers had a more tangible way to explain the technology.",
      },
    ],
    result: "Sales actually used this deck in prospect calls and didn't revert back to the old one.",
    file: "/work/tamr-first-call-deck.pptx",
    preview: "/work/previews/tamr-first-call-deck.pptx.png",
    thumbnail: "/work/previews/tamr-first-call-deck.pptx.png",
  },
  {
    slug: "hunters-gigaom-radar-messaging",
    displayOrder: 3,
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
    displayOrder: 2,
    title: "Hunters Win Flash Template",
    hook: "A system for capturing what actually won deals — built from scratch.",
    category: "Sales Enablement",
    company: "Hunters",
    what: "A template for capturing why and how Hunters won a sales deal: the competitive context, what resonated with the customer, and the key insights behind the close.",
    why: "Sales wins weren't being documented, so wins had to be pieced together from Salesforce notes and POC documents after the fact. Initially ran this personally, interviewing sellers and sales engineers after each closed deal; once the team understood what to include, sellers and SEs filled it out themselves, with editing support provided. What started as a manual process became a repeatable way for Sales to capture and share why Hunters won.",
    result: "Used in sales enablement sessions as a guide for sellers sharing their win stories with the team. When a seller asked in Slack for details on a specific deal, another seller pointed them to a win flash that had been written. Someone from product said it gave real insight into which features actually mattered to customers.",
    file: "/work/hunters-win-flash-template.docx",
    preview: "/work/previews/hunters-win-flash-template.docx.png",
    thumbnail: "/work/previews/hunters-win-flash-template.docx.png",
    thumbnailPosition: "object-top",
  },
  {
    slug: "pennymac-customer-story",
    title: "PennyMac Customer Story",
    hook: "Marquee brand story on moving past a legacy SIEM with Hunters and Snowflake.",
    category: "Customer Stories",
    company: "Hunters",
    what: "A customer story on how PennyMac used Hunters' security data lake, built on Snowflake, to modernize its SIEM approach.",
    why: "PennyMac was a recognizable brand name that gave Hunters credibility with other enterprise security teams evaluating the product.",
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
    why: "Kudelski helped tell the story for organizations that liked Hunters but didn't have the analyst resources to run it themselves and needed a managed approach. It was a proof point for both the MSSP program and the broader positioning around lean security teams.",
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
    why: "After repositioning Hunters around smaller security teams with enterprise-grade needs, the story needed proof that the new ICP was real. Xactly was a customer that fit that profile — a company with a lean security team that had adopted Hunters and was seeing value.",
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
    why: "Supplier mastering was an important Tamr use case, and the sales team needed customer proof in it. This story showed how a real manufacturer used Tamr to get a clear picture of its supplier base and negotiate better prices.",
    result: "Used by sales in conversations with prospects considering Tamr for supplier mastering.",
    link: "https://www.tamr.com/bicycle-manufacturer-customer-story",
    thumbnail: "/work/tamr-accell-bicycle-hero.jpg",
    thumbnailAlt: "Low-poly illustration of a warehouse distribution center with forklift and workers",
    thumbnailPosition: "object-center",
  },
  {
    slug: "tamr-financial-services-case-study",
    title: "\"Know Your Customers\" Case Study",
    hook: "How a financial services firm built trusted customer records — and better service — with Tamr.",
    category: "Customer Stories",
    company: "Tamr",
    what: "A case study on how a major financial services company used Tamr to develop trusted customer records and use that information to provide better customer service.",
    why: "Financial services was a strategic vertical for Tamr. This story gave the sales team proof in that market — a major financial services firm that used Tamr to build trusted customer records and deliver better service.",
    result: "Used by sales in conversations with financial services firms considering Tamr.",
    link: "https://www.tamr.com/know-your-customers-drive-your-growth",
    thumbnail: "/work/tamr-western-union-hero.jpg",
    thumbnailAlt: "Low-poly illustration of businesspeople shaking hands in front of a bank building with a growth arrow",
    thumbnailPosition: "object-center",
  },
  {
    slug: "tamr-google-cloud-bigquery",
    title: "Tamr × Google Cloud / BigQuery",
    hook: "Co-bylined technical piece on Google Cloud's blog, written for Tamr's CPO.",
    category: "Thought Leadership",
    company: "Tamr",
    what: "A co-branded technical article on Google Cloud's blog, ghostwritten for Tamr's CPO, on how Tamr delivers master data management at scale using BigQuery.",
    why: "Tamr's Google Cloud partnership needed a credible, technical story that put Tamr in front of Google's much larger developer and data audience. With Tamr Cloud launching at Google Cloud Next a few months later, the piece was also an opportunity to start laying the groundwork for the launch.",
    myRole: "Content strategy · Technical writing · Partner content",
    relatedWork: { slug: "tamr-saas-launch", label: "See the SaaS launch →" },
    additionalSections: [
      {
        heading: "Using the partnership to build the narrative",
        body: "Google approached us about co-writing a blog because of our existing partnership. With Tamr Cloud launching at Google Cloud Next a few months later, I saw it as an opportunity to start laying the groundwork for the launch.\n\nI used the piece to explain Tamr's approach to data mastering to Google's much larger audience and begin establishing the story we wanted in the market ahead of the launch.\n\nTo write it, I interviewed Sales Engineers and Product to make sure I understood the technical story, then pulled together ideas Tamr had already developed across several pieces of content and adapted them into a cohesive narrative for Google's audience.",
      },
    ],
    result: "Published on Google Cloud's blog under the CPO's byline. Used by a Google seller to introduce Tamr to a retailer, who eventually bought Tamr and ran it on Google Cloud.",
    link: "https://cloud.google.com/blog/products/data-analytics/how-tamr-delivers-master-data-management-at-scale-with-bigquery",
    thumbnail: "/work/google-cloud-bigquery-article.jpg",
    thumbnailAlt: "Infographic comparing traditional rules-only MDM to Tamr's human-guided machine learning approach with BigQuery",
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
    myRole: "Research design · Data analysis · Report writing",
    additionalSections: [
      {
        heading: "Rebuilding the research in-house",
        body: "Previous versions of the Application Stability Index relied on an outside firm to analyze the data and write the report. We didn't have budget to take the same approach, so I rebuilt the process internally.\n\nI worked with Product to pull anonymized data from customers using BugSnag's SaaS product, using the previous report as a starting point for what we wanted to examine.\n\nOnce I had the data, I worked with Sales Engineering, Product, and one of the software engineers who built BugSnag to understand the findings and pressure-test my interpretation. I also analyzed the data myself for patterns and used Claude to help me reverse-engineer how some of the calculations in the previous report had been constructed.\n\nFrom there, I wrote the report around what the data could tell us about mobile application stability and how BugSnag approached measuring it.",
      },
      {
        heading: "Planned activation",
        body: "The report was intended to create awareness around BugSnag's approach to mobile app stability while giving Sales an original, data-backed story to bring into customer conversations.\n\nI planned a broader campaign around the research, including a webinar, supporting blog content, and a video with a BugSnag engineer explaining how companies could improve their application stability scores.\n\nThe campaign did not launch because I was laid off before it went to market.",
      },
    ],
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
    thumbnail: "/work/smartbear-observability-blog.jpg",
    thumbnailAlt: "Developer working at a multi-monitor setup showing code and analytics dashboards",
    thumbnailPosition: "object-center",
  },
  {
    slug: "hunters-next-gen-siem-blog",
    title: "Next-Gen SIEM, AI, and Cloud SecOps",
    hook: "A point-of-view piece on where AI and cloud are taking the SIEM category.",
    category: "Blogs",
    company: "Hunters",
    what: "A blog post on how AI and cloud architecture are reshaping what a modern SIEM needs to do.",
    why: "Part of Hunters' broader content strategy establishing a point of view on where the SIEM category was heading.",
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
    title: "BugSnag Arcade Game",
    hook: "Retro arcade game built to reach technical audiences through interactive content.",
    category: "Interactive",
    company: "BugSnag / SmartBear",
    what: "A retro-style arcade game built with Claude Code, using real BugSnag error types pulled from documentation.",
    why: "I wanted to learn Claude Code while experimenting with a different way to engage technical audiences that often tune out traditional marketing.\n\nI'd seen a CMO use an arcade-style game as part of an ABM campaign and liked the idea of creating something people would actually want to interact with. BugSnag was just starting to explore ABM, so I built a BugSnag-themed game as an experiment in what that kind of experience could look like.\n\nThe game wasn't ultimately used in an ABM campaign, but it gave me a hands-on way to explore both AI-assisted development and a different approach to technical marketing.",
    whyLabel: "Why I built it",
    link: "https://fredjo.xyz/games/shooter",
  },
];

export function getEntryBySlug(slug: string): WorkEntry | undefined {
  return workEntries.find((e) => e.slug === slug);
}

export function getEntriesByCategory(category: string): WorkEntry[] {
  return workEntries.filter((e) => e.category === category);
}
