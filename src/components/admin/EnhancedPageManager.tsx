import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  FileText, Plus, Edit, Trash2, Eye, EyeOff, Globe, Search, 
  Filter, Settings, Upload, Download, Copy, ExternalLink, 
  Calendar, User, BarChart3, Layout, Code, Image
} from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  featuredImage?: string;
  template: 'default' | 'landing' | 'service' | 'industry' | 'custom';
  status: 'draft' | 'published' | 'private' | 'archived';
  visibility: 'public' | 'private' | 'password' | 'members';
  password?: string;
  parentPage?: string;
  menuOrder: number;
  showInMenu: boolean;
  customCSS?: string;
  customJS?: string;
  redirectTo?: string;
  publishDate?: string;
  author: string;
  lastModified: string;
  pageViews?: number;
  socialImage?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterCard?: string;
  enableComments: boolean;
  enableSearch: boolean;
  created_at: string;
}

const defaultPages: Page[] = [
  {
    id: '1',
    title: 'Home',
    slug: '/',
    content: 'Welcome to SWENLOG - Your Global Logistics Partner. We provide comprehensive shipping and logistics solutions worldwide.',
    excerpt: 'Global logistics solutions for all your shipping needs',
    metaTitle: 'SWENLOG - Global Logistics Solutions | Worldwide Shipping',
    metaDescription: 'Leading logistics company providing air freight, ocean freight, ground transportation, and warehousing services globally.',
    metaKeywords: 'logistics, shipping, freight, global, international',
    template: 'default',
    status: 'published',
    visibility: 'public',
    menuOrder: 1,
    showInMenu: true,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 1250,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'About Us',
    slug: '/about',
    content: 'SWENLOG has been providing reliable logistics solutions for over two decades...',
    excerpt: 'Learn about our company history and mission',
    metaTitle: 'About SWENLOG - Leading Logistics Company',
    metaDescription: 'Discover SWENLOG\'s history, mission, and commitment to excellence in global logistics and shipping services.',
    template: 'default',
    status: 'published',
    visibility: 'public',
    menuOrder: 2,
    showInMenu: true,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 845,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Air Freight Services',
    slug: '/services/air-freight',
    content: 'Our air freight services provide fast, reliable shipping solutions for time-critical cargo...',
    excerpt: 'Fast and reliable air freight shipping worldwide',
    metaTitle: 'Air Freight Services - Fast International Shipping | SWENLOG',
    metaDescription: 'Professional air freight services for urgent shipments. Fast, secure, and reliable air cargo solutions worldwide.',
    template: 'service',
    status: 'published',
    visibility: 'public',
    menuOrder: 10,
    showInMenu: true,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 623,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Ocean Freight Services',
    slug: '/services/ocean-freight',
    content: 'Cost-effective ocean freight solutions for large cargo volumes and international trade...',
    excerpt: 'Economical ocean freight for large shipments',
    metaTitle: 'Ocean Freight Services - Cost-Effective Shipping | SWENLOG',
    metaDescription: 'Reliable ocean freight services for international shipping. Competitive rates for FCL and LCL shipments worldwide.',
    template: 'service',
    status: 'published',
    visibility: 'public',
    menuOrder: 11,
    showInMenu: true,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 534,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Contact Us',
    slug: '/contact',
    content: 'Get in touch with our logistics experts for personalized shipping solutions...',
    excerpt: 'Contact our team for logistics solutions',
    metaTitle: 'Contact SWENLOG - Get Shipping Quote | Logistics Support',
    metaDescription: 'Contact SWENLOG for shipping quotes, logistics support, and personalized solutions. Get in touch with our experts.',
    template: 'default',
    status: 'published',
    visibility: 'public',
    menuOrder: 5,
    showInMenu: true,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 423,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Privacy Policy',
    slug: '/privacy-policy',
    content: 'This Privacy Policy describes how SWENLOG collects, uses, and protects your personal information...',
    excerpt: 'Our commitment to protecting your privacy',
    metaTitle: 'Privacy Policy - SWENLOG Data Protection',
    metaDescription: 'Read SWENLOG\'s privacy policy to understand how we collect, use, and protect your personal information.',
    template: 'default',
    status: 'published',
    visibility: 'public',
    menuOrder: 100,
    showInMenu: false,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 156,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Terms of Service',
    slug: '/terms-of-service',
    content: 'These Terms of Service govern your use of SWENLOG\'s website and services...',
    excerpt: 'Terms and conditions for using our services',
    metaTitle: 'Terms of Service - SWENLOG Legal Terms',
    metaDescription: 'Read SWENLOG\'s terms of service for using our website and logistics services.',
    template: 'default',
    status: 'published',
    visibility: 'public',
    menuOrder: 101,
    showInMenu: false,
    publishDate: new Date().toISOString(),
    author: 'Admin',
    lastModified: new Date().toISOString(),
    pageViews: 134,
    enableComments: false,
    enableSearch: true,
    created_at: new Date().toISOString()
  }
];

