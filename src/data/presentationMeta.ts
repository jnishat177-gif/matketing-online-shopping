export interface PresentationSlideSummary {
  slideNumber: number;
  title: string;
  subtitle: string;
  keyHighlight: string;
}

export const PRESENTATION_SLIDES: PresentationSlideSummary[] = [
  {
    slideNumber: 1,
    title: 'Title & Defense Overview',
    subtitle: 'MarketingHub Online Platform',
    keyHighlight: 'CSE Final Year Project · Student, Supervisor & Institution Details'
  },
  {
    slideNumber: 2,
    title: 'Problem Statement & Use Case',
    subtitle: 'Bangladeshi E-Commerce Gaps',
    keyHighlight: 'Multi-vendor isolation, mobile wallets & embedded UML Use Case Diagram'
  },
  {
    slideNumber: 3,
    title: 'Existing Systems vs. MarketingHub',
    subtitle: 'Comparative Benchmark Matrix',
    keyHighlight: 'Feature gap comparison against Daraz, Chaldal & Shajgoj'
  },
  {
    slideNumber: 4,
    title: '4-Role RBAC & Real Product Gallery',
    subtitle: '8 Categories with Live Photos',
    keyHighlight: 'Customer, Seller, Admin, Delivery + all 8 real product images'
  },
  {
    slideNumber: 5,
    title: 'Multi-Tier System Architecture',
    subtitle: 'Client, DRF, Redis & Gateways',
    keyHighlight: 'Includes high-resolution Digital System Architecture Diagram'
  },
  {
    slideNumber: 6,
    title: 'Tech Stack & Live Portal Previews',
    subtitle: 'Frontend, Backend & UI Screens',
    keyHighlight: 'React 19, Django/DRF, PostgreSQL + Storefront & Seller/Admin UI'
  },
  {
    slideNumber: 7,
    title: 'Database Design (22 Tables)',
    subtitle: 'Relational Schema & ER Model',
    keyHighlight: 'Multi-vendor Order_Items splitting & atomic stock locks + ER Diagram'
  },
  {
    slideNumber: 8,
    title: 'bKash/Nagad & Real-Time Engine',
    subtitle: 'Payment & WebSocket Workflows',
    keyHighlight: 'Includes Payment Sequence Diagram & Real-Time Marketing Architecture'
  },
  {
    slideNumber: 9,
    title: 'Live Checkout, Courier & QA Audits',
    subtitle: 'End-to-End Screens & Benchmarks',
    keyHighlight: 'QA suite results + live bKash Checkout, Tracking & Delivery Hub UI'
  },
  {
    slideNumber: 10,
    title: 'Conclusion, Future Scope & Q&A',
    subtitle: 'Defense Summary',
    keyHighlight: 'AI recommendations, mobile app roadmap & Viva Q&A closing slide'
  }
];
