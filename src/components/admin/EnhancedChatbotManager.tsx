import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  Bot, Upload, FileText, MessageSquare, Brain, Settings, 
  Edit, Trash2, Plus, Download, Search, Filter, Zap, Play, 
  BarChart3, Users, Clock, CheckCircle
} from 'lucide-react';

interface TrainingData {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  source: 'manual' | 'file' | 'website' | 'generated';
  confidence?: number;
  usage_count?: number;
  last_used?: string;
  created_at: string;
}

interface TestResult {
  question: string;
  response: string;
  timestamp: string;
  confidence?: number;
  sources?: string[];
}

interface FileUpload {
  name: string;
  type: string;
  size: number;
  content: string;
  processed: boolean;
  extracted_qa_pairs: number;
}

const defaultTrainingData: TrainingData[] = [
  {
    id: '1',
    question: 'What services does SWENLOG offer?',
    answer: 'SWENLOG offers comprehensive logistics solutions including air freight, ocean freight, ground transportation, warehousing and distribution, and customs brokerage services.',
    category: 'Services',
    keywords: ['services', 'logistics', 'freight', 'shipping'],
    source: 'generated',
    confidence: 0.95,
    usage_count: 23,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    question: 'How can I track my shipment?',
    answer: 'You can track your shipment by logging into your account and entering your tracking number in the shipment tracking section. You will receive real-time updates on your shipment status.',
    category: 'Tracking',
    keywords: ['track', 'shipment', 'tracking number', 'status'],
    source: 'generated',
    confidence: 0.92,
    usage_count: 45,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    question: 'What are your shipping rates?',
    answer: 'Our shipping rates vary based on destination, weight, dimensions, and service type. Please use our freight calculator or contact our sales team for a personalized quote.',
    category: 'Pricing',
    keywords: ['rates', 'pricing', 'cost', 'quote'],
    source: 'generated',
    confidence: 0.88,
    usage_count: 67,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we provide international shipping services to over 200 countries worldwide through our global network of partners and logistics hubs.',
    category: 'International',
    keywords: ['international', 'worldwide', 'global', 'countries'],
    source: 'generated',
    confidence: 0.94,
    usage_count: 34,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    question: 'How do I get a shipping quote?',
    answer: 'You can get a shipping quote by using our online freight calculator, contacting our sales team at sales@swenlog.com, or calling us at +1 (555) 123-4567.',
    category: 'Quotes',
    keywords: ['quote', 'estimate', 'pricing', 'calculator'],
    source: 'generated',
    confidence: 0.91,
    usage_count: 52,
    created_at: new Date().toISOString()
  }
];

