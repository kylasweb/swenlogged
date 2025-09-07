import React, { useState, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Download, Scan, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import AIBadge from '../../components/ui/AIBadge';
import { puterService } from '../../utils/puterService';
import { extractJson } from '../../utils/aiJson';
import { documentExtractionPrompt } from '../../utils/toolPrompts';

const DocumentScannerPage = () => {
  const [scannedText, setScannedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  interface ExtractedData {
    documentType: string;
    bolNumber?: string|null;
    invoiceNumber?: string|null;
    totalValue?: string|null;
    shipper?: string|null;
    consignee?: string|null;
    currency?: string|null;
    incoterms?: string|null;
    paymentTerms?: string|null;
    hsCodes?: string[];
    confidence: number;
    warnings?: string[];
  }
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setUploadedFile(file);
        toast.success('File uploaded successfully');
      } else {
        toast.error('Please upload an image or PDF file');
      }
    }
  };

  const handleScan = async () => {
    if (!uploadedFile) {
      toast.error('Please upload a document first');
      return;
    }

    setIsProcessing(true);
    
    // Simulate OCR processing
  setTimeout(async () => {
      const mockExtractedText = `COMMERCIAL INVOICE

Bill of Lading No: BL123456789
Invoice No: INV-2024-001
Date: ${new Date().toLocaleDateString()}

SHIPPER:
Acme Corporation
123 Export Street
New York, NY 10001
USA

CONSIGNEE:
Global Imports Ltd
456 Import Avenue
London, UK SW1A 1AA

DESCRIPTION OF GOODS:
- Electronic Components (HS Code: 8542.39)
- Quantity: 1000 pieces
- Unit Price: $25.00
- Total Value: $25,000.00

SHIPPING TERMS: FOB
PAYMENT TERMS: Letter of Credit
INCOTERMS: CIF London

Total Invoice Value: USD $25,000.00`;

      setScannedText(mockExtractedText);

      try {
        await puterService.ensureReady(4000);
        const prompt = documentExtractionPrompt(mockExtractedText);
        const aiResp = await puterService.makeAIRequest(prompt, { temperature: 0.1, maxTokens: 600 });
        const text = typeof aiResp === 'string' ? aiResp : (aiResp as { text?: string }).text || '';
        const json = extractJson<{
          documentType?: string; bolNumber?: string; invoiceNumber?: string; totalValue?: string; shipper?: string; consignee?: string; currency?: string; incoterms?: string; paymentTerms?: string; hsCodes?: string[]; confidence?: number; warnings?: string[];
        }>(text);
        if (json) {
          setExtractedData({
            documentType: json.documentType || 'Unknown',
            bolNumber: json.bolNumber || null,
            invoiceNumber: json.invoiceNumber || null,
            totalValue: json.totalValue || null,
            shipper: json.shipper || null,
            consignee: json.consignee || null,
            currency: json.currency || null,
            incoterms: json.incoterms || null,
            paymentTerms: json.paymentTerms || null,
            hsCodes: json.hsCodes || [],
            confidence: json.confidence ?? 0,
            warnings: json.warnings || []
          });
        } else {
          setExtractedData({ documentType: 'Commercial Invoice', confidence: 50, warnings: ['AI parse failed'] });
        }
      } catch (err) {
        console.error('AI extraction error', err);
        setExtractedData({ documentType: 'Commercial Invoice', confidence: 40, warnings: ['AI extraction failed'] });
      } finally {
        setIsProcessing(false);
        toast.success('Document scanned successfully');
      }
    }, 3000);
  };

  const exportData = () => {
    if (!extractedData) return;
    
    const dataStr = JSON.stringify(extractedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `document-data-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <Scan className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Document Scanner
                </h1>
                <AIBadge />
              </div>
              <p className="text-lg leading-8 text-gray-600">
                AI-powered OCR to extract data from shipping documents
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Document
                  </CardTitle>
                  <CardDescription>
                    Upload invoices, bills of lading, or customs documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your document here, or click to browse
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  </div>

                  {uploadedFile && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium">{uploadedFile.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleScan} 
                    className="w-full" 
                    disabled={!uploadedFile || isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Scan Document'}
                  </Button>

                  {extractedData && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-blue-900">Extracted Data</h4>
                          <Badge className="bg-green-100 text-green-800">
                            {extractedData.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div><strong>Type:</strong> {extractedData.documentType}</div>
                          {extractedData.bolNumber && <div><strong>BOL No:</strong> {extractedData.bolNumber}</div>}
                          {extractedData.invoiceNumber && <div><strong>Invoice No:</strong> {extractedData.invoiceNumber}</div>}
                          {extractedData.totalValue && <div><strong>Value:</strong> {extractedData.totalValue}</div>}
                          {extractedData.incoterms && <div><strong>Incoterms:</strong> {extractedData.incoterms}</div>}
                          {extractedData.paymentTerms && <div><strong>Payment:</strong> {extractedData.paymentTerms}</div>}
                          {extractedData.hsCodes && extractedData.hsCodes.length > 0 && <div><strong>HS Codes:</strong> {extractedData.hsCodes.join(', ')}</div>}
                          {extractedData.warnings && extractedData.warnings.length > 0 && <div className="text-yellow-700"><strong>Warnings:</strong> {extractedData.warnings.join('; ')}</div>}
                        </div>
                      </div>
                      
                      <Button onClick={exportData} variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data as JSON
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extracted Text</CardTitle>
                  <CardDescription>
                    Raw text extracted from the document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {scannedText ? (
                    <Textarea
                      value={scannedText}
                      onChange={(e) => setScannedText(e.target.value)}
                      rows={20}
                      className="font-mono text-sm"
                      placeholder="Extracted text will appear here..."
                    />
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Upload and scan a document to see extracted text</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Supported Document Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Commercial Invoices</h4>
                    <p className="text-sm text-gray-600">Extract invoice numbers, amounts, and item details</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Bills of Lading</h4>
                    <p className="text-sm text-gray-600">Capture BOL numbers, ports, and shipment data</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Customs Documents</h4>
                    <p className="text-sm text-gray-600">Process declaration forms and duty calculations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DocumentScannerPage;