
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_range?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  category: string;
  is_active: boolean;
  application_deadline?: string;
  created_at: string;
}

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Positions' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'branding', label: 'Branding' },
    { value: 'operations', label: 'Operations' },
    { value: 'technology', label: 'Technology' }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = selectedCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      'logistics': 'bg-blue-100 text-blue-800',
      'digital-marketing': 'bg-green-100 text-green-800',
      'branding': 'bg-purple-100 text-purple-800',
      'operations': 'bg-orange-100 text-orange-800',
      'technology': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Join Our Team</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Build your career with a leading logistics company. We're looking for passionate individuals who want to shape the future of global supply chain solutions.
              </p>
            </div>

            {/* Category Filter */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="mt-16">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading opportunities...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No positions available</h3>
                  <p className="text-gray-600">
                    {selectedCategory === 'all' 
                      ? "We don't have any open positions at the moment. Check back soon!"
                      : `No positions available in ${categories.find(c => c.value === selectedCategory)?.label}. Try viewing all positions.`
                    }
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category.replace('-', ' ').toUpperCase()}
                          </Badge>
                          {job.application_deadline && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(job.application_deadline) > new Date() ? (
                                <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                              ) : (
                                <span className="text-red-500">Deadline passed</span>
                              )}
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {job.department}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {job.location}
                          </div>
                          {job.salary_range && (
                            <div className="flex items-center text-sm">
                              <DollarSign className="w-4 h-4 mr-2" />
                              {job.salary_range}
                            </div>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3 mb-4">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{job.employment_type}</span> • {job.experience_level}
                          </div>
                          <Link to={`/careers/apply/${job.id}`}>
                            <Button size="sm">Apply Now</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Why Join Us Section */}
            <div className="mt-24 border-t border-gray-200 pt-16">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">Why Work With Us?</h3>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We believe in fostering a culture of innovation, growth, and collaboration.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Growth</h4>
                  <p className="text-gray-600">Clear career paths and opportunities for advancement in a growing industry.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Impact</h4>
                  <p className="text-gray-600">Work on projects that connect businesses worldwide and impact global trade.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Competitive Benefits</h4>
                  <p className="text-gray-600">Comprehensive benefits package including health, dental, vision, and 401(k).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CareersPage;
