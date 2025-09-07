// Centralized prompt helpers for AI-powered tools.
export function routeOptimizationPrompt(params: {
    optimizationGoal: string;
    routeType: string;
    routeSubType: string;
    vehicleType: string;
    routes: Array<{ id: number; name: string; priority: string }>;
}) {
    const { optimizationGoal, routeType, routeSubType, vehicleType, routes } = params;
    return `You are an expert logistics route optimization engine.
Return ONLY JSON matching this schema:
{
  "totalDistance": "<number km>",
  "estimatedTime": "<number hours>",
  "fuelCost": "<$number>",
  "fuelConsumption": "<number L>",
  "carbonFootprint": "<number tons CO2>",
  "costSavings": "<$number>",
  "timeSavings": "<number minutes>",
  "routeEfficiency": "<number %>",
  "optimizedOrder": [
    {"id": number, "name": string, "priority": string, "order": number, "estimatedArrival": string, "arrivalTime": string, "distanceFromPrevious": string, "drivingTime": string }
  ],
  "alternatives": [ {"name": string, "distance": string, "time": string, "cost": string } ]
}
Rules:
- Respond with valid JSON only (no markdown fencing, no commentary).
- Provide realistic but approximate metrics.
Context:
Optimization goal: ${optimizationGoal}
Route type: ${routeType}/${routeSubType}
Vehicle type: ${vehicleType}
Stops (in input order):
${routes.map(r => `- id:${r.id} name:${r.name || 'N/A'} priority:${r.priority}`).join('\n')}`;
}

export function freightQuotePrompt(params: {
    origin: string; destination: string; weightKg: number; dims: { length: number; width: number; height: number }; mode: string; packageType?: string;
}) {
    const { origin, destination, weightKg, dims, mode, packageType } = params;
    return `You are a freight rating engine.
Return ONLY JSON with this shape:
{
  "cost": "<number USD>",
  "transitTime": "<string human range>",
  "distance": <number km>,
  "surcharges": [{"name": string, "amount": "<number USD>"}],
  "carbonEmissionsKg": <number>,
  "modeRationale": string,
  "recommendations": string[]
}
Rules: JSON only, no markdown fences.
Assume realistic lane distance between origin '${origin}' and destination '${destination}'. If unknown, estimate.
Context: mode=${mode}, packageType=${packageType || 'standard'}, weightKg=${weightKg}, dimensionsCm=${dims.length}x${dims.width}x${dims.height}.
Consider volumetric weight for air.
Provide 2-5 concise recommendations.`;
}

export function documentExtractionPrompt(rawText: string) {
    return `You are an OCR post-processing and trade compliance extraction engine.
Extract key fields from the following document text. Respond with ONLY JSON:
{
  "documentType": string,
  "invoiceNumber": string|null,
  "bolNumber": string|null,
  "shipper": string|null,
  "consignee": string|null,
  "totalValue": string|null,
  "currency": string|null,
  "incoterms": string|null,
  "paymentTerms": string|null,
  "hsCodes": string[],
  "confidence": <number 0-100>,
  "warnings": string[]
}
Text:\n---\n${rawText}\n---\nRules: JSON only, no commentary.`;
}

export function containerLoadPrompt(params: { containerType: string; packages: Array<{ name: string; length: number; width: number; height: number; weight: number; quantity: number; stackable: boolean }> }) {
    const { containerType, packages } = params;
    return `You are a container load planning optimizer.
Return ONLY JSON:
{
  "utilization": "<number %>",
  "savingsUSD": <number>,
  "arrangement": [ { "item": string, "quantity": number, "dimensions": string, "layer": number, "stackable": boolean } ],
  "recommendations": string[]
}
Container: ${containerType}
Packages:\n${packages.map(p => `- ${p.name} ${p.length}x${p.width}x${p.height}cm qty:${p.quantity} stackable:${p.stackable}`).join('\n')}
Rules: JSON only.`;
}

export function marineTrafficAnalysisPrompt(vessels: Array<{ name: string; type: string; destination: string; eta: string; status: string }>) {
    return `You are a maritime operations analyst.
Given these vessel snapshots produce ONLY JSON:
{
  "summary": string,
  "etaRisks": [{"name": string, "risk": string}],
  "portCongestion": string,
  "recommendations": string[]
}
Vessels:\n${vessels.map(v => `- ${v.name} type:${v.type} dest:${v.destination} eta:${v.eta} status:${v.status}`).join('\n')}
Rules: concise, JSON only.`;
}

export function demandForecastPrompt(params: { sku: string; region: string; historicalAvg: number; season: string; trendNote?: string }) {
    const { sku, region, historicalAvg, season, trendNote } = params;
    return `You are a supply chain demand forecasting engine.
Return ONLY JSON:
{
  "forecastUnitsNext12Weeks": [ {"week": number, "units": number } ],
  "peakWeeks": number[],
  "confidence": <number 0-100>,
  "drivers": string[],
  "riskFlags": string[],
  "summary": string
}
Context: sku=${sku}, region=${region}, historicalWeeklyAvg=${historicalAvg}, season=${season}, extraContext=${trendNote || 'none'}.
Model assumptions: basic seasonal decomposition + trend.
Rules: JSON only.`;
}

export function logisticsRiskAssessmentPrompt(params: { lane: string; mode: string; commodity: string; incoterm?: string }) {
    const { lane, mode, commodity, incoterm } = params;
    return `You are a logistics risk assessment engine.
Return ONLY JSON:
{
  "overallRisk": "Low|Medium|High",
  "score": <number 0-100>,
  "factors": [ {"name": string, "impact": "Low|Medium|High", "rationale": string } ],
  "mitigations": string[],
  "watchItems": string[]
}
Lane: ${lane}
Mode: ${mode}
Commodity: ${commodity}
Incoterm: ${incoterm || 'N/A'}
Consider geopolitical, congestion, weather seasonality, commodity sensitivity.
Rules: JSON only.`;
}

export function customsDutyPrompt(params: { origin: string; destination: string; hsCode: string; valueUSD: number; incoterm?: string }) {
    const { origin, destination, hsCode, valueUSD, incoterm } = params;
    return `You are a customs duty estimation engine.
Return ONLY JSON:
{
  "hsCodeValidated": string,
  "baseDutyRatePercent": number,
  "estimatedDutyUSD": number,
  "vatOrGSTPercent": number,
  "estimatedVATUSD": number,
  "otherChargesUSD": number,
  "totalLandedCostUSD": number,
  "notes": string[]
}
Origin: ${origin}
Destination: ${destination}
HS Code: ${hsCode}
Declared Value USD: ${valueUSD}
Incoterm: ${incoterm || 'N/A'}
Assume simplified average national rates if multiple. Provide transparent calc. JSON only.`;
}

// Transit time estimation prompt
export function transitTimePrompt(params: { origin: string; destination: string; mode: string; cargoType?: string }) {
    const { origin, destination, mode, cargoType } = params;
    return `You are a transit time estimation engine.
Return ONLY JSON:
{
  "distanceKm": number,
  "minHours": number,
  "maxHours": number,
  "reliability": "High|Medium|Low",
  "factors": string[],
  "notes": string[]
}
Origin: ${origin}
Destination: ${destination}
Mode: ${mode}
CargoType: ${cargoType || 'general'}
Consider customs, congestion, seasonality, typical lane performance. JSON only.`;
}

// Price prediction prompt (for future tool integration)
export function pricePredictionPrompt(params: { commodity: string; lane: string; mode: string; periodWeeks?: number }) {
    const { commodity, lane, mode, periodWeeks = 12 } = params;
    return `You are a freight rate price prediction engine.
Return ONLY JSON:
{
  "weeklyForecast": [ {"week": number, "rateUSD": number } ],
  "trend": "Up|Down|Stable",
  "volatilityPercent": number,
  "drivers": string[],
  "summary": string
}
Lane: ${lane}
Mode: ${mode}
Commodity: ${commodity}
HorizonWeeks: ${periodWeeks}
Rules: JSON only.`;
}

