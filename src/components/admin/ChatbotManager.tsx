
import { useState, useEffect } from 'react';
import { Bot, Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface TrainingData {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  createdAt: Date;
}

interface TestResult {
  question: string;
  response: string;
  timestamp: Date;
}

const ChatbotManager = () => {
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [testQuestion, setTestQuestion] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTestingAI, setIsTestingAI] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    question: '',
    answer: '',
    category: 'general',
    keywords: ''
  });

  useEffect(() => {
    // Load training data from localStorage
    const savedData = localStorage.getItem('chatbot-training-data');
    if (savedData) {
      setTrainingData(JSON.parse(savedData));
    }

    // Load Puter.js script
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.head.querySelector('script[src="https://js.puter.com/v2/"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const saveTrainingData = (data: TrainingData[]) => {
    localStorage.setItem('chatbot-training-data', JSON.stringify(data));
    setTrainingData(data);
  };

  const addTrainingEntry = () => {
    const entry: TrainingData = {
      id: Date.now().toString(),
      question: newEntry.question,
      answer: newEntry.answer,
      category: newEntry.category,
      keywords: newEntry.keywords.split(',').map(k => k.trim()).filter(k => k),
      createdAt: new Date()
    };
    
    const updatedData = [...trainingData, entry];
    saveTrainingData(updatedData);
    
    setNewEntry({ question: '', answer: '', category: 'general', keywords: '' });
    setIsAddingNew(false);
  };

  const updateTrainingEntry = (id: string, updates: Partial<TrainingData>) => {
    const updatedData = trainingData.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    );
    saveTrainingData(updatedData);
    setEditingId(null);
  };

  const deleteTrainingEntry = (id: string) => {
    const updatedData = trainingData.filter(entry => entry.id !== id);
    saveTrainingData(updatedData);
  };

  const testAI = async () => {
    if (!testQuestion.trim()) return;
    
    setIsTestingAI(true);
    
    try {
      // Wait for Puter.js to be available
      let attempts = 0;
      const maxAttempts = 50;
      
      while ((!window.puter || !window.puter.ai) && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (window.puter && window.puter.ai) {
        // Create context from training data
        const trainingContext = trainingData.map(entry => 
          `Q: ${entry.question}\nA: ${entry.answer}\nCategory: ${entry.category}\nKeywords: ${entry.keywords.join(', ')}`
        ).join('\n\n');

        const prompt = `You are Swen, a logistics assistant for SWENLOG Supply Chain Solutions. 
        Use the following training data to answer questions accurately:
        
        ${trainingContext}
        
        Based on this training data, please answer the following question:
        ${testQuestion}`;

        const response = await window.puter.ai.chat(prompt, true); // testMode = true
        
        const result: TestResult = {
          question: testQuestion,
          response: response?.message?.content || response?.toString() || 'No response received',
          timestamp: new Date()
        };

        setTestResults(prev => [result, ...prev]);
        setTestQuestion('');
      } else {
        throw new Error('Puter.js not available');
      }
    } catch (error) {
      console.error('AI test error:', error);
      const errorResult: TestResult = {
        question: testQuestion,
        response: 'Error: Unable to get AI response',
        timestamp: new Date()
      };
      setTestResults(prev => [errorResult, ...prev]);
    } finally {
      setIsTestingAI(false);
    }
  };

  const categories = ['general', 'shipping', 'logistics', 'pricing', 'support', 'customs', 'tracking'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chatbot Training Manager</h2>
          <p className="text-gray-600">Manage training data for Swen AI assistant</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Training Data
        </button>
      </div>

      {/* AI Testing Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          Test AI Assistant
        </h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              placeholder="Ask Swen a question to test the AI..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && !isTestingAI && testAI()}
            />
            <button
              onClick={testAI}
              disabled={isTestingAI || !testQuestion.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isTestingAI ? 'Testing...' : 'Test AI'}
            </button>
          </div>
          
          {testResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900">Q: {result.question}</div>
                  <div className="text-gray-700 mt-1">A: {result.response}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {result.timestamp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add New Training Entry */}
      {isAddingNew && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Training Entry</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <input
                type="text"
                value={newEntry.question}
                onChange={(e) => setNewEntry({...newEntry, question: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a question customers might ask..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
              <textarea
                value={newEntry.answer}
                onChange={(e) => setNewEntry({...newEntry, answer: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the answer Swen should provide..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newEntry.category}
                  onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <input
                  type="text"
                  value={newEntry.keywords}
                  onChange={(e) => setNewEntry({...newEntry, keywords: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter keywords separated by commas"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-2 inline" />
                Cancel
              </button>
              <button
                onClick={addTrainingEntry}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2 inline" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Training Data List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Training Data ({trainingData.length})</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {trainingData.map((entry) => (
            <div key={entry.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {entry.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {entry.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <strong className="text-gray-900">Q:</strong> {entry.question}
                    </div>
                    <div>
                      <strong className="text-gray-900">A:</strong> {entry.answer}
                    </div>
                    {entry.keywords.length > 0 && (
                      <div>
                        <strong className="text-gray-900">Keywords:</strong> {entry.keywords.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setEditingId(entry.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTrainingEntry(entry.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {trainingData.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No training data yet. Add some entries to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotManager;
