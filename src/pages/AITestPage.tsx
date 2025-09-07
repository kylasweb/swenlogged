import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiService } from '@/utils/aiService';
import { Brain, Send, Loader2 } from 'lucide-react';

const AITestPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const testAI = async (testPrompt: string) => {
    setIsLoading(true);
    try {
      const result = await aiService.query(testPrompt, {
        testMode: true,
        model: 'gpt-4o-mini'
      });
      setResponse(result.text);
      setTestResults(prev => [...prev, `Test: "${testPrompt}" -> Response: "${result.text.substring(0, 100)}..."`]);
    } catch (error) {
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const runQuickTests = async () => {
    const testPrompts = [
      'What is shipping?',
      'Tell me about logistics',
      'How does customs work?',
      'What are Incoterms?',
      'Explain freight rates'
    ];

    for (const testPrompt of testPrompts) {
      await testAI(testPrompt);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Puter.js AI Test</h1>
        <p className="text-gray-600">Testing AI service without authentication</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manual Test</CardTitle>
          <CardDescription>Test the AI service with custom prompts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your test prompt..."
              onKeyPress={(e) => e.key === 'Enter' && testAI(prompt)}
            />
            <Button onClick={() => testAI(prompt)} disabled={isLoading || !prompt.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          {response && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Response:</h3>
              <p className="text-gray-700">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Test Suite</CardTitle>
          <CardDescription>Run predefined tests to check AI functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runQuickTests} disabled={isLoading} className="w-full">
            <Brain className="h-4 w-4 mr-2" />
            Run Quick Tests
          </Button>

          {testResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Test Results:</h3>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Predefined Tests</CardTitle>
          <CardDescription>Click any button to test specific prompts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'What is shipping?',
              'Tell me about logistics',
              'How does customs work?',
              'What are Incoterms?',
              'Explain freight rates',
              'What is warehousing?'
            ].map((testPrompt) => (
              <Button
                key={testPrompt}
                variant="outline"
                size="sm"
                onClick={() => testAI(testPrompt)}
                disabled={isLoading}
              >
                {testPrompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITestPage;
