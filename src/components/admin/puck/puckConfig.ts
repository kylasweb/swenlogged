import { Config } from '@measured/puck';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { StatsSection } from './components/StatsSection';

export const puckConfig: Config = {
  components: {
    HeroSection: {
      fields: {
        title: { type: 'text' },
        subtitle: { type: 'text' },
        description: { type: 'textarea' },
        backgroundImage: { type: 'text' },
        ctaText: { type: 'text' },
        ctaLink: { type: 'text' },
        showStats: { type: 'radio', options: [
          { label: 'Show', value: true },
          { label: 'Hide', value: false }
        ] }
      },
      defaultProps: {
        title: 'Global Logistics Solutions',
        subtitle: 'Delivered Worldwide',
        description: 'Streamline your supply chain with our comprehensive logistics services. From ocean freight to last-mile delivery, we ensure your cargo reaches its destination safely and on time.',
        backgroundImage: '/placeholder.svg?height=600&width=1200',
        ctaText: 'Get Started Today',
        ctaLink: '/contact',
        showStats: true
      },
      render: HeroSection,
    },
    AboutSection: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        image: { type: 'text' },
        stats: { 
          type: 'array',
          arrayFields: {
            label: { type: 'text' },
            value: { type: 'text' }
          }
        }
      },
      defaultProps: {
        title: 'About Our Company',
        description: 'With over a decade of experience in global logistics, we provide comprehensive shipping and supply chain solutions that connect businesses worldwide.',
        image: '/placeholder.svg?height=400&width=600',
        stats: [
          { label: 'Years Experience', value: '10+' },
          { label: 'Countries Served', value: '150+' },
          { label: 'Happy Customers', value: '5000+' }
        ]
      },
      render: AboutSection,
    },
    ServicesSection: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        services: {
          type: 'array',
          arrayFields: {
            title: { type: 'text' },
            description: { type: 'textarea' },
            icon: { type: 'text' },
            link: { type: 'text' }
          }
        }
      },
      defaultProps: {
        title: 'Our Services',
        description: 'Comprehensive logistics solutions tailored to your business needs',
        services: [
          {
            title: 'Ocean Freight',
            description: 'Cost-effective shipping solutions for large cargo volumes',
            icon: 'Ship',
            link: '/services/ocean-freight'
          },
          {
            title: 'Air Freight',
            description: 'Fast and reliable air cargo services worldwide',
            icon: 'Plane',
            link: '/services/air-freight'
          },
          {
            title: 'Ground Transportation',
            description: 'Efficient land transportation and last-mile delivery',
            icon: 'Truck',
            link: '/services/ground-transportation'
          }
        ]
      },
      render: ServicesSection,
    },
    ContactSection: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        showContactForm: { type: 'radio', options: [
          { label: 'Show', value: true },
          { label: 'Hide', value: false }
        ] },
        contactInfo: {
          type: 'object',
          objectFields: {
            phone: { type: 'text' },
            email: { type: 'text' },
            address: { type: 'textarea' }
          }
        }
      },
      defaultProps: {
        title: 'Get In Touch',
        description: 'Ready to streamline your logistics? Contact us today for a customized solution.',
        showContactForm: true,
        contactInfo: {
          phone: '+1 (555) 123-4567',
          email: 'info@logistics.com',
          address: '123 Logistics St, Shipping City, SC 12345'
        }
      },
      render: ContactSection,
    },
    StatsSection: {
      fields: {
        title: { type: 'text' },
        stats: {
          type: 'array',
          arrayFields: {
            label: { type: 'text' },
            value: { type: 'text' },
            icon: { type: 'text' }
          }
        }
      },
      defaultProps: {
        title: 'Our Impact',
        stats: [
          { label: 'Countries Served', value: '150+', icon: 'Globe' },
          { label: 'Customer Support', value: '24/7', icon: 'Clock' },
          { label: 'On-Time Delivery', value: '99.9%', icon: 'Shield' },
          { label: 'Industry Experience', value: '10+ Years', icon: 'Award' }
        ]
      },
      render: StatsSection,
    }
  },
  categories: {
    layout: {
      components: ['HeroSection', 'AboutSection', 'ServicesSection']
    },
    content: {
      components: ['StatsSection', 'ContactSection']
    }
  }
};