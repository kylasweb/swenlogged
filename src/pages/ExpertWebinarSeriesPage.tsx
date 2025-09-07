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
import { Calendar, Clock, Users, Play, Download, Star, Search, Filter, Video, Mic, BookOpen, Award } from 'lucide-react';

interface Webinar {
  id: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    company: string;
    avatar: string;
    bio: string;
  };
  date: string;
  duration: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  attendees: number;
  rating: number;
  tags: string[];
  recordingUrl?: string;
  slidesUrl?: string;
  isUpcoming: boolean;
  isLive: boolean;
}

interface WebinarSeries {
  id: string;
  title: string;
  description: string;
  webinars: Webinar[];
  totalDuration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const ExpertWebinarSeriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'upcoming' | 'recorded' | 'series'>('upcoming');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'logistics', name: 'Logistics & Supply Chain' },
    { id: 'technology', name: 'Technology & Integration' },
    { id: 'compliance', name: 'Compliance & Regulations' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'ecommerce', name: 'E-commerce & Retail' },
    { id: 'international', name: 'International Shipping' }
  ];

  const webinarSeries: WebinarSeries[] = [
    {
      id: 'logistics-masterclass',
      title: 'Logistics Masterclass Series',
      description: 'Comprehensive series covering all aspects of modern logistics management',
      totalDuration: '12 hours',
      level: 'Intermediate',
      category: 'logistics',
      webinars: []
    },
    {
      id: 'api-integration',
      title: 'API Integration Deep Dive',
      description: 'Complete guide to integrating logistics APIs into your business systems',
      totalDuration: '8 hours',
      level: 'Advanced',
      category: 'technology',
      webinars: []
    },
    {
      id: 'compliance-essentials',
      title: 'Compliance Essentials',
      description: 'Navigate complex regulatory requirements for international shipping',
      totalDuration: '6 hours',
      level: 'Beginner',
      category: 'compliance',
      webinars: []
    },
    {
      id: 'sustainable-logistics',
      title: 'Sustainable Logistics',
      description: 'Implement eco-friendly practices in your supply chain operations',
      totalDuration: '10 hours',
      level: 'Intermediate',
      category: 'sustainability',
      webinars: []
    }
  ];

  const webinars: Webinar[] = [
    {
      id: '1',
      title: 'Optimizing Supply Chain Visibility',
      description: 'Learn how to gain real-time visibility into your entire supply chain network and improve decision-making processes.',
      speaker: {
        name: 'Dr. Sarah Chen',
        title: 'VP of Supply Chain',
        company: 'Global Logistics Corp',
        avatar: '/speakers/sarah-chen.jpg',
        bio: '15+ years in supply chain optimization with expertise in digital transformation'
      },
      date: '2024-02-15T14:00:00Z',
      duration: '60 min',
      category: 'logistics',
      level: 'Intermediate',
      attendees: 234,
      rating: 4.8,
      tags: ['supply-chain', 'visibility', 'optimization'],
      isUpcoming: true,
      isLive: false
    },
    {
      id: '2',
      title: 'API Security Best Practices',
      description: 'Essential security measures for protecting your logistics API integrations and sensitive data.',
      speaker: {
        name: 'Mike Rodriguez',
        title: 'Chief Security Officer',
        company: 'SecureShip Technologies',
        avatar: '/speakers/mike-rodriguez.jpg',
        bio: 'Cybersecurity expert specializing in API security and data protection'
      },
      date: '2024-01-20T10:00:00Z',
      duration: '45 min',
      category: 'technology',
      level: 'Advanced',
      attendees: 189,
      rating: 4.9,
      tags: ['api', 'security', 'best-practices'],
      recordingUrl: '/recordings/api-security.mp4',
      slidesUrl: '/slides/api-security.pdf',
      isUpcoming: false,
      isLive: false
    },
    {
      id: '3',
      title: 'Customs Compliance for E-commerce',
      description: 'Navigate international customs regulations and ensure compliance for your online business.',
      speaker: {
        name: 'Anna Martinez',
        title: 'Customs Compliance Director',
        company: 'TradeCompliance Inc',
        avatar: '/speakers/anna-martinez.jpg',
        bio: 'Former customs broker with extensive experience in international trade compliance'
      },
      date: '2024-01-25T16:00:00Z',
      duration: '75 min',
      category: 'compliance',
      level: 'Beginner',
      attendees: 156,
      rating: 4.7,
      tags: ['customs', 'compliance', 'ecommerce'],
      isUpcoming: true,
      isLive: false
    },
    {
      id: '4',
      title: 'Sustainable Packaging Solutions',
      description: 'Explore eco-friendly packaging alternatives and their impact on logistics operations.',
      speaker: {
        name: 'Emma Wilson',
        title: 'Sustainability Manager',
        company: 'GreenLogistics Co',
        avatar: '/speakers/emma-wilson.jpg',
        bio: 'Environmental scientist focused on sustainable supply chain practices'
      },
      date: '2024-01-18T11:00:00Z',
      duration: '50 min',
      category: 'sustainability',
      level: 'Intermediate',
      attendees: 203,
      rating: 4.6,
      tags: ['sustainability', 'packaging', 'environment'],
      recordingUrl: '/recordings/sustainable-packaging.mp4',
      slidesUrl: '/slides/sustainable-packaging.pdf',
      isUpcoming: false,
      isLive: false
    },
    {
      id: '5',
      title: 'Live: Real-time Shipment Tracking Implementation',
      description: 'Interactive session on implementing advanced shipment tracking systems.',
      speaker: {
        name: 'David Park',
        title: 'Technical Architect',
        company: 'TrackMaster Solutions',
        avatar: '/speakers/david-park.jpg',
        bio: 'Software architect specializing in real-time tracking and IoT solutions'
      },
      date: '2024-01-22T15:00:00Z',
      duration: '90 min',
      category: 'technology',
      level: 'Advanced',
      attendees: 312,
      rating: 4.9,
      tags: ['tracking', 'real-time', 'implementation'],
      isUpcoming: false,
      isLive: true
    }
  ];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesCategory = selectedCategory === 'all' || webinar.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || webinar.level === selectedLevel;
    const matchesSearch = searchQuery === '' ||
      webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesViewMode = true;
    if (viewMode === 'upcoming') matchesViewMode = webinar.isUpcoming;
    else if (viewMode === 'recorded') matchesViewMode = !webinar.isUpcoming && !webinar.isLive;
    else if (viewMode === 'series') matchesViewMode = true; // Show all for series view

    return matchesCategory && matchesLevel && matchesSearch && matchesViewMode;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (webinar: Webinar) => {
    if (webinar.isLive) return <Badge className="bg-red-500">Live Now</Badge>;
    if (webinar.isUpcoming) return <Badge variant="secondary">Upcoming</Badge>;
    return <Badge variant="outline">Recorded</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>Expert Webinar Series | SWENLOG</title>
        <meta name="description" content="Learn from industry experts through our comprehensive webinar series covering logistics, technology, compliance, and sustainability." />
        <meta name="keywords" content="logistics webinars, supply chain training, logistics education, industry experts, professional development" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Expert Webinar Series
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Learn from industry leaders and advance your logistics expertise
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Video className="w-4 h-4 mr-2" />
                  50+ Webinars
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  10,000+ Attendees
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Industry Experts
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="webinars" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="webinars">Webinars</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="webinars" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search webinars, speakers, or topics..."
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
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-full lg:w-48">
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === 'upcoming' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('upcoming')}
                        >
                          Upcoming
                        </Button>
                        <Button
                          variant={viewMode === 'recorded' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('recorded')}
                        >
                          Recorded
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Webinar Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWebinars.map((webinar) => (
                    <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{webinar.title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              {getStatusBadge(webinar)}
                              <Badge variant="outline">{webinar.level}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mb-4">
                          <Avatar className="w-10 h-10 mr-3">
                            <AvatarImage src={webinar.speaker.avatar} />
                            <AvatarFallback>{webinar.speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{webinar.speaker.name}</p>
                            <p className="text-xs text-gray-600">{webinar.speaker.title}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{webinar.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(webinar.date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {webinar.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              <span className="text-sm font-medium">{webinar.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({webinar.attendees})</span>
                          </div>
                          <div className="flex gap-1">
                            {webinar.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          {webinar.isLive ? (
                            <Button className="flex-1">
                              <Play className="w-4 h-4 mr-2" />
                              Join Live
                            </Button>
                          ) : webinar.isUpcoming ? (
                            <Button className="flex-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              Register
                            </Button>
                          ) : (
                            <>
                              <Button variant="outline" size="sm">
                                <Play className="w-4 h-4 mr-2" />
                                Watch
                              </Button>
                              {webinar.slidesUrl && (
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Slides
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredWebinars.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Video className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No webinars found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="series" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Webinar Series</CardTitle>
                    <CardDescription>
                      Comprehensive learning paths designed by industry experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {webinarSeries.map((series) => (
                        <Card key={series.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl font-semibold">{series.title}</h3>
                              <Badge variant="outline">{series.level}</Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{series.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {series.totalDuration}
                              </span>
                              <span className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {series.category}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3 mb-4">
                              <div className="text-sm">
                                <strong>Sample Topics:</strong>
                                <ul className="mt-1 space-y-1 text-gray-600">
                                  <li>• Introduction and fundamentals</li>
                                  <li>• Advanced techniques and strategies</li>
                                  <li>• Real-world case studies</li>
                                  <li>• Q&A with industry experts</li>
                                </ul>
                              </div>
                            </div>
                            <Button className="w-full">
                              <Play className="w-4 h-4 mr-2" />
                              Start Series
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Schedule</CardTitle>
                    <CardDescription>
                      Don't miss our upcoming webinars and live sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {webinars.filter(w => w.isUpcoming || w.isLive).map((webinar) => (
                        <div key={webinar.id} className="p-6 border rounded-lg">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{webinar.title}</h3>
                                {getStatusBadge(webinar)}
                              </div>
                              <p className="text-gray-600 mb-3">{webinar.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(webinar.date)}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {webinar.duration}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {webinar.attendees} registered
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Avatar className="w-12 h-12 mb-2">
                                <AvatarImage src={webinar.speaker.avatar} />
                                <AvatarFallback>{webinar.speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <p className="font-medium text-sm">{webinar.speaker.name}</p>
                              <p className="text-xs text-gray-600">{webinar.speaker.title}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button>
                              <Calendar className="w-4 h-4 mr-2" />
                              Add to Calendar
                            </Button>
                            <Button variant="outline">
                              <Mic className="w-4 h-4 mr-2" />
                              Set Reminder
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Webinar Guidelines</CardTitle>
                    <CardDescription>
                      Make the most of your webinar experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-blue-600 font-semibold text-sm">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Prepare in Advance</h4>
                            <p className="text-sm text-gray-600">Review the webinar description and prepare questions</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 font-semibold text-sm">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Test Your Setup</h4>
                            <p className="text-sm text-gray-600">Ensure your audio and video work properly</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-purple-600 font-semibold text-sm">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Engage Actively</h4>
                            <p className="text-sm text-gray-600">Participate in polls and ask questions during Q&A</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-orange-600 font-semibold text-sm">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Network</h4>
                            <p className="text-sm text-gray-600">Connect with other attendees and speakers</p>
                          </div>
                        </div>
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

export default ExpertWebinarSeriesPage;