// Generate 20 more comprehensive Q&As
const generateAdditionalQAs = (): TrainingData[] => {
  const additionalQAs = [
    {
      question: 'What industries do you serve?',
      answer: 'We serve multiple industries including automotive, healthcare, manufacturing, energy, retail & fashion, and technology sectors with specialized logistics solutions.',
      category: 'Industries',
      keywords: ['industries', 'automotive', 'healthcare', 'manufacturing', 'retail', 'technology']
    },
    {
      question: 'How long does international shipping take?',
      answer: 'International shipping times vary by destination and service type. Express services take 1-3 days, standard air freight 3-7 days, and ocean freight 15-45 days depending on the route.',
      category: 'Delivery',
      keywords: ['delivery time', 'international', 'express', 'standard', 'ocean freight']
    },
    {
      question: 'Do you provide insurance for shipments?',
      answer: 'Yes, we offer comprehensive cargo insurance options to protect your shipments against loss, damage, or theft during transit. Coverage options start at 0.1% of cargo value.',
      category: 'Insurance',
      keywords: ['insurance', 'cargo', 'protection', 'coverage', 'loss', 'damage']
    },
    {
      question: 'What is your customs clearance process?',
      answer: 'Our customs brokerage team handles all import/export documentation, tariff classification, duty calculation, and regulatory compliance to ensure smooth customs clearance.',
      category: 'Customs',
      keywords: ['customs', 'clearance', 'brokerage', 'import', 'export', 'documentation']
    },
    {
      question: 'Can you handle oversized or heavy cargo?',
      answer: 'Yes, we specialize in project cargo and oversized shipments. Our team coordinates specialized equipment, permits, and routing for heavy machinery, construction equipment, and industrial cargo.',
      category: 'Special Cargo',
      keywords: ['oversized', 'heavy cargo', 'project cargo', 'machinery', 'specialized']
    },
    {
      question: 'What warehouse services do you offer?',
      answer: 'Our warehousing services include storage, inventory management, order fulfillment, pick and pack, cross-docking, and distribution with advanced WMS technology.',
      category: 'Warehousing',
      keywords: ['warehouse', 'storage', 'inventory', 'fulfillment', 'distribution', 'WMS']
    },
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Sign Up" button on our website and providing your business information. Our team will verify your account within 24 hours.',
      category: 'Account',
      keywords: ['account', 'sign up', 'register', 'business', 'verification']
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept wire transfers, ACH payments, credit cards (Visa, MasterCard, AmEx), and for established customers, we offer credit terms with NET 30 payment options.',
      category: 'Payment',
      keywords: ['payment', 'wire transfer', 'credit card', 'ACH', 'credit terms']
    },
    {
      question: 'Do you offer supply chain consulting?',
      answer: 'Yes, our supply chain experts provide consulting services including network optimization, cost analysis, risk assessment, and digital transformation strategies.',
      category: 'Consulting',
      keywords: ['consulting', 'supply chain', 'optimization', 'analysis', 'strategy']
    },
    {
      question: 'What technology do you use for tracking?',
      answer: 'We use advanced GPS tracking, IoT sensors, blockchain technology, and real-time visibility platforms to provide comprehensive shipment tracking and monitoring.',
      category: 'Technology',
      keywords: ['technology', 'GPS', 'IoT', 'blockchain', 'visibility', 'monitoring']
    },
    {
      question: 'How do you ensure cargo security?',
      answer: 'We implement multi-layer security including facility access controls, GPS monitoring, tamper-evident seals, background-checked personnel, and 24/7 surveillance.',
      category: 'Security',
      keywords: ['security', 'GPS monitoring', 'surveillance', 'access control', 'tamper-evident']
    },
    {
      question: 'What are your environmental initiatives?',
      answer: 'We are committed to sustainable logistics through carbon footprint reduction, eco-friendly packaging, route optimization, and partnerships with green transportation providers.',
      category: 'Environment',
      keywords: ['environmental', 'sustainable', 'carbon footprint', 'eco-friendly', 'green']
    },
    {
      question: 'Do you provide temperature-controlled shipping?',
      answer: 'Yes, we offer temperature-controlled logistics for pharmaceuticals, food products, and other temperature-sensitive cargo with validated cold chain processes.',
      category: 'Cold Chain',
      keywords: ['temperature-controlled', 'cold chain', 'pharmaceuticals', 'food products']
    },
    {
      question: 'How can I cancel or modify my shipment?',
      answer: 'You can cancel or modify shipments through your account portal before pickup, or contact our customer service team. Modification fees may apply depending on the service type.',
      category: 'Support',
      keywords: ['cancel', 'modify', 'shipment', 'customer service', 'portal']
    },
    {
      question: 'What documentation is required for international shipping?',
      answer: 'International shipments require commercial invoice, packing list, bill of lading, and may need certificates of origin, export licenses, or other trade documents.',
      category: 'Documentation',
      keywords: ['documentation', 'international', 'commercial invoice', 'bill of lading', 'export']
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes, we provide same-day delivery services in major metropolitan areas for urgent shipments. Contact our expedited services team for availability and pricing.',
      category: 'Express',
      keywords: ['same-day', 'delivery', 'urgent', 'expedited', 'metropolitan']
    },
    {
      question: 'How do you handle damaged shipments?',
      answer: 'In case of damage, immediately report it to our claims department. We will investigate, work with insurers if applicable, and ensure prompt resolution and compensation.',
      category: 'Claims',
      keywords: ['damage', 'claims', 'compensation', 'investigation', 'resolution']
    },
    {
      question: 'What is your customer service availability?',
      answer: 'Our customer service team is available 24/7 via phone, email, and live chat. We also have dedicated account managers for enterprise customers.',
      category: 'Support',
      keywords: ['customer service', '24/7', 'phone', 'email', 'live chat', 'account manager']
    },
    {
      question: 'Do you provide packaging services?',
      answer: 'Yes, we offer professional packaging services including custom crating, protective packaging, hazmat packaging, and specialized packaging for fragile items.',
      category: 'Packaging',
      keywords: ['packaging', 'crating', 'protective', 'hazmat', 'fragile']
    },
    {
      question: 'How do you calculate shipping costs?',
      answer: 'Shipping costs are calculated based on weight, dimensions, distance, service type, fuel surcharges, and any additional services like insurance or special handling.',
      category: 'Pricing',
      keywords: ['shipping costs', 'calculation', 'weight', 'dimensions', 'fuel surcharge']
    }
  ];

  return additionalQAs.map((qa, index) => ({
    id: (defaultTrainingData.length + index + 1).toString(),
    question: qa.question,
    answer: qa.answer,
    category: qa.category,
    keywords: qa.keywords,
    source: 'generated' as const,
    confidence: 0.85 + Math.random() * 0.1,
    usage_count: Math.floor(Math.random() * 30) + 5,
    last_used: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString()
  }));
};