const EnhancedPageManager = () => {
  const [pages, setPages] = useLocalStorage('pages', defaultPages);
  const [activeTab, setActiveTab] = useState('pages');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState<Partial<Page>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTemplate, setFilterTemplate] = useState('all');
  const { toast } = useToast();

  const handleInputChange = (field: keyof Page, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && !editingPage) {
      const slug = '/' + value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const openDialog = (page: Page | null = null) => {
    setEditingPage(page);
    setFormData(page || {
      title: '',
      slug: '',
      content: '',
      template: 'default',
      status: 'draft',
      visibility: 'public',
      menuOrder: pages.length + 1,
      showInMenu: true,
      author: 'Admin',
      enableComments: false,
      enableSearch: true
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPage(null);
    setFormData({});
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.slug) {
      toast({
        title: "Error",
        description: "Please fill in the required fields (title and slug).",
        variant: "destructive",
      });
      return;
    }

    const pageData: Page = {
      id: editingPage ? editingPage.id : Date.now().toString(),
      title: formData.title!,
      slug: formData.slug!,
      content: formData.content || '',
      excerpt: formData.excerpt,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      metaKeywords: formData.metaKeywords,
      canonicalUrl: formData.canonicalUrl,
      featuredImage: formData.featuredImage,
      template: formData.template || 'default',
      status: formData.status || 'draft',
      visibility: formData.visibility || 'public',
      password: formData.password,
      parentPage: formData.parentPage,
      menuOrder: formData.menuOrder || pages.length + 1,
      showInMenu: formData.showInMenu !== undefined ? formData.showInMenu : true,
      customCSS: formData.customCSS,
      customJS: formData.customJS,
      redirectTo: formData.redirectTo,
      publishDate: formData.publishDate || new Date().toISOString(),
      author: formData.author || 'Admin',
      lastModified: new Date().toISOString(),
      pageViews: formData.pageViews || 0,
      socialImage: formData.socialImage,
      openGraphTitle: formData.openGraphTitle,
      openGraphDescription: formData.openGraphDescription,
      twitterCard: formData.twitterCard,
      enableComments: formData.enableComments !== undefined ? formData.enableComments : false,
      enableSearch: formData.enableSearch !== undefined ? formData.enableSearch : true,
      created_at: editingPage ? editingPage.created_at : new Date().toISOString()
    };

    if (editingPage) {
      setPages(prev => prev.map(p => p.id === editingPage.id ? pageData : p));
      toast({ title: "Success", description: "Page updated successfully." });
    } else {
      setPages(prev => [...prev, pageData]);
      toast({ title: "Success", description: "Page created successfully." });
    }

    closeDialog();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(prev => prev.filter(p => p.id !== id));
      toast({ title: "Success", description: "Page deleted successfully." });
    }
  };

  const duplicatePage = (page: Page) => {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      created_at: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      pageViews: 0
    };
    setPages(prev => [...prev, newPage]);
    toast({ title: "Success", description: "Page duplicated successfully." });
  };

  const togglePageStatus = (id: string) => {
    setPages(prev => prev.map(page => 
      page.id === id 
        ? { 
            ...page, 
            status: page.status === 'published' ? 'draft' : 'published',
            lastModified: new Date().toISOString()
          } 
        : page
    ));
  };

  const getFilteredPages = () => {
    return pages.filter(page => {
      const matchesSearch = searchTerm === '' ||
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
      const matchesTemplate = filterTemplate === 'all' || page.template === filterTemplate;
      
      return matchesSearch && matchesStatus && matchesTemplate;
    });
  };

  const getPageStats = () => {
    const totalPages = pages.length;
    const publishedPages = pages.filter(p => p.status === 'published').length;
    const draftPages = pages.filter(p => p.status === 'draft').length;
    const totalViews = pages.reduce((sum, p) => sum + (p.pageViews || 0), 0);
    const avgViews = totalPages > 0 ? Math.round(totalViews / totalPages) : 0;

    return { totalPages, publishedPages, draftPages, totalViews, avgViews };
  };

  const stats = getPageStats();
  const templates = [...new Set(pages.map(p => p.template))];
  const statuses = [...new Set(pages.map(p => p.status))];

  const renderPagesTab = () => (
    <div className="space-y-4">
      {/* Page Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pages</p>
                <p className="text-2xl font-bold">{stats.totalPages}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{stats.publishedPages}</p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{stats.draftPages}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Views</p>
                <p className="text-2xl font-bold">{stats.avgViews}</p>
              </div>
              <Eye className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterTemplate} onValueChange={setFilterTemplate}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Templates</SelectItem>
              {templates.map(template => (
                <SelectItem key={template} value={template}>{template}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => openDialog()} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Button>
        </div>
      </div>

      {/* Pages Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredPages().map((page) => (
              <TableRow key={page.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{page.title}</p>
                    {page.excerpt && (
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {page.excerpt}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">{page.slug}</code>
                    {page.slug !== '/' && (
                      <Button variant="ghost" size="sm" onClick={() => window.open(page.slug, '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{page.template}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePageStatus(page.id)}
                  >
                    <Badge variant={
                      page.status === 'published' ? 'default' :
                      page.status === 'draft' ? 'secondary' : 'outline'
                    }>
                      {page.status}
                    </Badge>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>{page.pageViews?.toLocaleString() || 0}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{new Date(page.lastModified).toLocaleDateString()}</p>
                    <p className="text-muted-foreground">by {page.author}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openDialog(page)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => duplicatePage(page)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(page.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Page Management</h2>
          <p className="text-muted-foreground">Comprehensive page management with SEO and advanced features</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="menu">Menu Structure</TabsTrigger>
          <TabsTrigger value="seo">SEO Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          {renderPagesTab()}
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardContent className="p-8 text-center">
              <Layout className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Menu Structure Management</h3>
              <p className="text-muted-foreground mb-4">
                Visual menu management will be implemented in the next update.
              </p>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Menu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">SEO Overview</h3>
              <p className="text-muted-foreground mb-4">
                SEO analysis and recommendations will be available soon.
              </p>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View SEO Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Page Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Detailed page analytics and performance metrics coming soon.
              </p>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for Add/Edit Page */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage ? 'Edit Page' : 'Create New Page'}
            </DialogTitle>
            <DialogDescription>
              {editingPage ? 'Update page content and settings' : 'Create a new page with advanced SEO and publishing options'}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug || ''}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="/page-url"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt || ''}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the page"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content || ''}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Page content..."
                  rows={10}
                />
              </div>
              
              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage || ''}
                  onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle || ''}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="SEO title (60 characters max)"
                  maxLength={60}
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {(formData.metaTitle || '').length}/60 characters
                </div>
              </div>
              
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription || ''}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="SEO description (160 characters max)"
                  maxLength={160}
                  rows={3}
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {(formData.metaDescription || '').length}/160 characters
                </div>
              </div>
              
              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={formData.metaKeywords || ''}
                  onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              
              <div>
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={formData.canonicalUrl || ''}
                  onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                  placeholder="https://example.com/canonical-url"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openGraphTitle">Open Graph Title</Label>
                  <Input
                    id="openGraphTitle"
                    value={formData.openGraphTitle || ''}
                    onChange={(e) => handleInputChange('openGraphTitle', e.target.value)}
                    placeholder="Social media title"
                  />
                </div>
                <div>
                  <Label htmlFor="socialImage">Social Image URL</Label>
                  <Input
                    id="socialImage"
                    value={formData.socialImage || ''}
                    onChange={(e) => handleInputChange('socialImage', e.target.value)}
                    placeholder="https://example.com/social-image.jpg"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="openGraphDescription">Open Graph Description</Label>
                <Textarea
                  id="openGraphDescription"
                  value={formData.openGraphDescription || ''}
                  onChange={(e) => handleInputChange('openGraphDescription', e.target.value)}
                  placeholder="Social media description"
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template">Template</Label>
                  <Select value={formData.template || 'default'} onValueChange={(value) => handleInputChange('template', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                      <SelectItem value="service">Service Page</SelectItem>
                      <SelectItem value="industry">Industry Page</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status || 'draft'} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select value={formData.visibility || 'public'} onValueChange={(value) => handleInputChange('visibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                      <SelectItem value="members">Members Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="menuOrder">Menu Order</Label>
                  <Input
                    id="menuOrder"
                    type="number"
                    value={formData.menuOrder || 0}
                    onChange={(e) => handleInputChange('menuOrder', parseInt(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>
              
              {formData.visibility === 'password' && (
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showInMenu"
                    checked={formData.showInMenu !== undefined ? formData.showInMenu : true}
                    onCheckedChange={(checked) => handleInputChange('showInMenu', checked)}
                  />
                  <Label htmlFor="showInMenu">Show in Menu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableSearch"
                    checked={formData.enableSearch !== undefined ? formData.enableSearch : true}
                    onCheckedChange={(checked) => handleInputChange('enableSearch', checked)}
                  />
                  <Label htmlFor="enableSearch">Enable Search</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  type="datetime-local"
                  value={formData.publishDate ? new Date(formData.publishDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('publishDate', new Date(e.target.value).toISOString())}
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="redirectTo">Redirect To</Label>
                <Input
                  id="redirectTo"
                  value={formData.redirectTo || ''}
                  onChange={(e) => handleInputChange('redirectTo', e.target.value)}
                  placeholder="/redirect-url or https://external.com"
                />
              </div>
              
              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={formData.customCSS || ''}
                  onChange={(e) => handleInputChange('customCSS', e.target.value)}
                  placeholder="/* Custom CSS for this page */"
                  rows={5}
                />
              </div>
              
              <div>
                <Label htmlFor="customJS">Custom JavaScript</Label>
                <Textarea
                  id="customJS"
                  value={formData.customJS || ''}
                  onChange={(e) => handleInputChange('customJS', e.target.value)}
                  placeholder="// Custom JavaScript for this page"
                  rows={5}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingPage ? 'Update' : 'Create'} Page
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedPageManager;