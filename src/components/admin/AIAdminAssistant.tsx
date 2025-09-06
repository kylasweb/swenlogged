
import { useState, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { aiService } from '@/utils/aiService';

interface AIAdminAssistantProps {
  context: string;
}

interface TrainingData {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  createdAt: Date;
}

const AIAdminAssistant = ({ context }: AIAdminAssistantProps) => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Refresh training data in AI service
    aiService.refreshTrainingData();

    // Load context-specific suggestions
    switch (context) {
      case 'hero':
        setSuggestions([
          'Suggest compelling headlines for logistics company',
          'What are trending call-to-action phrases?',
          'How to improve hero section conversion rates?'
        ]);
        break;
      case 'services':
        setSuggestions([
          'What are the most important logistics services to highlight?',
          'How to describe complex shipping processes simply?',
          'Best practices for service page optimization'
        ]);
        break;
      case 'quote':
        setSuggestions([
          'How to improve quote conversion rates?',
          'What information is essential for shipping quotes?',
          'Best practices for lead qualification'
        ]);
        break;
      case 'chatbot':
        setSuggestions([
          'How to improve chatbot training data?',
          'What are common logistics questions customers ask?',
          'Best practices for AI assistant responses'
        ]);
        break;
      default:
        setSuggestions([
          'How to improve website performance?',
          'What are logistics industry trends?',
          'Best practices for customer engagement'
        ]);
    }
  }, [context]);

  const handleAiQuery = async (question?: string) => {
    const queryText = question || aiQuestion;
    if (!queryText.trim()) return;
    
    setAiLoading(true);
    setAiResponse('');
    
    try {
      const response = await aiService.query(queryText, {
        context,
        systemPrompt: 'You are an AI assistant for a logistics company admin dashboard.',
        testMode: true
      });

      setAiResponse(response.text);
    } catch (error) {
      console.error('Admin AI Error:', error);
      setAiResponse('Sorry, there was an error with the AI service. Please try again.');
    } finally {
      setAiLoading(false);
      if (!question) setAiQuestion('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mt-6">
      <div className="flex items-center mb-4">
        <Bot className="h-6 w-6 text-indigo-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">AI Admin Assistant</h3>
        <Sparkles className="h-4 w-4 text-purple-500 ml-2" />
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Get AI-powered insights and suggestions for your {context} management. 
        {aiService.getTrainingDataCount() > 0 && (
          <span className="text-green-600"> Using {aiService.getTrainingDataCount()} trained responses.</span>
        )}
      </p>

      {/* Quick Suggestions */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleAiQuery(suggestion)}
              disabled={aiLoading}
              className="text-xs px-3 py-1 bg-white border border-indigo-200 text-indigo-700 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Query Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Ask anything about your admin tasks..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && !aiLoading && handleAiQuery()}
          disabled={aiLoading}
        />
        <button
          onClick={() => handleAiQuery()}
          disabled={aiLoading || !aiQuestion.trim()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {aiLoading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">AI Suggestion:</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AIAdminAssistant;
