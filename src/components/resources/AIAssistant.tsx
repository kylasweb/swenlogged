
import { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';

interface TrainingData {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  createdAt: Date;
}

const AIAssistant = () => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);

  useEffect(() => {
    // Load training data from localStorage
    const savedData = localStorage.getItem('chatbot-training-data');
    if (savedData) {
      setTrainingData(JSON.parse(savedData));
    }
  }, []);

  const handleAiQuery = async () => {
    if (!aiQuestion.trim()) return;
    
    setAiLoading(true);
    setAiResponse('');
    
    try {
      // Wait for Puter.js to be fully loaded and initialized
      let attempts = 0;
      const maxAttempts = 100;
      
      while ((!window.puter || !window.puter.ai) && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (window.puter && window.puter.ai) {
        console.log('Puter.js loaded, making AI request...');
        
        // Create context from training data
        const trainingContext = trainingData.length > 0 
          ? trainingData.map(entry => 
              `Q: ${entry.question}\nA: ${entry.answer}\nCategory: ${entry.category}\nKeywords: ${entry.keywords.join(', ')}`
            ).join('\n\n')
          : '';

        const contextualPrompt = `You are SwenAI, a logistics and supply chain expert for SWENLOG Supply Chain Solutions. ${
          trainingContext ? `Use the following training data to provide accurate answers when relevant:\n\n${trainingContext}\n\n` : ''
        }Please provide helpful advice about: ${aiQuestion}`;

        const response = await window.puter.ai.chat(contextualPrompt, false, {
          model: 'gpt-4.1-nano' // Using the default model mentioned in docs
        });
        
        console.log('AI Response received:', response);
        
        // Extract text from content array if it exists
        let responseText = 'No response received';
        if (response?.message?.content) {
          if (Array.isArray(response.message.content)) {
            // Handle array of content objects with {type, text} structure
            responseText = response.message.content
              .filter(item => item.type === 'text')
              .map(item => item.text)
              .join('');
          } else if (typeof response.message.content === 'string') {
            responseText = response.message.content;
          }
        } else if (response?.toString?.()) {
          responseText = response.toString();
        }
        setAiResponse(responseText);
      } else {
        console.error('Puter.js failed to load after maximum attempts');
        setAiResponse('AI service could not be loaded. Please refresh the page and try again.');
      }
    } catch (error) {
      console.error('Puter AI Error:', error);
      setAiResponse('Sorry, there was an error connecting to the AI service. Please try again later.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center mb-4">
          <Bot className="h-8 w-8 mr-3" />
          <h3 className="text-2xl font-bold">SwenAI Logistics Assistant</h3>
        </div>
        <p className="mb-4 text-purple-100">
          Ask SwenAI any logistics-related question and get instant expert advice powered by advanced AI and our trained knowledge base.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="Ask about shipping rates, customs procedures, route optimization..."
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && !aiLoading && handleAiQuery()}
            disabled={aiLoading}
          />
          <button
            onClick={handleAiQuery}
            disabled={aiLoading || !aiQuestion.trim()}
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {aiLoading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>
        
        {aiResponse && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <h4 className="font-semibold text-purple-100 mb-2">SwenAI Response:</h4>
            <p className="text-sm text-purple-100 whitespace-pre-wrap">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
