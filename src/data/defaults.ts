export const defaultHeroData = {
  mainHeading: "SWENLOG Supply Chain",
  subHeading: "Solutions", 
  description: "Your trusted partner for comprehensive logistics and supply chain solutions across India. From strategic planning to last-mile delivery, we ensure your cargo reaches its destination safely and on time.",
  imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
};

export const defaultCtaData = {
  text: 'Get Your Free Quote Today!',
  link: '/contact',
  enabled: true,
};

export const defaultMediaData = [
  { id: '1', name: 'Woman on laptop', url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'A woman sitting on a bed using a laptop' },
  { id: '2', name: 'Laptop on desk', url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'Turned on gray laptop computer' },
  { id: '3', name: 'Circuit board', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'Macro photography of black circuit board' },
  { id: '4', name: 'Code on monitor', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'Monitor showing Java programming' },
];

export const defaultPages = [
  { id: 'p1', title: 'About Our Company', slug: 'about-us', content: '## About Us\n\nWe are a leading logistics company...', published: true },
  { id: 'p2', title: 'Terms of Service', slug: 'terms', content: '## Terms of Service\n\nPlease read these terms carefully.', published: false },
  { id: 'p3', title: 'Privacy Policy', slug: 'privacy-policy', content: '## Privacy Policy\n\nYour privacy is important to us. This policy describes how we collect, use, and protect your information.', published: true },
  { id: 'p4', title: 'Cookie Policy', slug: 'cookie-policy', content: '## Cookie Policy\n\nWe use cookies to improve your experience on our website. Learn more about our cookie usage.', published: true },
  { id: 'p5', title: 'Track Shipment', slug: 'track-shipment', content: '## Track Your Shipment\n\nEnter your tracking number to get real-time updates on your shipment status.', published: true },
  { id: 'p6', title: 'Customer Portal', slug: 'customer-portal', content: '## Customer Portal\n\nAccess your account, view shipment history, and manage your logistics needs.', published: true },
  { id: 'p7', title: 'Documentation', slug: 'documentation', content: '## Documentation\n\nFind all the necessary forms, guides, and documentation for your shipping needs.', published: true },
  { id: 'p8', title: 'Industry Insights', slug: 'industry-insights', content: '## Industry Insights\n\nStay updated with the latest trends and insights in the logistics industry.', published: true },
  { id: 'p9', title: 'Support Center', slug: 'support-center', content: '## Support Center\n\nGet help with your questions and find solutions to common issues.', published: true },
  { id: 'p10', title: 'News & Updates', slug: 'news-updates', content: '## News & Updates\n\nStay informed about the latest company news and industry updates.', published: true },
  { id: 'p11', title: 'Investor Relations', slug: 'investor-relations', content: '## Investor Relations\n\nInformation for investors and stakeholders about our company performance.', published: true },
  { id: 'p12', title: 'Sustainability', slug: 'sustainability', content: '## Sustainability\n\nLearn about our commitment to sustainable logistics and environmental responsibility.', published: true },
  { id: 'p13', title: 'Partner Network', slug: 'partner-network', content: '## Partner Network\n\nExplore opportunities to join our global network of logistics partners.', published: true },
];

