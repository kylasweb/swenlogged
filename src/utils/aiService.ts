

// Unified AI Service using Puter.js
interface TrainingData {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  createdAt: Date;
}

interface AIResponse {
  text: string;
  error?: string;
}

class UnifiedAIService {
  private static instance: UnifiedAIService;
  private trainingData: TrainingData[] = [];
  private isReady = false;
  private fallbackResponses: { [key: string]: string } = {
    'shipping': 'Shipping involves transporting goods from one location to another. We offer ocean freight, air freight, and ground transportation services. Each method has different advantages in terms of cost, speed, and capacity.',
    'freight': 'Freight refers to goods transported in bulk. We provide comprehensive freight solutions including FCL (Full Container Load), LCL (Less than Container Load), and specialized cargo handling.',
    'logistics': 'Logistics encompasses the planning, implementation, and control of the movement and storage of goods. Our services include supply chain management, warehousing, and distribution.',
    'customs': 'Customs clearance is the process of getting goods through border controls. We handle all documentation, duties, and compliance requirements for international shipments.',
    'tracking': 'You can track your shipment using our online tracking system. Simply enter your shipment number or booking reference to get real-time updates on your cargo\'s location and status.',
    'insurance': 'Cargo insurance protects your goods during transit. We offer comprehensive coverage options and can help you choose the right policy for your specific needs.',
    'quote': 'To get a shipping quote, please provide details about your cargo including weight, dimensions, origin, destination, and preferred shipping method. We\'ll provide competitive rates.',
    'documentation': 'Proper documentation is crucial for international shipping. Required documents typically include commercial invoices, packing lists, certificates of origin, and customs declarations.',
    'incoterms': 'Incoterms define the responsibilities of sellers and buyers in international trade. Common terms include FOB, CIF, DDP, and EXW. We can help you choose the right Incoterm for your transaction.',
    'default': 'Thank you for your question about logistics and supply chain services. SWENLOG specializes in providing comprehensive shipping solutions worldwide. Could you please provide more specific details about your inquiry so I can assist you better?'
  };

  private constructor() {
    this.loadTrainingData();
    this.initializePuter();
  }

  static getInstance(): UnifiedAIService {
    if (!UnifiedAIService.instance) {
      UnifiedAIService.instance = new UnifiedAIService();
    }
    return UnifiedAIService.instance;
  }

