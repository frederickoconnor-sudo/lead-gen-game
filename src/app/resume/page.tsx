import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Fred O'Connor",
  description: "Product marketer with 9+ years of B2B SaaS experience across cybersecurity, data management, and software development.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-5 pt-8 border-t border-gray-100">
      {children}
    </h2>
  );
}

function Role({
  company,
  description,
  title,
  dates,
  bullets,
}: {
  company: string;
  description: string;
  title: string;
  dates: string;
  bullets: string[];
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between gap-4 mb-0.5">
        <h3 className="text-base font-semibold text-gray-900">{company}</h3>
        <span className="text-sm text-gray-400 flex-shrink-0">{dates}</span>
      </div>
      <p className="text-xs text-gray-400 mb-1">{description}</p>
      <p className="text-sm text-gray-500 mb-3 italic">{title}</p>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
            <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-gray-300" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/work" className="hover:text-gray-900 transition-colors">Work</Link>
            <Link href="/resume" className="text-gray-900 font-medium">Resume</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Fred O&apos;Connor</h1>
          <p className="text-sm text-gray-500 mb-5">
            <a href="mailto:frederickoconnor@gmail.com" className="hover:text-gray-900 transition-colors">
              frederickoconnor@gmail.com
            </a>
            &nbsp;&nbsp;·&nbsp;&nbsp;Boston, MA&nbsp;&nbsp;·&nbsp;&nbsp;
            <a
              href="https://linkedin.com/in/fredjoconnor/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              linkedin.com/in/fredjoconnor
            </a>
          </p>
          <a
            href="/Fred_OConnor_Resume_General.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-gray-500 hover:text-gray-900 transition-all"
          >
            <DownloadIcon />
            Download Resume (PDF)
          </a>
        </div>

        {/* Summary */}
        <p className="text-base text-gray-700 leading-relaxed border-t border-gray-100 pt-8">
          Product marketer with 9+ years of B2B SaaS experience, including cybersecurity (EDR, SIEM, IAM), data management, and software development. Builds competitive intelligence and win/loss programs that arm sales teams, and translates complex, technical capabilities into narratives that resonate with buyers and sellers. Partners cross-functionally with product, sales, and demand gen to launch GTM campaigns and unblock deals. User of Claude and ChatGPT to speed up research, competitive analysis, and content production.
        </p>

        {/* Experience */}
        <SectionHeading>Experience</SectionHeading>

        <Role
          company="SmartBear"
          description="B2B SaaS platform for application development, testing, and monitoring (BugSnag product line)"
          title="Senior Product Marketing Manager"
          dates="2025–2026"
          bullets={[
            "Developed and executed go-to-market strategy for BugSnag, a developer-focused application monitoring tool, building buyer personas, use case messaging, and verticalized campaigns for engineering and DevOps teams at media, retail, and hospitality companies, generating 948K impressions and outperforming broad-audience benchmarks on CTR.",
            "Conceived and authored an original benchmark report using anonymized BugSnag customer data, letting customers compare their app stability against their peers — a data-driven thought leadership asset designed to differentiate BugSnag's content program.",
            "Generated $400K in pipeline and 103 SQLs by launching BugSnag's first customer-speaker webinar, owning end-to-end execution including messaging, promotion, and sales follow-up enablement.",
            "Built a CustomGPT for SDRs that surfaced real-time account intelligence and auto-generated personalized Outreach sequences, cutting account research time from 35 minutes to 15 minutes.",
            "Created SDR revenue enablement kit (ICP profile, messaging framework, customer story packet) that equipped outbound teams with tools to improve meeting conversion rates.",
          ]}
        />

        <Role
          company="Hunters"
          description="B2B SaaS cybersecurity startup in the SIEM (security information and event management) space"
          title="Senior Product Marketing Manager"
          dates="2023–2025"
          bullets={[
            "Built competitive intelligence program from scratch, including win/loss analysis, producing battlecards and objection-handling playbooks that equipped sellers to differentiate Hunters against legacy SIEMs and a major cloud platform provider — resulting in a competitive win.",
            "Led cross-functional positioning workshop with executives, AEs, SEs, and partners to develop persona-specific messaging for CISO and security director buyers; repositioned Hunters as the SIEM for lean SOC teams, reducing average sales cycle from 9 months to 6.",
            "Created a win flash template capturing why and how deals were won; ran the process personally at first, then trained sellers and sales engineers to self-report, with editing support — used in sales enablement sessions and referenced by product to understand which features mattered most to customers.",
            "Turned Hunters' recognition as a Fast Moving Leader in the GigaOm SIEM Radar into a full analyst-relations package — competitive breakdowns, objection handling, and an external elevator pitch — giving sales credible, third-party-backed positioning.",
            "Developed joint GTM initiatives with technology partners including CrowdStrike, Snowflake, and Cribl around security data lake and SIEM modernization use cases, creating co-sell narratives that opened new enterprise pipeline.",
            "Owned end-to-end GTM for the launch of Hunters' MSSP channel program, developing partner positioning, sales messaging, and enablement playbooks that generated 8 partner meetings and 3 closed-won deals.",
          ]}
        />

        <Role
          company="Tamr"
          description="Late-stage B2B SaaS startup offering an ML-powered master data management (MDM) platform"
          title="Senior Product Marketing Manager (2022–2023)  ·  Product Marketing Manager (2020–2022)"
          dates="2020–2023"
          bullets={[
            "Built and delivered the sales deck used on first calls with prospects, reframing Tamr's data mastering platform around business outcomes instead of technical features — adopted by the sales team in place of the prior deck.",
            "Produced the first 18 episodes of DataMasters, Tamr's podcast, recruiting guests including chief data officers from the City of Boston and El Al Israel Airlines, and developing episode ideas and interview questions.",
            "Supported Forrester and Gartner analyst briefings and coordinated customer participation in a Forrester TEI study to establish market credibility.",
            "Led adoption campaign for Smart Curation, a Snowflake Native App, reframing messaging from technical features to the business impact of data issues and driving targeted outreach with customer success, increasing usage from 25% to 60% in two quarters.",
            "Owned GTM strategy and messaging for SaaS platform launch; synthesized beta customer insights into positioning and solution briefs that enabled sales to generate $500K in pipeline within six months.",
            "Built partner marketing program from zero, developing positioning and GTM strategy for Google Cloud, AWS, and Snowflake partnerships; partner-influenced revenue grew to 50% of ARR in FY2021 and 60% in FY2022.",
          ]}
        />

        <Role
          company="Veridium"
          description="Early-stage B2B cybersecurity startup in the identity and access management (IAM) space"
          title="Content and Product Marketing Manager"
          dates="2018–2020"
          bullets={[
            "Joined as the first product marketer and built the entire go-to-market foundation: positioning, messaging, website narrative, sales decks, and competitive messaging for a security product sold to enterprise IT and security buyers.",
            "Executed product launch for a biometric face authentication feature — persona-based messaging, sales enablement, and email campaign that achieved a 10% response rate and 8 BDR meetings booked in three months.",
            "Developed a quarterly webinar program targeting IT and security practitioners that grew to 200 registrants per event.",
          ]}
        />

        <Role
          company="Cybereason"
          description="Early-stage B2B cybersecurity startup in the EDR (endpoint detection and response) space"
          title="Product Marketing Manager (2017–2018)  ·  Senior Content Writer (2015–2017)"
          dates="2015–2018"
          bullets={[
            "Launched a free ransomware protection tool; defined the free-to-paid developer and security practitioner buyer journey and content strategy that drove page-one Google rankings and 2,000 downloads in six months.",
            "Partnered with security researchers to produce threat intelligence reports that earned press coverage in Dark Reading and CNN, establishing Cybereason's credibility with technical security audiences.",
            "Owned conference content program for Black Hat and RSA; produced ebooks that influenced major enterprise deals in FY2017.",
          ]}
        />

        <Role
          company="IDG News Service"
          description="News service for IDG publications (CIO.com, Computerworld)"
          title="Reporter"
          dates="2012–2015"
          bullets={[
            "Covered enterprise technology for CIO.com and Computerworld, publishing bylined news articles and tech analysis.",
          ]}
        />

        {/* Skills */}
        <SectionHeading>Skills &amp; Tools</SectionHeading>
        <div className="space-y-3 mb-8">
          <div className="flex gap-3 text-sm">
            <span className="font-medium text-gray-900 flex-shrink-0 w-40">Core Skills</span>
            <span className="text-gray-600">
              Positioning &amp; Messaging · Competitive Intelligence &amp; Win/Loss Analysis · GTM Strategy · Product Launches · Sales Enablement · Buyer Persona Development · Partner Marketing · Analyst Relations (Gartner, Forrester) · Demand Generation Collaboration
            </span>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="font-medium text-gray-900 flex-shrink-0 w-40">Marketing &amp; Sales Tools</span>
            <span className="text-gray-600">HubSpot · Salesforce · Outreach · Seismic · Highspot · WordPress · Asana</span>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="font-medium text-gray-900 flex-shrink-0 w-40">AI Tools</span>
            <span className="text-gray-600">Claude · Claude Code · ChatGPT</span>
          </div>
        </div>

        {/* Education */}
        <SectionHeading>Education</SectionHeading>
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Boston University</h3>
            <p className="text-sm text-gray-500">Bachelor of Science, Journalism</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-gray-100 mt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Fred O&apos;Connor — Product Marketing</p>
          <a
            href="/Fred_OConnor_Resume_General.pdf"
            download
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors inline-flex items-center gap-1.5"
          >
            <DownloadIcon />
            Download PDF
          </a>
        </div>
      </footer>
    </div>
  );
}
