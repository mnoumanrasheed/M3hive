// Curated official public resource links.
// Match existing resources by originalTitle, replace the visible heading with displayTitle,
// and open Read more directly at externalUrl.

export interface OfficialResourceLink {
    originalTitle: string;
    displayTitle: string;
    kind: "article" | "case-study-or-resource";
    sourceName: string;
    externalUrl: string;
    officialDate: string | null;
}

export const officialResourceLinks: OfficialResourceLink[] = [
    {
        "originalTitle": "How Salesforce Enables the Next Generation of Customer-Centric Financial Services",
        "displayTitle": "Service Cloud for Financial Services",
        "kind": "article",
        "sourceName": "Salesforce",
        "externalUrl": "https://www.salesforce.com/financial-services/customer-experience/",
        "officialDate": null
    },
    {
        "originalTitle": "AI-Powered Insights in Retail: Enabling Smarter, Faster Decision-Making",
        "displayTitle": "Accelerate consumer goods time-to-market with AI-driven consumer insights and design",
        "kind": "article",
        "sourceName": "Microsoft",
        "externalUrl": "https://www.microsoft.com/en-us/ai/use-case/accelerate-consumer-goods-time-to-market-with-ai",
        "officialDate": null
    },
    {
        "originalTitle": "Achieve Faster Product Cycles in Retail with AI-Driven Engineering",
        "displayTitle": "Accelerate product development and engineering",
        "kind": "article",
        "sourceName": "Microsoft",
        "externalUrl": "https://www.microsoft.com/en-us/ai/use-case/accelerate-product-development-with-ai",
        "officialDate": null
    },
    {
        "originalTitle": "AR/VR Trends and Predictions for 2025 and Beyond",
        "displayTitle": "State of XR & Spatial Computing",
        "kind": "article",
        "sourceName": "NVIDIA",
        "externalUrl": "https://www.nvidia.com/en-us/on-demand/session/gtc24-s62269/",
        "officialDate": "March 2024"
    },
    {
        "originalTitle": "Six Key Challenges in AI Engineering and How to Overcome Them",
        "displayTitle": "Secure Software Development Practices for Generative AI and Dual-Use Foundation Models",
        "kind": "article",
        "sourceName": "NIST",
        "externalUrl": "https://www.nist.gov/news-events/news/2024/07/secure-software-development-practices-generative-ai-and-dual-use-foundation",
        "officialDate": "July 26, 2024"
    },
    {
        "originalTitle": "Digital Assurance in MedTech: Building Safe, Compliant Software That Lasts",
        "displayTitle": "Computer Software Assurance for Production and Quality Management System Software",
        "kind": "article",
        "sourceName": "U.S. FDA",
        "externalUrl": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/computer-software-assurance-production-and-quality-management-system-software",
        "officialDate": "February 2026"
    },
    {
        "originalTitle": "Data as Currency: The Emerging Economy of Digital Value",
        "displayTitle": "Unlocking financial benefits through data monetization",
        "kind": "article",
        "sourceName": "IBM",
        "externalUrl": "https://www.ibm.com/think/insights/data-monetization-strategy",
        "officialDate": null
    },
    {
        "originalTitle": "Building Trustworthy and Scalable AI Models for US FinTech Compliance",
        "displayTitle": "How responsible AI helps financial services manage risk and assure compliance",
        "kind": "article",
        "sourceName": "Microsoft",
        "externalUrl": "https://www.microsoft.com/en-us/microsoft-cloud/blog/financial-services/2024/04/01/how-responsible-ai-helps-financial-services-manage-risk-and-assure-compliance/",
        "officialDate": "April 1, 2024"
    },
    {
        "originalTitle": "Redefining Player Engagement in iGaming with Conversational AI",
        "displayTitle": "Build Real-Time, Voice-Controlled AI Teammates In Games",
        "kind": "article",
        "sourceName": "NVIDIA",
        "externalUrl": "https://www.nvidia.com/en-us/on-demand/session/gtc25-S73229/",
        "officialDate": "March 2025"
    },
    {
        "originalTitle": "Modern Data Technology: Building an AI-Ready Data Infrastructure for Enhanced BFSI Analytics",
        "displayTitle": "Data Intelligence Platform for Financial Services - Serving the Underbanked population with the Databricks Lakehouse",
        "kind": "article",
        "sourceName": "Databricks",
        "externalUrl": "https://notebooks.databricks.com/demos/lakehouse-fsi-credit/00-Credit-Decisioning.html",
        "officialDate": null
    },
    {
        "originalTitle": "Easing the Impact of Tariffs with AI and Automation",
        "displayTitle": "3 ways to navigate changing tariffs with AI agents",
        "kind": "article",
        "sourceName": "Microsoft",
        "externalUrl": "https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2025/10/30/navigate-changing-tariffs-build-an-agent-that-keeps-up-with-your-supply-chain/",
        "officialDate": "October 30, 2025"
    },
    {
        "originalTitle": "How Workflow Automation Prevents Operational Flatlines in Healthcare",
        "displayTitle": "Exploring Healthcare Operations Core",
        "kind": "article",
        "sourceName": "ServiceNow",
        "externalUrl": "https://www.servicenow.com/docs/r/healthcare-life-sciences/healthcare-operations-core/hcls-cto-exploring.html",
        "officialDate": "March 12, 2026"
    },
    {
        "originalTitle": "What to Consider When Selecting a Generative AI Development Partner",
        "displayTitle": "AWS AI Competency Partners",
        "kind": "article",
        "sourceName": "AWS",
        "externalUrl": "https://aws.amazon.com/ai/generative-ai/partners/",
        "officialDate": null
    },
    {
        "originalTitle": "From Browsing to Buying: The Role of Agentic AI in Retail",
        "displayTitle": "How Agentic AI is Reshaping Retail",
        "kind": "article",
        "sourceName": "Salesforce",
        "externalUrl": "https://www.salesforce.com/retail/artificial-intelligence/agentic-ai-in-retail/",
        "officialDate": null
    },
    {
        "originalTitle": "How Responsible AI Is Reshaping Financial Services Technology",
        "displayTitle": "4 principles of Responsible AI in financial services",
        "kind": "article",
        "sourceName": "Microsoft",
        "externalUrl": "https://www.microsoft.com/en-us/industry/blog/financial-services/2021/03/29/4-principles-of-responsible-ai-in-financial-services/",
        "officialDate": "March 29, 2021"
    },
    {
        "originalTitle": "Beyond Data Optimisation: How Generative AI Is Creating New Business Opportunities",
        "displayTitle": "Exploring generative AI to maximize experiences, decision-making and business value",
        "kind": "article",
        "sourceName": "IBM",
        "externalUrl": "https://www.ibm.com/think/insights/generative-ai-business-value",
        "officialDate": null
    },
    {
        "originalTitle": "How Hyperautomation Is Reshaping the Future of Banking",
        "displayTitle": "The state of automation in banking & financial services: 2026",
        "kind": "article",
        "sourceName": "UiPath",
        "externalUrl": "https://www.uipath.com/resources/automation-whitepapers/state-of-automation-in-banking-and-financial-services",
        "officialDate": "2026"
    },
    {
        "originalTitle": "Smart Travel Experiences: How Agentic AI Is Redefining Travel and Hospitality",
        "displayTitle": "From Stress to Success: How Agentic AI Is Streamlining Vacation Planning",
        "kind": "article",
        "sourceName": "Salesforce",
        "externalUrl": "https://www.salesforce.com/news/stories/agentic-ai-for-vacation-planning/",
        "officialDate": "July 29, 2025"
    },
    {
        "originalTitle": "AI-Driven Engineering in Healthcare: Reducing Development Time Without Compromising Care",
        "displayTitle": "Creating an Extensible Virtual Healthcare Service Using AWS for Amazon Clinic",
        "kind": "article",
        "sourceName": "AWS",
        "externalUrl": "https://aws.amazon.com/solutions/case-studies/amazon-clinic-case-study/",
        "officialDate": null
    },
    {
        "originalTitle": "Using Personalised AI Recommendations to Strengthen Customer Experience",
        "displayTitle": "Deliver Personalized Recommendations",
        "kind": "article",
        "sourceName": "Salesforce",
        "externalUrl": "https://help.salesforce.com/s/articleView?id=mktg.persnl_agentforce_personalized_recs_understanding_user_intent.htm&language=en_US&type=5",
        "officialDate": null
    },
    {
        "originalTitle": "How AI Is Reshaping the Financial Services Industry",
        "displayTitle": "AI in banking",
        "kind": "article",
        "sourceName": "IBM",
        "externalUrl": "https://www.ibm.com/think/topics/ai-in-banking",
        "officialDate": "May 23, 2025"
    },
    {
        "originalTitle": "Outdated Payment Systems: Is Your Checkout Costing You Customers?",
        "displayTitle": "Checkout optimisation tips to improve conversion rates",
        "kind": "article",
        "sourceName": "Stripe",
        "externalUrl": "https://stripe.com/gb/resources/more/checkout-optimization-tips-to-improve-conversion-rates",
        "officialDate": "July 22, 2024"
    },
    {
        "originalTitle": "Transforming the Automotive Industry with AI-Powered Technology",
        "displayTitle": "Redefining Auto Innovation With AI and Digitalization",
        "kind": "article",
        "sourceName": "NVIDIA",
        "externalUrl": "https://www.nvidia.com/en-us/industries/automotive/",
        "officialDate": null
    },
    {
        "originalTitle": "Automotive Predictions: AI and Machine-Learning Innovation",
        "displayTitle": "Hyundai Motor, Kia and NVIDIA Expand Strategic Partnership for Next-Generation Autonomous Driving Technology",
        "kind": "article",
        "sourceName": "NVIDIA",
        "externalUrl": "https://nvidianews.nvidia.com/news/hyundai-motor-kia-autonomous-driving",
        "officialDate": "March 16, 2026"
    },
    {
        "originalTitle": "Mastering Salesforce Integration: Best Practices and Practical Guidance",
        "displayTitle": "Integration Patterns",
        "kind": "article",
        "sourceName": "Salesforce Architects",
        "externalUrl": "https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns",
        "officialDate": null
    },
    {
        "originalTitle": "Migrating to Salesforce Marketing Cloud: A Guide for Mid-Market and Large Organisations",
        "displayTitle": "Get started with Marketing Cloud Next",
        "kind": "article",
        "sourceName": "Salesforce",
        "externalUrl": "https://www.salesforce.com/marketing/start-marketing-cloud-next/",
        "officialDate": null
    },
    {
        "originalTitle": "M3 Hive Acquires GoSolve Group",
        "displayTitle": "Accenture Acquires Keepler to Boost Its AI and Data Business in Spain",
        "kind": "case-study-or-resource",
        "sourceName": "Accenture",
        "externalUrl": "https://newsroom.accenture.com/news/2026/accenture-acquires-keepler-to-boost-its-ai-and-data-business-in-spain",
        "officialDate": "April 8, 2026"
    },
    {
        "originalTitle": "Accelerating Incremental Growth Through Offshoring",
        "displayTitle": "Global Outsourcing Survey 2024",
        "kind": "case-study-or-resource",
        "sourceName": "Deloitte",
        "externalUrl": "https://www.deloitte.com/global/en/issues/work/global-outsourcing-survey.html",
        "officialDate": "2024"
    },
    {
        "originalTitle": "Customer-Centred Product Development Guide",
        "displayTitle": "Product development life cycle: The 7 stages explained",
        "kind": "case-study-or-resource",
        "sourceName": "Atlassian",
        "externalUrl": "https://www.atlassian.com/agile/product-management/product-development",
        "officialDate": null
    },
    {
        "originalTitle": "BFSI State of the Nation",
        "displayTitle": "Global Banking Annual Review 2025: Why precision, not heft, defines the future of banking",
        "kind": "case-study-or-resource",
        "sourceName": "McKinsey & Company",
        "externalUrl": "https://www.mckinsey.com/industries/financial-services/our-insights/global-banking-annual-review-2025",
        "officialDate": "October 23, 2025"
    },
    {
        "originalTitle": "Fashion and Retail Industry Insights",
        "displayTitle": "The State of Fashion 2025: Challenges at every turn",
        "kind": "case-study-or-resource",
        "sourceName": "McKinsey & Company",
        "externalUrl": "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion-2025",
        "officialDate": "November 11, 2024"
    },
    {
        "originalTitle": "iGaming Industry Insights",
        "displayTitle": "What Trends Determine iGaming in 2025? Insights from SOFTSWISS Report",
        "kind": "case-study-or-resource",
        "sourceName": "SOFTSWISS",
        "externalUrl": "https://www.softswiss.com/news/igaming-trends-2025-insights-from-softswiss-report/",
        "officialDate": "November 11, 2024"
    },
    {
        "originalTitle": "Travel and Hospitality Industry Insights",
        "displayTitle": "2025 travel industry outlook",
        "kind": "case-study-or-resource",
        "sourceName": "Deloitte",
        "externalUrl": "https://www.deloitte.com/us/en/Industries/consumer/articles/travel-hospitality-industry-outlook.html",
        "officialDate": "2025"
    },
    {
        "originalTitle": "Transforming Santander’s Mortgage-Transfer Process",
        "displayTitle": "Garsa: Saves up to €30,000 Euros per Month with New Digital Mortgage Automation",
        "kind": "case-study-or-resource",
        "sourceName": "Appian",
        "externalUrl": "https://appian.com/about/explore/customers/all-customers/garsa",
        "officialDate": null
    },
    {
        "originalTitle": "Consolidating TUI’s Payment Platform",
        "displayTitle": "citizenM: Optimizing the customer experience with Adyen",
        "kind": "case-study-or-resource",
        "sourceName": "Adyen",
        "externalUrl": "https://www.adyen.com/knowledge-hub/citizen-m--optimizing-the-customer-experience-with-adyen",
        "officialDate": "July 9, 2019"
    },
    {
        "originalTitle": "AI Discovery Across a Portfolio of 600 Start-ups",
        "displayTitle": "The 2025 AWS Generative AI Accelerator: 40 startups shooting for the stars",
        "kind": "case-study-or-resource",
        "sourceName": "AWS",
        "externalUrl": "https://aws.amazon.com/aws-startups/learn/the-2025-aws-generative-ai-accelerator-40-startups-shooting-for-the-stars/?lang=en-US",
        "officialDate": "October 7, 2025"
    },
    {
        "originalTitle": "Automating Lead-to-Cash Operations with AI",
        "displayTitle": "Lead to Cash: A Guide to Accelerating B2B Revenue Operations",
        "kind": "case-study-or-resource",
        "sourceName": "Salesforce",
        "externalUrl": "https://www.salesforce.com/sales/revenue-lifecycle-management/lead-to-cash/",
        "officialDate": "July 6, 2026"
    },
    {
        "originalTitle": "Reducing Shipping Emissions Through AI",
        "displayTitle": "AI assisted vessels",
        "kind": "case-study-or-resource",
        "sourceName": "Stena Line",
        "externalUrl": "https://stenaline.com/media/stories/ai-assisted-vessels/",
        "officialDate": "April 1, 2021"
    },
    {
        "originalTitle": "Automating Property Listings and Auctions",
        "displayTitle": "Avison Young and UiPath Partner to Drive Automation-Powered Real Estate Experiences",
        "kind": "case-study-or-resource",
        "sourceName": "UiPath",
        "externalUrl": "https://www.uipath.com/newsroom/avison-young-and-uipath-partner-to-drive-automation-real-estate-experiences",
        "officialDate": "January 10, 2022"
    },
    {
        "originalTitle": "Telemedicine DevSecOps and Cloud Transformation",
        "displayTitle": "Doxy.me & the Race to Telemedicine: Flying Before You Can Run",
        "kind": "case-study-or-resource",
        "sourceName": "AWS",
        "externalUrl": "https://aws.amazon.com/blogs/startups/how-doxyme-scaled-telehealth-during-the-pandemic/",
        "officialDate": "February 3, 2021"
    },
    {
        "originalTitle": "Increasing Parent Adoption Through an AI Education Platform",
        "displayTitle": "Wichita Public Schools’ AI adoption: How it started, how it’s going",
        "kind": "case-study-or-resource",
        "sourceName": "Microsoft",
        "externalUrl": "https://www.microsoft.com/en-us/education/blog/2025/06/wichita-public-schools-ai-adoption-how-it-started-how-its-going/",
        "officialDate": "June 24, 2025"
    },
    {
        "originalTitle": "Intelligent Automation for the Pharmaceutical Industry",
        "displayTitle": "UiPath Gives a Major Push to Piramal Group’s DX Agenda as It Streamlines 60 Processes with Major Savings",
        "kind": "case-study-or-resource",
        "sourceName": "UiPath",
        "externalUrl": "https://www.uipath.com/resources/automation-case-studies/piramal-enterprises-pharma-financial-services-rpa",
        "officialDate": null
    },
    {
        "originalTitle": "Automotive Business-Process Automation",
        "displayTitle": "Employees at Constellation Automotive Group Have More Time to Focus On Customers",
        "kind": "case-study-or-resource",
        "sourceName": "UiPath",
        "externalUrl": "https://www.uipath.com/resources/automation-case-studies/rpa-at-constellation-automotive",
        "officialDate": null
    }
];