const EnhancedChatbotManager = () => {
  const [trainingData, setTrainingData] = useLocalStorage('chatbotTrainingData', [...defaultTrainingData, ...generateAdditionalQAs()]);
  const [testResults, setTestResults] = useLocalStorage('chatbotTestResults', []);
  const [uploadedFiles, setUploadedFiles] = useLocalStorage('chatbotFiles', []);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [testQuestion, setTestQuestion] = useState('');
  const [isTestingAI, setIsTestingAI] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  
  const [newEntry, setNewEntry] = useState<Partial<TrainingData>>({
    question: '',
    answer: '',
    category: 'General',
    keywords: [],
    source: 'manual'
  });

  const { toast } = useToast();

  const saveTrainingData = (data: TrainingData[]) => {
    setTrainingData(data);
  };

  const addTrainingEntry = () => {
    if (!newEntry.question || !newEntry.answer) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer fields.",
        variant: "destructive",
      });
      return;
    }

    const entry: TrainingData = {
      id: Date.now().toString(),
      question: newEntry.question,
      answer: newEntry.answer,
      category: newEntry.category || 'General',
      keywords: Array.isArray(newEntry.keywords) ? newEntry.keywords : [],
      source: 'manual',
      confidence: 1.0,
      usage_count: 0,
      created_at: new Date().toISOString()
    };

    saveTrainingData([...trainingData, entry]);
    setNewEntry({ question: '', answer: '', category: 'General', keywords: [], source: 'manual' });
    setIsAddingNew(false);
    
    toast({
      title: "Success",
      description: "Training entry added successfully.",
    });
  };

  const updateTrainingEntry = (id: string, updates: Partial<TrainingData>) => {
    const updatedData = trainingData.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveTrainingData(updatedData);
    setEditingId(null);
    
    toast({
      title: "Success",
      description: "Training entry updated successfully.",
    });
  };

  const deleteTrainingEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this training entry?')) {
      const updatedData = trainingData.filter(item => item.id !== id);
      saveTrainingData(updatedData);
      
      toast({
        title: "Success",
        description: "Training entry deleted successfully.",
      });
    }
  };

  const processUploadedFiles = async () => {
    if (!selectedFiles) return;

    setIsProcessingFiles(true);
    const files: FileUpload[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const content = await file.text();
      
      const fileUpload: FileUpload = {
        name: file.name,
        type: file.type,
        size: file.size,
        content,
        processed: true,
        extracted_qa_pairs: Math.floor(Math.random() * 10) + 5 // Simulated extraction
      };

      files.push(fileUpload);

      // Simulate extracting Q&A pairs from file content
      const extractedPairs = extractQAFromContent(content, file.name);
      const newTrainingData = extractedPairs.map((pair, index) => ({
        id: `${Date.now()}_${i}_${index}`,
        question: pair.question,
        answer: pair.answer,
        category: 'Extracted',
        keywords: extractKeywords(pair.question + ' ' + pair.answer),
        source: 'file' as const,
        confidence: 0.7 + Math.random() * 0.2,
        usage_count: 0,
        created_at: new Date().toISOString()
      }));

      setTrainingData(prev => [...prev, ...newTrainingData]);
    }

    setUploadedFiles(prev => [...prev, ...files]);
    setSelectedFiles(null);
    setIsProcessingFiles(false);

    toast({
      title: "Success",
      description: `Processed ${files.length} files and extracted ${files.reduce((sum, f) => sum + f.extracted_qa_pairs, 0)} Q&A pairs.`,
    });
  };

  const extractQAFromContent = (content: string, filename: string) => {
    // Simple extraction logic - in real implementation, use NLP/AI
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const pairs = [];
    
    for (let i = 0; i < Math.min(5, sentences.length); i++) {
      pairs.push({
        question: `What does the document "${filename}" say about ${sentences[i].substring(0, 30)}...?`,
        answer: sentences[i].trim() + '.'
      });
    }
    
    return pairs;
  };

  const extractKeywords = (text: string): string[] => {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'];
    return text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 5);
  };

  const testAI = async () => {
    if (!testQuestion.trim()) return;

    setIsTestingAI(true);
    
    // Simulate AI response
    setTimeout(() => {
      const relevantData = trainingData.filter(item =>
        item.question.toLowerCase().includes(testQuestion.toLowerCase()) ||
        item.keywords.some(keyword => testQuestion.toLowerCase().includes(keyword))
      );

      const response = relevantData.length > 0
        ? relevantData[0].answer
        : "I don't have specific information about that topic. Please contact our customer service team for assistance.";

      const result: TestResult = {
        question: testQuestion,
        response,
        timestamp: new Date().toISOString(),
        confidence: relevantData.length > 0 ? relevantData[0].confidence : 0.1,
        sources: relevantData.map(item => item.id).slice(0, 3)
      };

      setTestResults(prev => [result, ...prev.slice(0, 9)]);
      setTestQuestion('');
      setIsTestingAI(false);

      toast({
        title: "AI Test Complete",
        description: "Test response generated successfully.",
      });
    }, 2000);
  };

  const getFilteredData = () => {
    return trainingData.filter(item => {
      const matchesSearch = searchTerm === '' ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesSource = filterSource === 'all' || item.source === filterSource;
      
      return matchesSearch && matchesCategory && matchesSource;
    });
  };

  const categories = [...new Set(trainingData.map(item => item.category))];
  const sources = [...new Set(trainingData.map(item => item.source))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Chatbot Training</h2>
          <p className="text-muted-foreground">Advanced AI training data management with file uploads</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setIsAddingNew(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Training Data
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Q&A Pairs</p>
                <p className="text-2xl font-bold">{trainingData.length}</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Files Processed</p>
                <p className="text-2xl font-bold">{uploadedFiles.length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Test Queries</p>
                <p className="text-2xl font-bold">{testResults.length}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Upload Training
          </CardTitle>
          <CardDescription>
            Upload text files, PDFs, CSVs, or DOCX files to automatically extract training data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium">
                    Click to upload or drag and drop
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    TXT, PDF, CSV, DOCX up to 10MB each
                  </span>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".txt,.pdf,.csv,.docx,.doc"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {selectedFiles && selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Selected Files:</h4>
              {Array.from(selectedFiles).map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                  <Badge variant="outline">{file.type || 'Unknown'}</Badge>
                </div>
              ))}
              <Button onClick={processUploadedFiles} disabled={isProcessingFiles} className="w-full">
                {isProcessingFiles ? 'Processing...' : 'Process Files'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Testing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Test AI Chatbot
          </CardTitle>
          <CardDescription>
            Test the AI responses based on your training data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question to test the AI..."
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && testAI()}
            />
            <Button onClick={testAI} disabled={isTestingAI || !testQuestion.trim()}>
              <Play className="h-4 w-4 mr-2" />
              {isTestingAI ? 'Testing...' : 'Test'}
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Recent Test Results:</h4>
              {testResults.slice(0, 3).map((result, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">Q: {result.question}</p>
                        <Badge variant="outline">
                          {Math.round((result.confidence || 0) * 100)}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">A: {result.response}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(result.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Training Data Management</CardTitle>
          <CardDescription>
            Manage your chatbot's knowledge base with advanced filtering and search
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search training data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Training Data Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredData().slice(0, 10).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-md">
                    <div className="truncate">{item.question}</div>
                    <div className="text-xs text-muted-foreground truncate mt-1">
                      {item.answer}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.source === 'manual' ? 'default' : 'secondary'}>
                      {item.source}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.usage_count || 0}</TableCell>
                  <TableCell>
                    <Badge variant={
                      (item.confidence || 0) > 0.8 ? 'default' :
                      (item.confidence || 0) > 0.6 ? 'secondary' : 'outline'
                    }>
                      {Math.round((item.confidence || 0) * 100)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingId(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteTrainingEntry(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {getFilteredData().length > 10 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Showing 10 of {getFilteredData().length} results. Use search and filters to narrow down.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddingNew || editingId !== null} onOpenChange={(open) => {
        if (!open) {
          setIsAddingNew(false);
          setEditingId(null);
          setNewEntry({ question: '', answer: '', category: 'General', keywords: [], source: 'manual' });
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Training Entry' : 'Add New Training Entry'}
            </DialogTitle>
            <DialogDescription>
              {editingId ? 'Update the training data entry' : 'Add a new question and answer pair for the chatbot'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question *</Label>
              <Textarea
                id="question"
                value={editingId ? trainingData.find(item => item.id === editingId)?.question || '' : newEntry.question}
                onChange={(e) => {
                  if (editingId) {
                    updateTrainingEntry(editingId, { question: e.target.value });
                  } else {
                    setNewEntry(prev => ({ ...prev, question: e.target.value }));
                  }
                }}
                placeholder="What question should the chatbot be able to answer?"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="answer">Answer *</Label>
              <Textarea
                id="answer"
                value={editingId ? trainingData.find(item => item.id === editingId)?.answer || '' : newEntry.answer}
                onChange={(e) => {
                  if (editingId) {
                    updateTrainingEntry(editingId, { answer: e.target.value });
                  } else {
                    setNewEntry(prev => ({ ...prev, answer: e.target.value }));
                  }
                }}
                placeholder="What should the chatbot respond with?"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={editingId ? trainingData.find(item => item.id === editingId)?.category : newEntry.category}
                  onValueChange={(value) => {
                    if (editingId) {
                      updateTrainingEntry(editingId, { category: value });
                    } else {
                      setNewEntry(prev => ({ ...prev, category: value }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Pricing">Pricing</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  value={editingId ? 
                    trainingData.find(item => item.id === editingId)?.keywords.join(', ') || '' : 
                    Array.isArray(newEntry.keywords) ? newEntry.keywords.join(', ') : ''
                  }
                  onChange={(e) => {
                    const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k);
                    if (editingId) {
                      updateTrainingEntry(editingId, { keywords });
                    } else {
                      setNewEntry(prev => ({ ...prev, keywords }));
                    }
                  }}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => {
              setIsAddingNew(false);
              setEditingId(null);
            }}>
              Cancel
            </Button>
            <Button onClick={editingId ? () => setEditingId(null) : addTrainingEntry}>
              {editingId ? 'Update' : 'Add'} Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedChatbotManager;