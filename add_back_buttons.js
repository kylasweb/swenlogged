#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of resource page files that need BackButton added
const resourcePages = [
  'src/pages/DemandForecastingAssistantPage.tsx',
  'src/pages/RiskAssessmentAIPage.tsx',
  'src/pages/CustomsDutyCalculatorPage.tsx',
  'src/pages/PackagingAdvisorPage.tsx',
  'src/pages/InsuranceCalculatorPage.tsx',
  'src/pages/PortLocatorMapPage.tsx',
  'src/pages/SupplyChainRiskAssessmentPage.tsx',
  'src/pages/GlobalTradeReportPage.tsx',
  'src/pages/SustainabilityTrackerPage.tsx',
  'src/pages/PortPerformanceDashboardPage.tsx',
  'src/pages/TradeLaneAnalyticsPage.tsx',
  'src/pages/ComplianceCheckerPage.tsx',
  'src/pages/MobileTrackingAppPage.tsx',
  'src/pages/ApiDocumentationPage.tsx',
  'src/pages/ErpIntegrationGuidesPage.tsx',
  'src/pages/WebhookBuilderPage.tsx',
  'src/pages/ShipperCommunityForumPage.tsx',
  'src/pages/ExpertWebinarSeriesPage.tsx',
  'src/pages/CaseStudyLibraryPage.tsx',
  'src/pages/VideoTutorialLibraryPage.tsx'
];

function addBackButtonToFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if BackButton is already imported
    if (content.includes("import BackButton")) {
      console.log(`Skipping ${filePath} - BackButton already imported`);
      return;
    }

    // Add BackButton import
    const importMatch = content.match(/import React from 'react';\n/);
    if (!importMatch) {
      console.log(`Skipping ${filePath} - Could not find React import`);
      return;
    }

    let updatedContent = content.replace(
      /import React from 'react';\n/,
      `import React from 'react';\nimport BackButton from '@/components/ui/BackButton';\n`
    );

    // Find hero section and add BackButton
    const heroSectionMatch = updatedContent.match(/(\/\/ Hero Section[\s\S]*?<div className="text-center">)/);
    if (heroSectionMatch) {
      updatedContent = updatedContent.replace(
        heroSectionMatch[1],
        `${heroSectionMatch[1]}
            <div className="mb-6">
              <BackButton to="/resources" label="Back to Resources" />
            </div>`
      );
    } else {
      // Try alternative pattern for hero sections
      const altHeroMatch = updatedContent.match(/(<section className="[^"]*hero[^"]*[\s\S]*?<div className="max-w-[^"]* mx-auto px-6">[\s\S]*?<div className="text-center)/);
      if (altHeroMatch) {
        updatedContent = updatedContent.replace(
          altHeroMatch[1],
          `${altHeroMatch[1]}
            <div className="mb-6">
              <BackButton to="/resources" label="Back to Resources" />
            </div>`
        );
      }
    }

    // Write the updated content back
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${filePath}`);

  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Process all resource pages
resourcePages.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    addBackButtonToFile(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('BackButton addition script completed!');