// Packaging advisor prompt
export function packagingAdvisorPrompt(params: { product: string; weightKg: number; fragile?: boolean; hazardous?: boolean }) {
    const { product, weightKg, fragile, hazardous } = params;
    return `You are a logistics packaging optimization advisor.
Return ONLY JSON:
{
  "recommendedMaterials": string[],
  "packageType": string,
  "estimatedCostUSD": number,
  "sustainabilityScore": number,
  "riskMitigations": string[],
  "notes": string[]
}
Product: ${product}
WeightKg: ${weightKg}
Fragile: ${fragile ? 'yes' : 'no'}
Hazardous: ${hazardous ? 'yes' : 'no'}
Provide concise actionable recommendations. JSON only.`;
}

// Insurance coverage recommendation prompt
export function insuranceCoveragePrompt(params: { cargoValueUSD: number; commodity: string; route: string; riskLevel?: string }) {
    const { cargoValueUSD, commodity, route, riskLevel } = params;
    return `You are a cargo insurance recommendation engine.
Return ONLY JSON:
{
  "basePremiumUSD": number,
  "recommendedCoveragePercent": number,
  "deductibleUSD": number,
  "coverageOptions": [ { "name": string, "addedPremiumUSD": number, "benefit": string } ],
  "riskFactors": string[],
  "notes": string[]
}
CargoValueUSD: ${cargoValueUSD}
Commodity: ${commodity}
Route: ${route}
RiskLevelHint: ${riskLevel || 'Unknown'}
Rules: concise, JSON only.`;
}

// Port performance / congestion analysis prompt
export function portPerformancePrompt(params: { portName: string; region?: string }) {
    const { portName, region } = params;
    return `You are a port performance and congestion analysis engine.
Return ONLY JSON:
{
  "congestionLevel": "Low|Moderate|High|Severe",
  "avgWaitingHours": number,
  "throughputTEU": number,
  "risks": string[],
  "recommendations": string[],
  "summary": string
}
Port: ${portName}
Region: ${region || 'Unknown'}
Consider typical global trade patterns, seasonality. JSON only.`;
}

// Supply chain supplier risk assessment prompt
export function supplierRiskAssessmentPrompt(params: { supplier: string; location: string; industry: string; selectedRisks: string[]; customRisks?: string[] }) {
    const { supplier, location, industry, selectedRisks, customRisks = [] } = params;
    return `You are a supply chain supplier risk assessment engine.
Return ONLY JSON:
{
  "riskScore": number,  // 0-100 overall numeric risk
  "riskLevel": "low|medium|high|critical",
  "factors": [ { "id": string, "category": string, "factor": string, "description": string, "impact": "low|medium|high|critical", "probability": "low|medium|high", "mitigation": string[] } ],
  "recommendations": string[],
  "summary": string
}
Supplier: ${supplier}
Location: ${location}
Industry: ${industry}
PreSelectedRiskFactorIds: ${selectedRisks.join(', ') || 'none'}
CustomRisks: ${customRisks.join('; ') || 'none'}
Consider geopolitical, operational, financial, logistical, compliance dimensions.
If input risk ids suggest severity, reflect them but you may add or remove factors for realism.
Ensure JSON only with required fields.`;
}

// Compliance gap analysis prompt
export function complianceGapAnalysisPrompt(params: { origin: string; destination: string; productCategory: string; valueUSD: number; description?: string; specialRequirements?: string }) {
    const { origin, destination, productCategory, valueUSD, description, specialRequirements } = params;
    return `You are an international trade compliance analyst.
Return ONLY JSON:
{
  "overallStatus": "pass|warning|fail",
  "customsCompliance": { "status": "pass|warning|fail", "requirements": string[], "notes": string },
  "regulatoryCompliance": { "status": "pass|warning|fail", "requirements": string[], "notes": string },
  "tradeRestrictions": { "status": "pass|warning|fail", "restrictions": string[], "notes": string },
  "missingDocuments": string[],
  "riskNotes": string[],
  "recommendations": string[]
}
OriginCountry: ${origin}
DestinationCountry: ${destination}
ProductCategory: ${productCategory}
DeclaredValueUSD: ${valueUSD}
Description: ${description || 'N/A'}
SpecialRequirements: ${specialRequirements || 'None'}
Consider documentation, certifications, potential licensing, labeling, sanctions and dual-use risks.
Respond with valid JSON only.`;
}
