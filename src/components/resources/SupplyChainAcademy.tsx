import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, CheckCircle, Clock, Award, Users, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  modules: number;
  enrolled: number;
  rating: number;
  instructor: string;
  thumbnail: string;
  progress?: number;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading' | 'interactive';
  completed: boolean;
  locked: boolean;
}

const SupplyChainAcademy = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('courses');

  // Mock courses data
  const courses: Course[] = [
    {
      id: 'logistics-101',
      title: 'Logistics Fundamentals',
      description: 'Master the basics of logistics management, supply chain operations, and transportation strategies.',
      duration: '8 hours',
      level: 'beginner',
      category: 'Logistics',
      modules: 12,
      enrolled: 2450,
      rating: 4.8,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      completed: false
    },
    {
      id: 'international-shipping',
      title: 'International Shipping & Customs',
      description: 'Navigate global trade regulations, customs procedures, and international shipping best practices.',
      duration: '10 hours',
      level: 'intermediate',
      category: 'International Trade',
      modules: 15,
      enrolled: 1890,
      rating: 4.7,
      instructor: 'Michael Chen',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      completed: false
    },
    {
      id: 'supply-chain-optimization',
      title: 'Supply Chain Optimization',
      description: 'Learn advanced techniques for optimizing supply chain efficiency, reducing costs, and improving delivery times.',
      duration: '12 hours',
      level: 'advanced',
      category: 'Operations',
      modules: 18,
      enrolled: 1230,
      rating: 4.9,
      instructor: 'Prof. David Williams',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      completed: false
    },
    {
      id: 'warehouse-management',
      title: 'Warehouse Management Systems',
      description: 'Comprehensive guide to modern warehouse operations, inventory management, and automation technologies.',
      duration: '9 hours',
      level: 'intermediate',
      category: 'Warehousing',
      modules: 14,
      enrolled: 2100,
      rating: 4.6,
      instructor: 'Lisa Rodriguez',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      completed: false
    },
    {
      id: 'freight-forwarding',
      title: 'Freight Forwarding Essentials',
      description: 'Complete guide to freight forwarding operations, documentation, and carrier management.',
      duration: '7 hours',
      level: 'beginner',
      category: 'Freight',
      modules: 10,
      enrolled: 1780,
      rating: 4.5,
      instructor: 'James Thompson',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      completed: false
    },
    {
      id: 'risk-management',
      title: 'Supply Chain Risk Management',
      description: 'Identify, assess, and mitigate risks in global supply chains with practical strategies and tools.',
      duration: '11 hours',
      level: 'advanced',
      category: 'Risk Management',
      modules: 16,
      enrolled: 950,
      rating: 4.8,
      instructor: 'Dr. Amanda Foster',
      thumbnail: '/api/placeholder/300/200',
      progress: 0,
      completed: false
    }
  ];

  // Mock modules for selected course
  const getCourseModules = (courseId: string): Module[] => {
    const moduleTemplates = {
      'logistics-101': [
        { id: 'intro', title: 'Introduction to Logistics', description: 'Overview of logistics and supply chain management', duration: '15 min', type: 'video' as const, completed: false, locked: false },
        { id: 'transportation', title: 'Transportation Modes', description: 'Different methods of goods transportation', duration: '20 min', type: 'video' as const, completed: false, locked: true },
        { id: 'inventory', title: 'Inventory Management', description: 'Principles of inventory control', duration: '25 min', type: 'video' as const, completed: false, locked: true },
        { id: 'warehousing', title: 'Warehousing Operations', description: 'Warehouse layout and operations', duration: '18 min', type: 'video' as const, completed: false, locked: true },
        { id: 'quiz1', title: 'Logistics Basics Quiz', description: 'Test your understanding of logistics fundamentals', duration: '10 min', type: 'quiz' as const, completed: false, locked: true },
        { id: 'documentation', title: 'Shipping Documentation', description: 'Essential shipping documents and paperwork', duration: '22 min', type: 'reading' as const, completed: false, locked: true },
        { id: 'costs', title: 'Logistics Cost Management', description: 'Understanding and controlling logistics costs', duration: '20 min', type: 'video' as const, completed: false, locked: true },
        { id: 'technology', title: 'Logistics Technology', description: 'Modern tools and software in logistics', duration: '25 min', type: 'interactive' as const, completed: false, locked: true },
        { id: 'quiz2', title: 'Cost Management Quiz', description: 'Assessment of cost management concepts', duration: '15 min', type: 'quiz' as const, completed: false, locked: true },
        { id: 'case-study', title: 'Logistics Case Study', description: 'Real-world logistics optimization example', duration: '30 min', type: 'reading' as const, completed: false, locked: true },
        { id: 'final-quiz', title: 'Final Assessment', description: 'Comprehensive course assessment', duration: '20 min', type: 'quiz' as const, completed: false, locked: true },
        { id: 'certificate', title: 'Course Completion', description: 'Certificate of completion', duration: '5 min', type: 'interactive' as const, completed: false, locked: true }
      ]
    };

    return moduleTemplates[courseId as keyof typeof moduleTemplates] || [];
  };

  const handleEnroll = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      toast.success('Successfully enrolled in the course!');
    }
  };

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('learning');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'quiz': return <CheckCircle className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'interactive': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Supply Chain Academy</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Master supply chain management with our comprehensive online courses.
          Learn from industry experts and advance your career in logistics.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Available Courses</TabsTrigger>
          <TabsTrigger value="my-learning">My Learning</TabsTrigger>
          <TabsTrigger value="learning" disabled={!selectedCourse}>Course Content</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Course Categories */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer">All Courses</Badge>
            <Badge variant="outline" className="cursor-pointer">Logistics</Badge>
            <Badge variant="outline" className="cursor-pointer">International Trade</Badge>
            <Badge variant="outline" className="cursor-pointer">Operations</Badge>
            <Badge variant="outline" className="cursor-pointer">Warehousing</Badge>
            <Badge variant="outline" className="cursor-pointer">Risk Management</Badge>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-600" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.enrolled.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(course.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({course.rating})</span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <strong>Instructor:</strong> {course.instructor}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {course.modules} modules
                      </span>
                      {enrolledCourses.includes(course.id) ? (
                        <Button onClick={() => handleStartCourse(course)} size="sm">
                          Continue Learning
                        </Button>
                      ) : (
                        <Button onClick={() => handleEnroll(course.id)} size="sm">
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-learning" className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {courses.filter(course => enrolledCourses.includes(course.id)).map((course) => (
                <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleStartCourse(course)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                      <span className="text-sm text-gray-600">{course.progress || 0}% complete</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={course.progress || 0} className="w-full" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{course.modules} modules</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
              <Button onClick={() => setActiveTab('courses')}>
                Browse Courses
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          {selectedCourse && (
            <>
              {/* Course Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                      <CardDescription className="mt-2">{selectedCourse.description}</CardDescription>
                      <div className="flex items-center gap-4 mt-4">
                        <Badge className={getLevelColor(selectedCourse.level)}>{selectedCourse.level}</Badge>
                        <span className="text-sm text-gray-600">{selectedCourse.duration}</span>
                        <span className="text-sm text-gray-600">{selectedCourse.modules} modules</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{selectedCourse.progress || 0}%</div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>
                  <Progress value={selectedCourse.progress || 0} className="mt-4" />
                </CardHeader>
              </Card>

              {/* Course Modules */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>Complete all modules to earn your certificate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getCourseModules(selectedCourse.id).map((module, index) => (
                      <div
                        key={module.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          module.locked
                            ? 'bg-gray-50 border-gray-200 opacity-60'
                            : module.completed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          module.completed
                            ? 'bg-green-100 text-green-600'
                            : module.locked
                            ? 'bg-gray-100 text-gray-400'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {module.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            getModuleIcon(module.type)
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{module.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {module.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Module {index + 1}</span>
                            <span>{module.duration}</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          disabled={module.locked}
                          variant={module.completed ? "outline" : "default"}
                        >
                          {module.completed ? 'Review' : module.locked ? 'Locked' : 'Start'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Completion */}
              {(selectedCourse.progress || 0) >= 100 && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-900 mb-2">Congratulations!</h3>
                      <p className="text-green-800 mb-4">
                        You have successfully completed the {selectedCourse.title} course.
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Download Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Learning Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
            <div className="text-sm text-gray-600">Available Courses</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</div>
            <div className="text-sm text-gray-600">Courses Enrolled</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">45h</div>
            <div className="text-sm text-gray-600">Learning Time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyChainAcademy;
