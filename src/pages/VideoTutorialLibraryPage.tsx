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
import { Progress } from '@/components/ui/progress';
import { Play, Clock, Users, Star, Search, Filter, Download, Bookmark, CheckCircle, PlayCircle, BookOpen, Award, TrendingUp } from 'lucide-react';

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    rating: number;
  };
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  views: number;
  rating: number;
  totalRatings: number;
  completionRate: number;
  lastUpdated: string;
  transcript?: string;
  resources?: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  videoCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  completionRate: number;
  videos: VideoTutorial[];
}

const VideoTutorialLibraryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'api-integration', name: 'API Integration' },
    { id: 'tracking', name: 'Shipment Tracking' },
    { id: 'compliance', name: 'Compliance & Customs' },
    { id: 'optimization', name: 'Cost Optimization' },
    { id: 'automation', name: 'Workflow Automation' },
    { id: 'analytics', name: 'Analytics & Reporting' }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: 'logistics-fundamentals',
      title: 'Logistics Fundamentals',
      description: 'Master the basics of modern logistics management',
      totalDuration: '4 hours 30 min',
      videoCount: 12,
      level: 'Beginner',
      category: 'getting-started',
      completionRate: 0,
      videos: []
    },
    {
      id: 'api-mastery',
      title: 'API Integration Mastery',
      description: 'Complete guide to integrating logistics APIs',
      totalDuration: '6 hours 15 min',
      videoCount: 18,
      level: 'Intermediate',
      category: 'api-integration',
      completionRate: 35,
      videos: []
    },
    {
      id: 'advanced-optimization',
      title: 'Advanced Cost Optimization',
      description: 'Advanced techniques for maximizing logistics efficiency',
      totalDuration: '5 hours 45 min',
      videoCount: 15,
      level: 'Advanced',
      category: 'optimization',
      completionRate: 0,
      videos: []
    }
  ];

  const videoTutorials: VideoTutorial[] = [
    {
      id: '1',
      title: 'Getting Started with Swenlog Platform',
      description: 'Complete walkthrough of the Swenlog dashboard and core features',
      instructor: {
        name: 'Sarah Chen',
        title: 'Product Manager',
        avatar: '/instructors/sarah-chen.jpg',
        rating: 4.9
      },
      duration: '15:30',
      level: 'Beginner',
      category: 'getting-started',
      tags: ['onboarding', 'dashboard', 'basics'],
      thumbnail: '/thumbnails/getting-started.jpg',
      videoUrl: '/videos/getting-started.mp4',
      views: 12543,
      rating: 4.8,
      totalRatings: 234,
      completionRate: 89,
      lastUpdated: '2024-01-15',
      transcript: '/transcripts/getting-started.txt',
      resources: ['Quick Start Guide', 'API Documentation', 'Sample Code']
    },
    {
      id: '2',
      title: 'API Authentication & Security',
      description: 'Learn how to securely authenticate and authorize API requests',
      instructor: {
        name: 'Mike Rodriguez',
        title: 'Security Engineer',
        avatar: '/instructors/mike-rodriguez.jpg',
        rating: 4.8
      },
      duration: '22:45',
      level: 'Intermediate',
      category: 'api-integration',
      tags: ['authentication', 'security', 'api-keys'],
      thumbnail: '/thumbnails/api-auth.jpg',
      videoUrl: '/videos/api-auth.mp4',
      views: 8921,
      rating: 4.7,
      totalRatings: 156,
      completionRate: 92,
      lastUpdated: '2024-01-12',
      transcript: '/transcripts/api-auth.txt',
      resources: ['Security Best Practices', 'API Reference', 'Code Examples']
    },
    {
      id: '3',
      title: 'Real-time Shipment Tracking Implementation',
      description: 'Implement advanced tracking features with webhooks and APIs',
      instructor: {
        name: 'David Park',
        title: 'Solutions Architect',
        avatar: '/instructors/david-park.jpg',
        rating: 4.9
      },
      duration: '28:15',
      level: 'Advanced',
      category: 'tracking',
      tags: ['tracking', 'webhooks', 'real-time'],
      thumbnail: '/thumbnails/tracking.jpg',
      videoUrl: '/videos/tracking.mp4',
      views: 15678,
      rating: 4.9,
      totalRatings: 312,
      completionRate: 87,
      lastUpdated: '2024-01-10',
      transcript: '/transcripts/tracking.txt',
      resources: ['Webhook Documentation', 'Tracking API Guide', 'Sample Implementation']
    },
    {
      id: '4',
      title: 'Customs Compliance Automation',
      description: 'Automate customs documentation and compliance processes',
      instructor: {
        name: 'Anna Martinez',
        title: 'Compliance Specialist',
        avatar: '/instructors/anna-martinez.jpg',
        rating: 4.7
      },
      duration: '19:20',
      level: 'Intermediate',
      category: 'compliance',
      tags: ['customs', 'compliance', 'automation'],
      thumbnail: '/thumbnails/customs.jpg',
      videoUrl: '/videos/customs.mp4',
      views: 7834,
      rating: 4.6,
      totalRatings: 198,
      completionRate: 91,
      lastUpdated: '2024-01-08',
      transcript: '/transcripts/customs.txt',
      resources: ['Compliance Checklist', 'Customs API Docs', 'Regulatory Guide']
    },
    {
      id: '5',
      title: 'Cost Optimization Strategies',
      description: 'Advanced techniques for reducing shipping costs and improving margins',
      instructor: {
        name: 'Robert Kim',
        title: 'Optimization Expert',
        avatar: '/instructors/robert-kim.jpg',
        rating: 4.8
      },
      duration: '25:40',
      level: 'Advanced',
      category: 'optimization',
      tags: ['cost-optimization', 'pricing', 'negotiation'],
      thumbnail: '/thumbnails/optimization.jpg',
      videoUrl: '/videos/optimization.mp4',
      views: 11256,
      rating: 4.8,
      totalRatings: 267,
      completionRate: 85,
      lastUpdated: '2024-01-05',
      transcript: '/transcripts/optimization.txt',
      resources: ['Cost Analysis Template', 'Negotiation Guide', 'ROI Calculator']
    },
    {
      id: '6',
      title: 'Workflow Automation with Zapier',
      description: 'Connect Swenlog with thousands of apps using Zapier integration',
      instructor: {
        name: 'Lisa Johnson',
        title: 'Automation Specialist',
        avatar: '/instructors/lisa-johnson.jpg',
        rating: 4.6
      },
      duration: '18:55',
      level: 'Beginner',
      category: 'automation',
      tags: ['zapier', 'automation', 'integration'],
      thumbnail: '/thumbnails/zapier.jpg',
      videoUrl: '/videos/zapier.mp4',
      views: 6789,
      rating: 4.5,
      totalRatings: 145,
      completionRate: 88,
      lastUpdated: '2024-01-03',
      transcript: '/transcripts/zapier.txt',
      resources: ['Zapier Templates', 'Integration Guide', 'Workflow Examples']
    }
  ];

  const filteredVideos = videoTutorials.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || video.level === selectedLevel;
    const matchesSearch = searchQuery === '' ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      video.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Video Tutorial Library | SWENLOG</title>
        <meta name="description" content="Comprehensive video tutorials covering logistics management, API integration, compliance, and optimization strategies." />
        <meta name="keywords" content="logistics tutorials, video training, API integration, logistics education, shipping tutorials, logistics software training" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Video Tutorial Library
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                Master logistics technology with expert-led video tutorials
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  150+ Tutorials
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  50+ Hours Content
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Expert Instructors
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="tutorials" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
                <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
                <TabsTrigger value="my-progress">My Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="tutorials" className="space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search tutorials, instructors, or topics..."
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
                          <SelectValue />
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
                          variant={viewMode === 'grid' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                        >
                          Grid
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                        >
                          List
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                      <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative">
                          <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                            <Play className="w-12 h-12 text-gray-400" />
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge className={getLevelColor(video.level)}>{video.level}</Badge>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="secondary">{video.duration}</Badge>
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                          <div className="flex items-center mb-3">
                            <Avatar className="w-8 h-8 mr-3">
                              <AvatarImage src={video.instructor.avatar} />
                              <AvatarFallback>{video.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{video.instructor.name}</p>
                              <p className="text-xs text-gray-600">{video.instructor.title}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              {video.rating} ({video.totalRatings})
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {video.views.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Watch
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredVideos.map((video) => (
                      <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="relative w-48 h-28 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Play className="w-8 h-8 text-gray-400" />
                              <div className="absolute top-1 right-1">
                                <Badge className={getLevelColor(video.level)}>{video.level}</Badge>
                              </div>
                              <div className="absolute bottom-1 left-1">
                                <Badge variant="secondary">{video.duration}</Badge>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                              <p className="text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center">
                                  <Avatar className="w-6 h-6 mr-2">
                                    <AvatarImage src={video.instructor.avatar} />
                                    <AvatarFallback>{video.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  {video.instructor.name}
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                  {video.rating}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {video.views.toLocaleString()} views
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-2" />
                                  Watch Now
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Transcript
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {filteredVideos.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <PlayCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No tutorials found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="learning-paths" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Structured Learning Paths</CardTitle>
                    <CardDescription>
                      Follow comprehensive learning journeys designed by experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {learningPaths.map((path) => (
                        <Card key={path.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl font-semibold">{path.title}</h3>
                              <Badge className={getLevelColor(path.level)}>{path.level}</Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{path.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Duration:</span>
                                <span className="font-medium">{path.totalDuration}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Videos:</span>
                                <span className="font-medium">{path.videoCount}</span>
                              </div>
                              {path.completionRate > 0 && (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress:</span>
                                    <span className="font-medium">{path.completionRate}%</span>
                                  </div>
                                  <Progress value={path.completionRate} className="h-2" />
                                </div>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button className="w-full">
                              {path.completionRate > 0 ? 'Continue Learning' : 'Start Learning Path'}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="my-progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Learning Progress</CardTitle>
                    <CardDescription>
                      Track your progress and continue where you left off
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Continue Watching</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                <Play className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">API Authentication & Security</h4>
                                <p className="text-sm text-gray-600 mb-2">Progress: 65%</p>
                                <Progress value={65} className="h-2 mb-2" />
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-2" />
                                  Resume
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                <Play className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">Real-time Shipment Tracking</h4>
                                <p className="text-sm text-gray-600 mb-2">Progress: 30%</p>
                                <Progress value={30} className="h-2 mb-2" />
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-2" />
                                  Resume
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Completed Tutorials</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">Getting Started with Swenlog</h4>
                                <p className="text-sm text-gray-600">Completed on Jan 15, 2024</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">Customs Compliance Basics</h4>
                                <p className="text-sm text-gray-600">Completed on Jan 12, 2024</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Statistics</CardTitle>
                    <CardDescription>
                      Your learning progress and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">12</div>
                        <div className="text-sm text-gray-600">Videos Watched</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">8</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-2">4</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-2">24h</div>
                        <div className="text-sm text-gray-600">Watch Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended for You</CardTitle>
                    <CardDescription>
                      Personalized tutorial recommendations based on your progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Advanced API Integration</h4>
                        <p className="text-sm text-gray-600 mb-3">Since you completed API basics</p>
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Cost Optimization Strategies</h4>
                        <p className="text-sm text-gray-600 mb-3">Based on your industry</p>
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Workflow Automation</h4>
                        <p className="text-sm text-gray-600 mb-3">Popular in your category</p>
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Now
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

export default VideoTutorialLibraryPage;