export const defaultSubmissions = [
    { id: 'q1', name: 'John Doe', email: 'john@example.com', service: 'Air Freight', message: 'Looking to ship 2 tons of coffee beans from Colombia to USA.', status: 'new' as const, createdAt: new Date().toISOString() },
    { id: 'q2', name: 'Jane Smith', email: 'jane@example.com', service: 'Ocean Freight', message: 'Need a quote for a full container load from Shanghai to Los Angeles.', status: 'contacted' as const, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
];

export const defaultAboutData = {
    title: "About SWENLOG",
    paragraph1: "SWENLOG Supply Chain Solutions Private Limited has established itself as a leading logistics and supply chain management company in India. With our registered office in Chennai and corporate headquarters in Bengaluru, we serve clients across multiple industries with comprehensive logistics solutions.",
    paragraph2: "Our strategic presence across key Indian cities - including Chennai, Bengaluru, Coimbatore, Tuticorin, Cochin, Mumbai, and Delhi - enables us to provide seamless supply chain solutions from port to doorstep. We specialize in serving automotive, pharmaceutical, engineering, FMCG, and other critical industries.",
    stat1_value: "7",
    stat1_label: "Strategic Locations",
    stat2_value: "500+",
    stat2_label: "Happy Clients",
    values_title: "Our Core Values",
    values: [
        { id: 'v1', icon: 'Shield', title: 'Reliability & Trust', description: 'Building long-term relationships through consistent, dependable service delivery.' },
        { id: 'v2', icon: 'Lightbulb', title: 'Innovation', description: 'Leveraging technology and best practices to optimize supply chain efficiency.' },
        { id: 'v3', icon: 'Users', title: 'Customer Focus', description: 'Tailoring solutions to meet unique industry requirements and business needs.' }
    ]
};

export const defaultHeaderData = {
  logoText: "SWENLOG",
  logoSubtext: "Global Logistics Solutions",
  ctaButtonText: "Get Quote",
  ctaButtonLink: "/quote",
  navigationItems: [
    {
      name: 'Services',
      url: '#',
      dropdown: [
        { name: 'Ocean Freight', url: '/services/ocean-freight' },
        { name: 'Air Freight', url: '/services/air-freight' },
        { name: 'Ground Transportation', url: '/services/ground-transportation' },
        { name: 'Customs Brokerage', url: '/services/customs-brokerage' },
        { name: 'Warehousing & Distribution', url: '/services/warehousing-distribution' },
        { name: 'Supply Chain Solutions', url: '/services/supply-chain-solutions' }
      ]
    },
    {
      name: 'Industries',
      url: '#',
      dropdown: [
        { name: 'Automotive', url: '/industries/automotive' },
        { name: 'Technology', url: '/industries/technology' },
        { name: 'Retail & Fashion', url: '/industries/retail-fashion' },
        { name: 'Healthcare', url: '/industries/healthcare' },
        { name: 'Manufacturing', url: '/industries/manufacturing' },
        { name: 'Energy', url: '/industries/energy' }
      ]
    },
    { name: 'About Us', url: '/about-us' },
    { name: 'Locations', url: '/locations' },
    { name: 'Networks', url: '/networks' },
    { name: 'Resources', url: '/resources' },
    { name: 'Careers', url: '/careers' },
    { name: 'Contact', url: '/contact' }
  ]
};

export const defaultFooterData = {
  logoText: "SWENLOG",
  description: "Your trusted partner for comprehensive global logistics solutions. Connecting businesses worldwide with reliable, efficient shipping services.",
  socials: [
    { name: 'LinkedIn', url: 'https://in.linkedin.com/company/swenlog-supply-chain-solutions-pvt-ltd', icon: 'Linkedin' },
    { name: 'Instagram', url: 'https://www.instagram.com/swenlog_scs/', icon: 'Instagram' },
    { name: 'Ambition Box', url: 'https://www.ambitionbox.com/overview/swenlog-supply-chain-solutions-overview', icon: 'Globe' },
    { name: 'ZuabaCorp', url: 'https://www.zaubacorp.com/SWENLOG-SUPPLY-CHAIN-SOLUTIONS-PRIVATE-LIMITED-U63030TN2020PTC138697', icon: 'Building' }
  ],
  columns: [
    {
      title: 'Services',
      links: [
        { name: 'Ocean Freight', url: '/services/ocean-freight' },
        { name: 'Air Freight', url: '/services/air-freight' },
        { name: 'Ground Transportation', url: '/services/ground-transportation' },
        { name: 'Customs Brokerage', url: '/services/customs-brokerage' },
        { name: 'Warehousing', url: '/services/warehousing-distribution' },
        { name: 'Supply Chain Solutions', url: '/services/supply-chain-solutions' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '/about-us' },
        { name: 'Careers', url: '/careers' },
        { name: 'News & Updates', url: '/page/news-updates' },
        { name: 'Investor Relations', url: '/page/investor-relations' },
        { name: 'Sustainability', url: '/page/sustainability' },
        { name: 'Partner Network', url: '/page/partner-network' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Track Shipment', url: '/page/track-shipment' },
        { name: 'Customer Portal', url: '/page/customer-portal' },
        { name: 'Documentation', url: '/page/documentation' },
        { name: 'Industry Insights', url: '/page/industry-insights' },
        { name: 'Support Center', url: '/page/support-center' },
        { name: 'Contact Us', url: '/contact' }
      ]
    }
  ],
  bottomText: "© 2024 SWENLOG. All rights reserved.",
  bottomLinks: [
    { name: 'Privacy Policy', url: '/page/privacy-policy' },
    { name: 'Terms of Service', url: '/page/terms' },
    { name: 'Cookie Policy', url: '/page/cookie-policy' }
  ]
};

export const defaultServicesData = {
    title: "Comprehensive Logistics Services",
    subtitle: "From single shipments to complex supply chain management, SWENLOG provides tailored solutions that drive your business forward.",
    services: [
        { id: 's1', slug: 'ocean-freight', icon: 'Ship', title: 'Ocean Freight', description: 'Cost-effective shipping solutions for full container loads (FCL) and less-than-container loads (LCL) worldwide.', features: 'Port-to-port delivery\nDoor-to-door service\nCargo consolidation\nReal-time tracking' },
        { id: 's2', slug: 'air-freight', icon: 'Plane', title: 'Air Freight', description: 'Fast, reliable air cargo services for time-sensitive shipments with global network coverage.', features: 'Express delivery\nTemperature controlled\nDangerous goods handling\nCharter services' },
        { id: 's3', slug: 'ground-transportation', icon: 'Truck', title: 'Ground Transportation', description: 'Comprehensive trucking and rail services for domestic and cross-border transportation needs.', features: 'LTL & FTL services\nCross-docking\nLast-mile delivery\nSpecialized equipment' },
        { id: 's4', slug: 'customs-brokerage', icon: 'FileText', title: 'Customs Brokerage', description: 'Expert customs clearance and trade compliance services to navigate complex regulations.', features: 'Documentation prep\nDuty optimization\nTrade compliance\nRegulatory updates' },
        { id: 's5', slug: 'warehousing-distribution', icon: 'Warehouse', title: 'Warehousing & Distribution', description: 'Strategic distribution centers and fulfillment services to optimize your supply chain.', features: 'Inventory management\nPick & pack\nCross-docking\nValue-added services' },
        { id: 's6', slug: 'supply-chain-solutions', icon: 'BarChart3', title: 'Supply Chain Solutions', description: 'End-to-end supply chain optimization and consulting to improve efficiency and reduce costs.', features: 'Supply chain design\nVendor management\nAnalytics & reporting\nProcess optimization' }
    ]
};

export const defaultIndustriesData = {
  title: "Tailored Solutions for Your Industry",
  subtitle: "We have deep expertise in a wide range of industries, providing specialized logistics solutions to meet unique challenges.",
  industries: [
    { id: 'i1', slug: 'automotive', icon: 'Truck', title: 'Automotive', description: 'Just-in-time delivery and specialized handling for the automotive supply chain.', content: 'Our automotive logistics solutions are designed to meet the high-pressure demands of the automotive industry. We provide reliable and efficient transportation for parts and finished vehicles, ensuring your supply chain runs smoothly.'},
    { id: 'i2', slug: 'technology', icon: 'Zap', title: 'Technology', description: 'Secure and efficient transport for high-value electronics and components.', content: 'We offer secure, climate-controlled shipping and warehousing for sensitive and high-value technology products. Our robust security measures and real-time tracking give you peace of mind.'},
    { id: 'i3', slug: 'retail-fashion', icon: 'Archive', title: 'Retail & Fashion', description: 'Fast-paced logistics solutions to keep up with consumer demand and seasonal trends.', content: 'In the fast-moving world of retail and fashion, speed and accuracy are key. We provide agile logistics solutions, including e-commerce fulfillment and store distribution, to help you stay ahead of trends.'},
    { id: 'i4', slug: 'healthcare', icon: 'Heart', title: 'Healthcare', description: 'Temperature-controlled and compliant shipping for pharmaceuticals and medical devices.', content: 'Our healthcare logistics services are fully compliant with industry regulations. We offer temperature-controlled shipping, secure warehousing, and specialized handling for pharmaceuticals, medical devices, and other healthcare products.'},
    { id: 'i5', slug: 'manufacturing', icon: 'Wrench', title: 'Manufacturing', description: 'Streamlined logistics for raw materials and finished goods to keep production lines moving.', content: 'We support your manufacturing operations with end-to-end logistics for raw materials and finished products. Our solutions are designed to optimize your supply chain, reduce costs, and minimize downtime.'},
    { id: 'i6', slug: 'energy', icon: 'Power', title: 'Energy', description: 'Specialized logistics for the energy sector, including oversized and hazardous materials.', content: 'We have the expertise and equipment to handle the unique logistics challenges of the energy sector. We can transport oversized equipment, hazardous materials, and provide support for remote project sites.'},
  ]
};

export const defaultCrmContacts = [
  { id: 'c1', name: 'Alice Johnson', phone: '+12025550186', status: 'New', tags: ['Lead', 'USA'], lastContacted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'c2', name: 'Bob Williams', phone: '+442079460019', status: 'Contacted', tags: ['Customer', 'UK'], lastContacted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'c3', name: 'Carlos Rodriguez', phone: '+34911234567', status: 'Qualified', tags: ['Lead', 'Spain'], lastContacted: new Date().toISOString() },
];

export const defaultLeads = [
  { id: 'l1', name: 'Global Imports Inc.', source: 'Website Form', status: 'New', assignedTo: 'John Doe', email: 'contact@globalimports.com' },
  { id: 'l2', name: 'Tech Gadgets Co.', source: 'Referral', status: 'Working', assignedTo: 'Jane Smith', email: 'purchasing@techgadgets.com' },
];

export const defaultOpportunities = [
  { id: 'o1', name: 'Q4 Shipping Contract', stage: 'Proposal', value: 50000, closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), contactId: 'c1' },
  { id: 'o2', name: 'Urgent Air Freight', stage: 'Negotiation', value: 15000, closeDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), contactId: 'c2' },
];

export const defaultWhatsappData = {
  isConnected: false,
  templates: [
    { id: 't1', name: 'Welcome Message', content: 'Hello {{name}}! Welcome to SWENLOG. How can we help you today with your logistics needs?' },
    { id: 't2', name: 'Quote Follow-up', content: 'Hi {{name}}, just following up on your recent quote request for {{service}}. Do you have any questions we can help with?' },
    { id: 't3', name: 'Shipment Update', content: 'Hi {{name}}, your shipment with tracking number {{trackingNumber}} is now {{status}}. You can view details here: {{link}}' },
    { id: 't4', name: 'Service Inquiry Response', content: 'Hello {{name}}, thank you for your interest in our {{service_name}} services. A specialist will be in touch with you shortly to discuss your requirements.' }
  ],
  flows: [
      { id: 'f1', name: 'New Lead Welcome Flow', trigger: 'New Contact', steps: [
          { type: 'send_message' as const, templateId: 't1', delay: '1 minute' },
          { type: 'wait' as const, duration: '24 hours' },
          { type: 'send_message' as const, templateId: 't2', delay: '0 minutes' },
      ]}
  ]
};