  private loadTrainingData() {
    try {
      const savedData = localStorage.getItem('chatbot-training-data');
      if (savedData) {
        this.trainingData = JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading training data:', error);
    }
  }

  private async initializePuter() {
    let attempts = 0;
    const maxAttempts = 50; // Reduced from 100 for faster initialization

    while ((!window.puter || !window.puter.ai) && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    this.isReady = !!(window.puter && window.puter.ai);
    if (!this.isReady) {
      console.warn('Puter.js AI service not available after initialization attempts');
    } else {
      console.log('Puter.js AI service initialized successfully');
    }
  }

  async waitForReady(): Promise<boolean> {
    if (this.isReady) return true;

    let attempts = 0;
    const maxAttempts = 50;

    while (!this.isReady && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;

      if (window.puter && window.puter.ai) {
        this.isReady = true;
        return true;
      }
    }

    return false;
  }

  private createContextualPrompt(userPrompt: string, context?: string, systemPrompt?: string): string {
    // Create context from training data
    const trainingContext = this.trainingData.length > 0
      ? this.trainingData.map(entry =>
        `Q: ${entry.question}\nA: ${entry.answer}\nCategory: ${entry.category}\nKeywords: ${entry.keywords.join(', ')}`
      ).join('\n\n')
      : '';

    const baseSystemPrompt = systemPrompt || 'You are SwenAI, a logistics and supply chain expert for SWENLOG Supply Chain Solutions. You provide professional, helpful advice about logistics, shipping, supply chain management, and related business operations.';

    let finalPrompt = baseSystemPrompt;

    if (context) {
      finalPrompt += ` You are currently helping with ${context} management.`;
    }

    if (trainingContext) {
      finalPrompt += `\n\nUse the following knowledge base to provide accurate answers when relevant:\n\n${trainingContext}`;
    }

    finalPrompt += `\n\nUser Question: ${userPrompt}\n\nPlease provide a helpful, professional response:`;

    return finalPrompt;
  }

  async query(
    prompt: string,
    options: {
      context?: string;
      systemPrompt?: string;
      model?: string;
      testMode?: boolean;
    } = {}
  ): Promise<AIResponse> {
    try {
      const isReady = await this.waitForReady();
      if (!isReady) {
        return {
          text: 'AI service is not available. Please refresh the page and try again.',
          error: 'Service not ready'
        };
      }

      const contextualPrompt = this.createContextualPrompt(
        prompt,
        options.context,
        options.systemPrompt
      );

      console.log('AI Query:', { prompt, options, contextualPrompt });

      // Call Puter AI service using the correct API format
      // Puter.js API: puter.ai.chat(message, options)
      const puterOptions = {
        testMode: options.testMode || true, // Always use test mode as requested
        model: options.model || 'gpt-4o-mini',
        stream: false
      };

      const response = await window.puter.ai.chat(contextualPrompt, puterOptions);

      console.log('AI Response:', response);

      // Extract text from response - handle different response formats
      let responseText = this.getFallbackResponse(prompt);

      if (response) {
        // Try different response formats
        if (response.message?.content) {
          if (Array.isArray(response.message.content)) {
            responseText = response.message.content
              .filter(item => item.type === 'text')
              .map(item => item.text)
              .join('');
          } else if (typeof response.message.content === 'string') {
            responseText = response.message.content;
          }
        } else if (response.choices && response.choices[0]?.message?.content) {
          responseText = response.choices[0].message.content;
        } else if (response.content) {
          responseText = response.content;
        } else if (typeof response === 'string') {
          responseText = response;
        } else if (response.text) {
          responseText = response.text;
        } else if (response.toString && typeof response.toString === 'function') {
          const stringified = response.toString();
          if (stringified && stringified !== '[object Object]') {
            responseText = stringified;
          }
        }
      }

      // Check if response is lorem ipsum or generic - if so, use fallback
      if (this.isGenericResponse(responseText)) {
        responseText = this.getFallbackResponse(prompt);
      }

      return { text: responseText };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        text: 'Sorry, there was an error processing your request. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();

    // Check for keywords in the prompt
    for (const [keyword, response] of Object.entries(this.fallbackResponses)) {
      if (keyword !== 'default' && lowerPrompt.includes(keyword)) {
        return response;
      }
    }

    return this.fallbackResponses.default;
  }

  refreshTrainingData(): void {
    this.loadTrainingData();
  }

  getTrainingDataCount(): number {
    return this.trainingData.length;
  }

  private isGenericResponse(response: string): boolean {
    if (!response) return true;

    const lowerResponse = response.toLowerCase();

    // Check for lorem ipsum indicators
    const loremIndicators = [
      'lorem ipsum',
      'dolor sit amet',
      'consectetur adipiscing',
      'sed do eiusmod',
      'tempor incididunt',
      'labore et dolore',
      'magna aliqua'
    ];

    if (loremIndicators.some(indicator => lowerResponse.includes(indicator))) {
      return true;
    }

    // Check for generic responses
    const genericIndicators = [
      'i\'m sorry',
      'i apologize',
      'i cannot',
      'i don\'t know',
      'i\'m not sure',
      'please try again',
      'error occurred'
    ];

    if (genericIndicators.some(indicator => lowerResponse.includes(indicator))) {
      return true;
    }

    // Check if response is too short or repetitive
    if (response.length < 50) {
      return true;
    }

    return false;
  }
}

export const aiService = UnifiedAIService.getInstance();
export type { AIResponse, TrainingData };

