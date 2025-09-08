export const FEATURE_KEYS = {
    AI_ASSISTANT: 'ai_assistant',
    FREIGHT_CALCULATOR: 'freight_calculator',
    ROUTE_OPTIMIZER: 'route_optimizer',
    DOCUMENT_SCANNER: 'document_scanner',
    MARINE_TRAFFIC: 'marine_traffic',
    CONTAINER_OPTIMIZER: 'container_optimizer',
    CMS_SYSTEM: 'cms_system',
    CRM_SYSTEM: 'crm_system',
    HRM_SYSTEM: 'hrm_system',
    WHATSAPP_INTEGRATION: 'whatsapp_integration',
    LIVE_CHAT: 'live_chat',
    QUOTE_MANAGEMENT: 'quote_management',
    MEDIA_LIBRARY: 'media_library',
    FORMS_BUILDER: 'forms_builder',
    MULTI_TENANT: 'multi_tenant',
    API_GATEWAY: 'api_gateway',
    ADVANCED_ANALYTICS: 'advanced_analytics',
    SECURITY_FRAMEWORK: 'security_framework',
    WORKFLOW_AUTOMATION: 'workflow_automation',
    NOTIFICATION_SYSTEM: 'notification_system',
    BACKUP_RECOVERY: 'backup_recovery',
    PERFORMANCE_MONITORING: 'performance_monitoring'
} as const;

export type FeatureKey = typeof FEATURE_KEYS[keyof typeof FEATURE_KEYS];
