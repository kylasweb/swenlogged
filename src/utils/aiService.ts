

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
    const maxAttempts = 100;
    
    while ((!window.puter || !window.puter.ai) && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    this.isReady = !!(window.puter && window.puter.ai);
    if (!this.isReady) {
      console.warn('Puter.js AI service not available after initialization attempts');
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
      // According to Puter docs: puter.ai.chat(message, testMode, options)
      const response = await window.puter.ai.chat(
        contextualPrompt,
        options.testMode || false
      );

      console.log('AI Response:', response);

      // Extract text from response - handle different response formats
      let responseText = 'I apologize, but I couldn\'t process your request right now. Please try again.';
      
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

      return { text: responseText };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        text: 'Sorry, there was an error processing your request. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  refreshTrainingData() {
    this.loadTrainingData();
  }

  getTrainingDataCount(): number {
    return this.trainingData.length;
  }
}

export const aiService = UnifiedAIService.getInstance();
export type { AIResponse, TrainingData };

