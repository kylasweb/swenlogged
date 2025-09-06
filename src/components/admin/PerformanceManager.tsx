
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, TrendingUp, Star } from 'lucide-react';

interface PerformanceReview {
  id: string;
  employee_id: string;
  reviewer_id: string;
  review_period_start: string;
  review_period_end: string;
  overall_rating?: number;
  goals_achievement?: string;
  strengths?: string;
  areas_for_improvement?: string;
  comments?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const PerformanceManager = () => {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingReview, setEditingReview] = useState<PerformanceReview | null>(null);
  const [formData, setFormData] = useState({
    employee_id: '',
    review_period_start: '',
    review_period_end: '',
    overall_rating: '',
    goals_achievement: '',
    strengths: '',
    areas_for_improvement: '',
    comments: '',
    status: 'draft'
  });
  const { toast } = useToast();

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    completed: 'bg-green-100 text-green-800',
    reviewed: 'bg-blue-100 text-blue-800'
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('performance_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching performance reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch performance reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reviewData = {
        employee_id: formData.employee_id,
        reviewer_id: '00000000-0000-0000-0000-000000000000', // Should be current admin user
        review_period_start: formData.review_period_start,
        review_period_end: formData.review_period_end,
        overall_rating: formData.overall_rating ? parseInt(formData.overall_rating) : null,
        goals_achievement: formData.goals_achievement || null,
        strengths: formData.strengths || null,
        areas_for_improvement: formData.areas_for_improvement || null,
        comments: formData.comments || null,
        status: formData.status
      };

      if (editingReview) {
        const { error } = await supabase
          .from('performance_reviews')
          .update(reviewData)
          .eq('id', editingReview.id);

        if (error) throw error;
        toast({
          title: "Success!",
          description: "Performance review updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('performance_reviews')
          .insert([reviewData]);

        if (error) throw error;
        toast({
          title: "Success!",
          description: "Performance review created successfully",
        });
      }

      setShowDialog(false);
      setEditingReview(null);
      setFormData({
        employee_id: '',
        review_period_start: '',
        review_period_end: '',
        overall_rating: '',
        goals_achievement: '',
        strengths: '',
        areas_for_improvement: '',
        comments: '',
        status: 'draft'
      });
      fetchReviews();
    } catch (error) {
      console.error('Error saving performance review:', error);
      toast({
        title: "Error",
        description: "Failed to save performance review",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (review: PerformanceReview) => {
    setEditingReview(review);
    setFormData({
      employee_id: review.employee_id,
      review_period_start: review.review_period_start,
      review_period_end: review.review_period_end,
      overall_rating: review.overall_rating?.toString() || '',
      goals_achievement: review.goals_achievement || '',
      strengths: review.strengths || '',
      areas_for_improvement: review.areas_for_improvement || '',
      comments: review.comments || '',
      status: review.status
    });
    setShowDialog(true);
  };

  const handleAddNew = () => {
    setEditingReview(null);
    setFormData({
      employee_id: '',
      review_period_start: '',
      review_period_end: '',
      overall_rating: '',
      goals_achievement: '',
      strengths: '',
      areas_for_improvement: '',
      comments: '',
      status: 'draft'
    });
    setShowDialog(true);
  };

  const getAverageRating = () => {
    const completedReviews = reviews.filter(r => r.overall_rating);
    if (completedReviews.length === 0) return 0;
    const sum = completedReviews.reduce((acc, r) => acc + (r.overall_rating || 0), 0);
    return (sum / completedReviews.length).toFixed(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading performance reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Performance Management</h2>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getAverageRating()}/5</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(r => r.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Review Period</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>Employee {review.employee_id.substring(0, 8)}</TableCell>
                <TableCell>
                  {new Date(review.review_period_start).toLocaleDateString()} - 
                  {new Date(review.review_period_end).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {review.overall_rating ? (
                    <div className="flex items-center gap-1">
                      {renderStars(review.overall_rating)}
                      <span className="ml-1 text-sm">({review.overall_rating})</span>
                    </div>
                  ) : (
                    'Not rated'
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[review.status as keyof typeof statusColors]}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(review)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingReview ? 'Edit Performance Review' : 'New Performance Review'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  value={formData.employee_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, employee_id: e.target.value }))}
                  placeholder="Employee UUID"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="overall_rating">Overall Rating (1-5)</Label>
                <Select value={formData.overall_rating} onValueChange={(value) => setFormData(prev => ({ ...prev, overall_rating: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>{rating} Star{rating > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="review_period_start">Review Period Start</Label>
                <Input
                  id="review_period_start"
                  type="date"
                  value={formData.review_period_start}
                  onChange={(e) => setFormData(prev => ({ ...prev, review_period_start: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="review_period_end">Review Period End</Label>
                <Input
                  id="review_period_end"
                  type="date"
                  value={formData.review_period_end}
                  onChange={(e) => setFormData(prev => ({ ...prev, review_period_end: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="goals_achievement">Goals Achievement</Label>
              <Textarea
                id="goals_achievement"
                value={formData.goals_achievement}
                onChange={(e) => setFormData(prev => ({ ...prev, goals_achievement: e.target.value }))}
                rows={3}
                placeholder="How well did the employee achieve their goals?"
              />
            </div>

            <div>
              <Label htmlFor="strengths">Strengths</Label>
              <Textarea
                id="strengths"
                value={formData.strengths}
                onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
                rows={3}
                placeholder="Employee's key strengths and accomplishments"
              />
            </div>

            <div>
              <Label htmlFor="areas_for_improvement">Areas for Improvement</Label>
              <Textarea
                id="areas_for_improvement"
                value={formData.areas_for_improvement}
                onChange={(e) => setFormData(prev => ({ ...prev, areas_for_improvement: e.target.value }))}
                rows={3}
                placeholder="Areas where the employee can improve"
              />
            </div>

            <div>
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                rows={3}
                placeholder="Any additional feedback or comments"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingReview ? 'Update' : 'Create'} Review
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceManager;
