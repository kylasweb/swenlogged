import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Users, TrendingUp, Star, ThumbsUp, MessageCircle, Search, Filter, Calendar, User, Tag } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    company: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  replies: number;
  likes: number;
  isSticky?: boolean;
  isAnswered?: boolean;
}

interface DiscussionTopic {
  id: string;
  title: string;
  description: string;
  posts: number;
  lastActivity: string;
  moderator: string;
}

const ShipperCommunityForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', count: 1247 },
    { id: 'shipping', name: 'Shipping & Logistics', count: 456 },
    { id: 'compliance', name: 'Compliance & Regulations', count: 234 },
    { id: 'technology', name: 'Technology & Integration', count: 189 },
    { id: 'best-practices', name: 'Best Practices', count: 156 },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 98 },
    { id: 'general', name: 'General Discussion', count: 114 }
  ];

  const discussionTopics: DiscussionTopic[] = [
    {
      id: 'shipping-rates',
      title: 'Shipping Rate Optimization',
      description: 'Discuss strategies for optimizing shipping costs and finding the best rates',
      posts: 89,
      lastActivity: '2 hours ago',
      moderator: 'Sarah Chen'
    },
    {
      id: 'customs-clearance',
      title: 'Customs Clearance Challenges',
      description: 'Share experiences and solutions for international shipping customs issues',
      posts: 67,
      lastActivity: '4 hours ago',
      moderator: 'Mike Rodriguez'
    },
    {
      id: 'api-integration',
      title: 'API Integration Best Practices',
      description: 'Technical discussions about integrating with shipping APIs and automation',
      posts: 45,
      lastActivity: '6 hours ago',
      moderator: 'Alex Thompson'
    },
    {
      id: 'sustainability',
      title: 'Sustainable Shipping Practices',
      description: 'Discuss eco-friendly shipping options and carbon footprint reduction',
      posts: 34,
      lastActivity: '1 day ago',
      moderator: 'Emma Wilson'
    },
    {
      id: 'last-mile-delivery',
      title: 'Last Mile Delivery Solutions',
      description: 'Innovative approaches to final delivery and customer experience',
      posts: 52,
      lastActivity: '2 days ago',
      moderator: 'David Park'
    }
  ];

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Best practices for international shipping documentation',
      content: 'Looking for recommendations on managing customs documentation efficiently...',
      author: {
        name: 'John Smith',
        avatar: '/avatars/john.jpg',
        role: 'Logistics Manager',
        company: 'Global Trade Co.'
      },
      category: 'compliance',
      tags: ['documentation', 'customs', 'international'],
      createdAt: '2024-01-15T10:30:00Z',
      replies: 12,
      likes: 8,
      isAnswered: true
    },
    {
      id: '2',
      title: 'API rate limiting and optimization strategies',
      content: 'How do you handle API rate limits when processing high-volume shipments?',
      author: {
        name: 'Lisa Johnson',
        avatar: '/avatars/lisa.jpg',
        role: 'Technical Lead',
        company: 'TechShip Solutions'
      },
      category: 'technology',
      tags: ['api', 'rate-limiting', 'optimization'],
      createdAt: '2024-01-15T09:15:00Z',
      replies: 8,
      likes: 15,
      isSticky: true
    },
    {
      id: '3',
      title: 'Sustainable packaging alternatives for e-commerce',
      content: 'What eco-friendly packaging options have you tried for online orders?',
      author: {
        name: 'Mark Davis',
        avatar: '/avatars/mark.jpg',
        role: 'Operations Director',
        company: 'EcoCommerce Ltd'
      },
      category: 'best-practices',
      tags: ['sustainability', 'packaging', 'ecommerce'],
      createdAt: '2024-01-15T08:45:00Z',
      replies: 23,
      likes: 31
    },
    {
      id: '4',
      title: 'Troubleshooting delayed shipments in peak season',
      content: 'Experiencing significant delays during holiday season. Any tips?',
      author: {
        name: 'Anna Martinez',
        avatar: '/avatars/anna.jpg',
        role: 'Customer Service Manager',
        company: 'RetailPlus'
      },
      category: 'troubleshooting',
      tags: ['delays', 'peak-season', 'customer-service'],
      createdAt: '2024-01-14T16:20:00Z',
      replies: 19,
      likes: 12
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewPost = () => {
    // Here you would typically submit to backend
    console.log('New post:', { title: newPostTitle, content: newPostContent });
    setNewPostTitle('');
    setNewPostContent('');
    alert('Post created successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Shipper Community Forum | SWENLOG</title>
        <meta name="description" content="Connect with fellow logistics professionals, share experiences, and get answers to your shipping and logistics questions." />
        <meta name="keywords" content="logistics community, shipping forum, logistics professionals, shipping discussion, logistics best practices" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Shipper Community Forum
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Connect, learn, and grow with logistics professionals worldwide
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  2,847 Members
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  1,247 Discussions
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Active Community
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="new-post">New Post</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="space-y-6">
                {/* Search and Filter Bar */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search discussions, topics, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full md:w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name} ({category.count})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Forum Posts */}
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className={`cursor-pointer hover:shadow-md transition-shadow ${post.isSticky ? 'border-l-4 border-l-blue-500' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold hover:text-blue-600">{post.title}</h3>
                                {post.isSticky && <Badge variant="secondary">Sticky</Badge>}
                                {post.isAnswered && <Badge variant="outline" className="text-green-600">Answered</Badge>}
                              </div>
                              <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  {post.author.name}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <span>{post.author.company}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {post.replies}
                              </span>
                              <span className="flex items-center">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="topics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion Topics</CardTitle>
                    <CardDescription>
                      Explore popular topics and join ongoing conversations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {discussionTopics.map((topic) => (
                        <div
                          key={topic.id}
                          className="p-6 border rounded-lg cursor-pointer hover:shadow-md transition-all"
                          onClick={() => setSelectedTopic(topic.id)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">{topic.title}</h3>
                              <p className="text-gray-600 mb-3">{topic.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Moderator: {topic.moderator}</span>
                                <span>Last activity: {topic.lastActivity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">{topic.posts}</div>
                              <div className="text-sm text-gray-500">posts</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View Discussions
                            </Button>
                            <Button size="sm">
                              Join Topic
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new-post" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Discussion</CardTitle>
                    <CardDescription>
                      Start a new conversation with the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="post-title">Discussion Title</Label>
                          <Input
                            id="post-title"
                            placeholder="Enter a clear, descriptive title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="post-category">Category</Label>
                          <Select defaultValue="general">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.slice(1).map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="post-content">Content</Label>
                        <Textarea
                          id="post-content"
                          placeholder="Describe your question or topic in detail..."
                          rows={8}
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">Tags (Optional)</Label>
                      <Input placeholder="Add tags separated by commas (e.g., shipping, api, help)" />
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={handleNewPost} disabled={!newPostTitle || !newPostContent}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Create Discussion
                      </Button>
                      <Button variant="outline">
                        Save Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Posting Guidelines</CardTitle>
                    <CardDescription>
                      Help us maintain a helpful and respectful community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 font-semibold text-sm">✓</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Be Specific</h4>
                            <p className="text-sm text-gray-600">Provide detailed information about your question or issue</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 font-semibold text-sm">✓</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Use Clear Titles</h4>
                            <p className="text-sm text-gray-600">Choose descriptive titles that clearly indicate the topic</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-red-600 font-semibold text-sm">✗</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Avoid Duplicates</h4>
                            <p className="text-sm text-gray-600">Search existing discussions before creating new ones</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-red-600 font-semibold text-sm">✗</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Stay On Topic</h4>
                            <p className="text-sm text-gray-600">Keep discussions focused and relevant to logistics</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="members" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Members</CardTitle>
                    <CardDescription>
                      Connect with logistics professionals and industry experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Avatar className="w-12 h-12 mr-4">
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Sarah Chen</h3>
                            <p className="text-sm text-gray-600">Logistics Director</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Specializes in international shipping and customs compliance</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Expert</Badge>
                          <Badge variant="outline">234 posts</Badge>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Avatar className="w-12 h-12 mr-4">
                            <AvatarFallback>MR</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Mike Rodriguez</h3>
                            <p className="text-sm text-gray-600">Operations Manager</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Focus on supply chain optimization and technology integration</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Moderator</Badge>
                          <Badge variant="outline">189 posts</Badge>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Avatar className="w-12 h-12 mr-4">
                            <AvatarFallback>AT</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Alex Thompson</h3>
                            <p className="text-sm text-gray-600">Technical Lead</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">API integration specialist and automation expert</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Developer</Badge>
                          <Badge variant="outline">156 posts</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                    <CardDescription>
                      Community members who actively help others
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <Avatar className="w-10 h-10 mr-3">
                            <AvatarFallback>EW</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Emma Wilson</h3>
                            <p className="text-sm text-gray-600">Sustainability Expert</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            <span className="font-semibold">4.9</span>
                          </div>
                          <p className="text-sm text-gray-600">127 helpful replies</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <Avatar className="w-10 h-10 mr-3">
                            <AvatarFallback>DP</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">David Park</h3>
                            <p className="text-sm text-gray-600">Last Mile Specialist</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            <span className="font-semibold">4.8</span>
                          </div>
                          <p className="text-sm text-gray-600">98 helpful replies</p>
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

export default ShipperCommunityForumPage;
