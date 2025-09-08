// Centralized predetermined AI fallback responses for tools.
// These are used when the Puter AI service is unavailable or parsing fails.

export const aiFallbacks = {
    // Supply Chain Risk Assessment fallback
    'supplier-risk:template': {
        riskScore: 58,
        riskLevel: 'medium',
        factors: [
            {
                id: 'capacity_buffer',
                category: 'Operational',
                factor: 'Capacity Constraints',
                description: 'Potential production slowdowns due to limited surge capacity',
                impact: 'high',
                probability: 'medium',
                mitigation: ['Dual sourcing', 'Add contractual capacity buffers']
            },
            {
                id: 'geo_tension',
                category: 'Geopolitical',
                factor: 'Regional Policy Changes',
                description: 'Regulatory shifts may affect export timelines',
                impact: 'medium',
                probability: 'medium',
                mitigation: ['Monitor trade advisories', 'Scenario planning']
            }
        ],
        recommendations: [
            'Establish secondary supplier for critical SKUs',
            'Implement quarterly compliance reviews',
            'Increase inbound visibility with milestone tracking'
        ]
    },

    // Compliance Checker generic fallback
    'compliance:template': {
        overallStatus: 'warning',
        customsCompliance: {
            status: 'pass',
            requirements: ['Commercial Invoice', 'Packing List', 'Certificate of Origin'],
            notes: 'Base customs documents appear sufficient'
        },
        regulatoryCompliance: {
            status: 'warning',
            requirements: ['Safety Certification Review'],
            notes: 'Additional product-specific certification recommended'
        },
        tradeRestrictions: {
            status: 'pass',
            restrictions: [],
            notes: 'No critical trade restrictions detected'
        },
        recommendations: [
            'Validate HS code classification',
            'Confirm labeling requirements for destination market',
            'Retain all origin documentation for audit'
        ]
    },

    // Port Performance fallback (generic port state)
    'port-perf:template': {
        congestionLevel: 'Moderate',
        avgWaitingHours: 18,
        throughputTEU: 325000,
        risks: ['Weather delays', 'Berth allocation variability'],
        recommendations: ['Advance berth scheduling', 'Diversify transshipment hubs'],
        summary: 'Port operating at moderate congestion with manageable dwell time.'
    },

    // Transit Time generic fallback
    'transit-time:last': {
        distanceKm: 4500,
        minHours: 72,
        maxHours: 120,
        reliability: 'medium',
        factors: ['Seasonal weather', 'Customs clearance variance'],
        notes: ['Buffer lead time by 10-15%', 'Use milestone visibility']
    },

    // Risk Assessment AI (general supply chain exposure)
    'risk-assessment:template': {
        overallRisk: 'medium',
        score: 62,
        drivers: ['Demand variability', 'Single-sourced component'],
        recommendations: ['Introduce alternate supplier', 'Improve forecast collaboration']
    },

    // Price Prediction Engine fallback
    'price-prediction:template': {
        lane: 'SHANGHAI -> LA',
        currency: 'USD',
        currentAvg: 1850,
        forecastLow: 1700,
        forecastHigh: 2150,
        confidence: 0.72,
        factors: ['Equipment balance improving', 'Fuel surcharge stabilization'],
        notes: ['Expect mild upward pressure in 3-5 weeks']
    }
} as const;

export type AIFallbackKey = keyof typeof aiFallbacks;

export function getAIFallback(cacheKey: string) {
    // Exact match first
    if (cacheKey in aiFallbacks) return (aiFallbacks as Record<string, unknown>)[cacheKey];

    // Pattern-based templates (strip dynamic segments)
    if (cacheKey.startsWith('supplier-risk:')) return aiFallbacks['supplier-risk:template'];
    if (cacheKey.startsWith('compliance:')) return aiFallbacks['compliance:template'];
    if (cacheKey.startsWith('port-perf:')) return aiFallbacks['port-perf:template'];
    if (cacheKey.startsWith('risk-assessment:')) return aiFallbacks['risk-assessment:template'];
    if (cacheKey.startsWith('price-prediction:')) return aiFallbacks['price-prediction:template'];
    // transit-time already has static key
    return null;
}
