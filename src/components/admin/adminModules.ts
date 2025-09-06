import { 
  LayoutDashboard, Building, Wrench, PanelTop, PanelBottom, Globe, FileText, 
  Image as ImageIcon, Quote, Users, MessageSquare, Shield, Gauge, Bot, Settings,
  UserPlus, Sliders, Database, FormInput, Paintbrush, Calendar, BarChart3, Activity, TrendingUp
} from "lucide-react";
import HeroManager from "./HeroManager";
import AboutManager from "./AboutManager";
import ServicesManager from "./ServicesManager";
import HeaderManager from "./HeaderManager";
import FooterManager from "./FooterManager";
import CtaManager from "./CtaManager";
import EnhancedPageManager from "./EnhancedPageManager";
import AdvancedMediaManager from "./AdvancedMediaManager";
import QuoteManager from "./QuoteManager";
import EnhancedChatbotManager from "./EnhancedChatbotManager";
import SliderManager from "./SliderManager";
import GeneralSettingsManager from "./GeneralSettingsManager";
import FormsManager from "./FormsManager";
import CompleteCrmManager from "./CompleteCrmManager";
import CompleteHrmManager from "./CompleteHrmManager";
import WhatsappManager from "./WhatsappManager";
import SecurityManager from "./SecurityManager";
import FeatureManager from "./FeatureManager";
import ResourcesManager from "./ResourcesManager";
import WhatsAppWebManager from "./WhatsAppWebManager";
import TeamChatManager from "./TeamChatManager";
import StaffDashboard from "./StaffDashboard";
import VisualEditor from "./VisualEditor";
import DepartmentManager from "./DepartmentManager";
import LeaveManager from "./LeaveManager";
import PerformanceManager from "./PerformanceManager";
import HRReportsManager from "./HRReportsManager";
import CRMActivitiesManager from "./CRMActivitiesManager";
import CRMReportsManager from "./CRMReportsManager";
import CareerManager from "./CareerManager";

export const adminModuleCategories = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      {
        key: 'visual-editor',
        label: 'Visual Page Editor',
        icon: Paintbrush,
        component: VisualEditor,
      },
    ]
  },
  {
    key: 'content',
    label: 'Content Management',
    icon: FileText,
    items: [
      {
        key: 'hero',
        label: 'Hero Section',
        icon: LayoutDashboard,
        component: HeroManager,
      },
      {
        key: 'about',
        label: 'About Section',
        icon: Building,
        component: AboutManager,
      },
      {
        key: 'services',
        label: 'Services Section',
        icon: Wrench,
        component: ServicesManager,
      },
      {
        key: 'pages',
        label: 'Enhanced Pages',
        icon: FileText,
        component: EnhancedPageManager,
      },
      {
        key: 'resources',
        label: 'Resources Manager',
        icon: Database,
        component: ResourcesManager,
      },
      {
        key: 'sliders',
        label: 'Slider Management',
        icon: Sliders,
        component: SliderManager,
      },
    ]
  },
  {
    key: 'appearance',
    label: 'Appearance',
    icon: Paintbrush,
    items: [
      {
        key: 'header',
        label: 'Header',
        icon: PanelTop,
        component: HeaderManager,
      },
      {
        key: 'footer',
        label: 'Footer',
        icon: PanelBottom,
        component: FooterManager,
      },
      {
        key: 'media',
        label: 'Advanced Media Library',
        icon: ImageIcon,
        component: AdvancedMediaManager,
      },
    ]
  },
  {
    key: 'crm',
    label: 'Customer Management',
    icon: Users,
    items: [
      {
        key: 'crm',
        label: 'Complete CRM',
        icon: Users,
        component: CompleteCrmManager,
      },
    ]
  },
  {
    key: 'hrm',
    label: 'Human Resources',
    icon: UserPlus,
    items: [
      {
        key: 'hrm',
        label: 'Complete HRM',
        icon: UserPlus,
        component: CompleteHrmManager,
      },
      {
        key: 'staff-dashboard',
        label: 'Staff Dashboard',
        icon: Gauge,
        component: StaffDashboard,
      },
      {
        key: 'careers',
        label: 'Career Management',
        icon: UserPlus,
        component: CareerManager,
      },
    ]
  },
  {
    key: 'communications',
    label: 'Communications',
    icon: MessageSquare,
    items: [
      {
        key: 'chatbot',
        label: 'Enhanced Chatbot',
        icon: Bot,
        component: EnhancedChatbotManager,
      },
      {
        key: 'whatsapp-web',
        label: 'WhatsApp Web',
        icon: MessageSquare,
        component: WhatsAppWebManager,
      },
      {
        key: 'team-chat',
        label: 'Team Chat',
        icon: Users,
        component: TeamChatManager,
      },
    ]
  },
  {
    key: 'tools',
    label: 'Tools & Forms',
    icon: Wrench,
    items: [
      {
        key: 'quote',
        label: 'Quote Configurator',
        icon: Quote,
        component: QuoteManager,
      },
      {
        key: 'forms',
        label: 'Forms Management',
        icon: FormInput,
        component: FormsManager,
      },
      {
        key: 'cta',
        label: 'Global CTA',
        icon: Globe,
        component: CtaManager,
      },
    ]
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    items: [
      {
        key: 'settings',
        label: 'General Settings',
        icon: Settings,
        component: GeneralSettingsManager,
      },
      {
        key: 'features',
        label: 'Feature Manager',
        icon: Settings,
        component: FeatureManager,
      },
      {
        key: 'security',
        label: 'Security',
        icon: Shield,
        component: SecurityManager,
      },
    ]
  },
];

// Flatten for backward compatibility
export const adminModules = adminModuleCategories.flatMap(category => category.items);

export const adminModulesByKey = adminModules.reduce((acc, mod) => {
  acc[mod.key] = mod;
  return acc;
}, {} as Record<string, (typeof adminModules)[number]>);