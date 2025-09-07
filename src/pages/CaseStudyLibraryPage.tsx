import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, Target, Award, Search, Filter, Download, ExternalLink, Star, BookOpen, BarChart3, Globe, Zap } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  company: {
    name: string;
    industry: string;
    size: string;
    logo: string;
  };
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  technologies: string[];
  category: string;
  featured: boolean;
  downloadUrl: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

interface IndustryStats {
  industry: string;
  avgImprovement: string;
  totalCompanies: number;
  topChallenge: string;
}

const CaseStudyLibraryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'ecommerce', name: 'E-commerce & Retail' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'food-beverage', name: 'Food & Beverage' },
    { id: 'consumer-goods', name: 'Consumer Goods' }
  ];

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'retail', name: 'Retail' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'logistics', name: 'Logistics' }
  ];

  const industryStats: IndustryStats[] = [
    {
      industry: 'E-commerce',
      avgImprovement: '35%',
      totalCompanies: 245,
      topChallenge: 'Order fulfillment speed'
    },
    {
      industry: 'Manufacturing',
      avgImprovement: '28%',
      totalCompanies: 189,
      topChallenge: 'Supply chain visibility'
    },
    {
      industry: 'Healthcare',
      avgImprovement: '42%',
      totalCompanies: 156,
      topChallenge: 'Regulatory compliance'
    },
    {
      industry: 'Technology',
      avgImprovement: '31%',
      totalCompanies: 134,
      topChallenge: 'API integration complexity'
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'How TechCorp Reduced Shipping Costs by 40%',
      company: {
        name: 'TechCorp Solutions',
        industry: 'Technology',
        size: '500-1000 employees',
        logo: '/companies/techcorp.jpg'
      },
      challenge: 'TechCorp was struggling with high shipping costs and poor visibility into their supply chain operations.',
      solution: 'Implemented Swenlog\'s automated routing optimization and real-time tracking system.',
      results: [
        { metric: 'Shipping Costs', value: '$2.3M', improvement: '-40%' },
        { metric: 'On-time Delivery', value: '96%', improvement: '+15%' },
        { metric: 'Customer Satisfaction', value: '4.8/5', improvement: '+0.6' }
      ],
      technologies: ['API Integration', 'Real-time Tracking', 'Automated Routing'],
      category: 'technology',
      featured: true,
      downloadUrl: '/case-studies/techcorp.pdf',
      readTime: '8 min read',
      publishDate: '2024-01-15',
      author: {
        name: 'Sarah Johnson',
        title: 'Senior Solutions Engineer',
        avatar: '/authors/sarah-johnson.jpg'
      }
    },
    {
      id: '2',
      title: 'Global Retailer\'s Digital Transformation Journey',
      company: {
        name: 'FashionForward',
        industry: 'Retail',
        size: '1000+ employees',
        logo: '/companies/fashionforward.jpg'
      },
      challenge: 'Managing international shipments across 25 countries with varying customs regulations.',
      solution: 'Deployed Swenlog\'s compliance automation and multi-carrier integration platform.',
      results: [
        { metric: 'Customs Clearance Time', value: '2.5 days', improvement: '-60%' },
        { metric: 'Error Rate', value: '0.8%', improvement: '-85%' },
        { metric: 'Cost Savings', value: '$1.8M', improvement: '-25%' }
      ],
      technologies: ['Compliance Automation', 'Multi-carrier Integration', 'Customs API'],
      category: 'ecommerce',
      featured: true,
      downloadUrl: '/case-studies/fashionforward.pdf',
      readTime: '12 min read',
      publishDate: '2024-01-10',
      author: {
        name: 'Mike Chen',
        title: 'Director of Operations',
        avatar: '/authors/mike-chen.jpg'
      }
    },
    {
      id: '3',
      title: 'Healthcare Supply Chain Optimization',
      company: {
        name: 'MediSupply Inc',
        industry: 'Healthcare',
        size: '200-500 employees',
        logo: '/companies/medisupply.jpg'
      },
      challenge: 'Ensuring temperature-controlled shipments for medical supplies with strict regulatory requirements.',
      solution: 'Integrated Swenlog\'s specialized healthcare logistics platform with IoT temperature monitoring.',
      results: [
        { metric: 'Temperature Compliance', value: '99.9%', improvement: '+2%' },
        { metric: 'Delivery Accuracy', value: '98.5%', improvement: '+5%' },
        { metric: 'Regulatory Fines', value: '$50K', improvement: '-90%' }
      ],
      technologies: ['IoT Monitoring', 'Healthcare Compliance', 'Temperature Tracking'],
      category: 'healthcare',
      featured: false,
      downloadUrl: '/case-studies/medisupply.pdf',
      readTime: '10 min read',
      publishDate: '2024-01-08',
      author: {
        name: 'Dr. Emily Rodriguez',
        title: 'VP of Supply Chain',
        avatar: '/authors/emily-rodriguez.jpg'
      }
    },
    {
      id: '4',
      title: 'Manufacturing Giant Streamlines Global Operations',
      company: {
        name: 'AutoParts Pro',
        industry: 'Manufacturing',
        size: '1000+ employees',
        logo: '/companies/autoparts.jpg'
      },
      challenge: 'Coordinating complex supply chains across multiple continents with just-in-time delivery requirements.',
      solution: 'Implemented Swenlog\'s enterprise logistics platform with predictive analytics.',
      results: [
        { metric: 'Supply Chain Visibility', value: '95%', improvement: '+40%' },
        { metric: 'Inventory Turnover', value: '12x', improvement: '+25%' },
        { metric: 'Production Downtime', value: '0.5%', improvement: '-80%' }
      ],
      technologies: ['Predictive Analytics', 'Enterprise Integration', 'JIT Optimization'],
      category: 'manufacturing',
      featured: false,
      downloadUrl: '/case-studies/autoparts.pdf',
      readTime: '15 min read',
      publishDate: '2024-01-05',
      author: {
        name: 'Robert Kim',
        title: 'Chief Operations Officer',
        avatar: '/authors/robert-kim.jpg'
      }
    }
  ];

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesCategory = selectedCategory === 'all' || study.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || study.company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesSearch = searchQuery === '' ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.challenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesIndustry && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'featured') return b.featured ? 1 : -1;
    if (sortBy === 'recent') return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    if (sortBy === 'popular') return b.results.length - a.results.length; // Simplified popularity metric
    return 0;
  });

  const featuredStudies = caseStudies.filter(study => study.featured);

  return (
    <>
      <Helmet>
        <title>Case Study Library | SWENLOG</title>
        <meta name="description" content="Explore real-world success stories of companies that transformed their logistics operations with Swenlog solutions." />
        <meta name="keywords" content="logistics case studies, supply chain success stories, logistics transformation, business results, industry examples" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Case Study Library
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-100">
                Real results from real companies transforming their logistics
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  200+ Success Stories
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  $500M+ Cost Savings
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  Proven Results
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="library" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="library">Case Studies</TabsTrigger>
                <TabsTrigger value="insights">Industry Insights</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="library" className="space-y-6">
                {/* Featured Case Studies */}
                {featuredStudies.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        Featured Success Stories
                      </CardTitle>
                      <CardDescription>
                        Highlighted case studies showcasing exceptional results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {featuredStudies.map((study) => (
                          <div key={study.id} className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{study.company.name} • {study.company.industry}</p>
                                <Badge variant="secondary">Featured</Badge>
                              </div>
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={study.company.logo} />
                                <AvatarFallback>{study.company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              {study.results.slice(0, 3).map((result, index) => (
                                <div key={index} className="text-center">
                                  <div className="text-lg font-bold text-green-600">{result.improvement}</div>
                                  <div className="text-xs text-gray-600">{result.metric}</div>
                                </div>
                              ))}
                            </div>
                            <Button className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Read Full Case Study
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search case studies, companies, or technologies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full lg:w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                        <SelectTrigger className="w-full lg:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry.id} value={industry.id}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full lg:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured First</SelectItem>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Case Study Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCaseStudies.map((study) => (
                    <Card key={study.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={study.company.logo} />
                            <AvatarFallback>{study.company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {study.featured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{study.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{study.company.name}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{study.company.industry}</Badge>
                          <Badge variant="outline">{study.company.size}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Key Results:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {study.results.slice(0, 2).map((result, index) => (
                              <div key={index} className="text-center p-2 bg-green-50 rounded">
                                <div className="text-sm font-bold text-green-600">{result.improvement}</div>
                                <div className="text-xs text-gray-600">{result.metric}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-1">
                            {study.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{study.readTime}</span>
                          <span>{new Date(study.publishDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredCaseStudies.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No case studies found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Performance Insights</CardTitle>
                    <CardDescription>
                      Average improvements and trends across different industries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {industryStats.map((stat) => (
                        <div key={stat.industry} className="p-6 border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">{stat.industry}</h3>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">{stat.avgImprovement}</div>
                              <div className="text-sm text-gray-600">Avg Improvement</div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total Companies:</span>
                              <span className="font-medium">{stat.totalCompanies}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Top Challenge:</span>
                              <span className="font-medium">{stat.topChallenge}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Metrics Overview</CardTitle>
                    <CardDescription>
                      Common KPIs improved through logistics optimization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <BarChart3 className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                        <h3 className="font-semibold mb-2">Cost Reduction</h3>
                        <p className="text-2xl font-bold text-blue-600 mb-2">32%</p>
                        <p className="text-sm text-gray-600">Average shipping cost reduction</p>
                      </div>
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <Zap className="w-8 h-8 mx-auto mb-3 text-green-600" />
                        <h3 className="font-semibold mb-2">Delivery Speed</h3>
                        <p className="text-2xl font-bold text-green-600 mb-2">45%</p>
                        <p className="text-sm text-gray-600">Faster delivery times</p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 rounded-lg">
                        <Users className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                        <h3 className="font-semibold mb-2">Customer Satisfaction</h3>
                        <p className="text-2xl font-bold text-purple-600 mb-2">4.7/5</p>
                        <p className="text-sm text-gray-600">Average satisfaction score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Technology Adoption Trends</CardTitle>
                    <CardDescription>
                      Most commonly implemented technologies in successful transformations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span className="font-medium">Real-time Tracking</span>
                        </div>
                        <Badge variant="secondary">87% Adoption</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="font-medium">API Integration</span>
                        </div>
                        <Badge variant="secondary">74% Adoption</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                          <span className="font-medium">Predictive Analytics</span>
                        </div>
                        <Badge variant="secondary">62% Adoption</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                          <span className="font-medium">Automation</span>
                        </div>
                        <Badge variant="secondary">58% Adoption</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Resources</CardTitle>
                    <CardDescription>
                      Tools and guides to help you implement similar solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Implementation Guides</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">ROI Calculator</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Estimate potential cost savings and ROI for your logistics transformation
                            </p>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Use Calculator
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Technology Assessment</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Evaluate your current technology stack and identify gaps
                            </p>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Guide
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Change Management</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Strategies for successful organizational change during transformation
                            </p>
                            <Button variant="outline" size="sm">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Read Guide
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Success Frameworks</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Digital Transformation Roadmap</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Step-by-step framework for logistics digital transformation
                            </p>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Framework
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Best Practices Library</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Collection of proven practices from successful implementations
                            </p>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Browse Library
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Case Study Template</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Template for documenting your own success stories
                            </p>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Get Inspired</CardTitle>
                    <CardDescription>
                      Connect with companies that have successfully transformed their operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Globe className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Join the Success Community</h3>
                      <p className="text-gray-600 mb-6">
                        Connect with logistics leaders who have achieved similar transformations
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button>
                          <Users className="w-4 h-4 mr-2" />
                          Join Community
                        </Button>
                        <Button variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Schedule Consultation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyLibraryPage;
