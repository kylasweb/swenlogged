
import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Star, TrendingUp, Award } from 'lucide-react';

type ReviewStatus = 'draft' | 'in_progress' | 'completed' | 'approved';

interface PerformanceReview {
  id: string;
  employee_id: string;
  employee_name: string;
  reviewer_id: string;
  reviewer_name: string;
  review_period_start: string;
  review_period_end: string;
  overall_rating: number; // 1-5
  goals_achievement: string;
  strengths: string;
  areas_for_improvement: string;
  comments: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

const PerformanceTab = () => {
  const [reviews, setReviews] = useLocalStorage<PerformanceReview[]>('hrmPerformanceReviews', []);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const handleSaveReview = (reviewData: Partial<PerformanceReview>) => {
    if (selectedReview) {
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, ...reviewData, updated_at: new Date().toISOString() }
          : review
      ));
      toast({ title: "Performance review updated successfully!" });
    } else {
      const newReview: PerformanceReview = {
        id: crypto.randomUUID(),
        employee_id: '',
        employee_name: '',
        reviewer_id: '',
        reviewer_name: '',
        review_period_start: '',
        review_period_end: '',
        overall_rating: 3,
        goals_achievement: '',
        strengths: '',
        areas_for_improvement: '',
        comments: '',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...reviewData
      };
      setReviews(prev => [...prev, newReview]);
      toast({ title: "Performance review created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedReview(null);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
    toast({ title: "Performance review deleted successfully!" });
  };

  const filteredReviews = reviews.filter(review => 
    filterStatus === 'all' || review.status === filterStatus
  );

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case 'completed': return 'default';
      case 'approved': return 'outline';
      case 'in_progress': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.overall_rating, 0) / reviews.length 
    : 0;

  const completedReviews = reviews.filter(review => review.status === 'completed').length;
  const pendingReviews = reviews.filter(review => review.status === 'draft' || review.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      {/* Performance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h3 className="text-lg font-semibold">Performance Reviews</h3>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setSelectedReview(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Review
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.employee_name}</TableCell>
                  <TableCell>{review.reviewer_name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(review.review_period_start).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">
                        to {new Date(review.review_period_end).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">{getRatingStars(review.overall_rating)}</div>
                      <span className="text-sm">{review.overall_rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(review.status)}>
                      {review.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedReview ? 'Edit Performance Review' : 'Add New Performance Review'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const reviewData = {
              employee_id: formData.get('employee_id') as string,
              employee_name: formData.get('employee_name') as string,
              reviewer_id: formData.get('reviewer_id') as string,
              reviewer_name: formData.get('reviewer_name') as string,
              review_period_start: formData.get('review_period_start') as string,
              review_period_end: formData.get('review_period_end') as string,
              overall_rating: Number(formData.get('overall_rating')),
              goals_achievement: formData.get('goals_achievement') as string,
              strengths: formData.get('strengths') as string,
              areas_for_improvement: formData.get('areas_for_improvement') as string,
              comments: formData.get('comments') as string,
              status: formData.get('status') as ReviewStatus,
            };
            handleSaveReview(reviewData);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee_name">Employee Name *</Label>
                <Input
                  id="employee_name"
                  name="employee_name"
                  defaultValue={selectedReview?.employee_name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  name="employee_id"
                  defaultValue={selectedReview?.employee_id || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewer_name">Reviewer Name *</Label>
                <Input
                  id="reviewer_name"
                  name="reviewer_name"
                  defaultValue={selectedReview?.reviewer_name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewer_id">Reviewer ID</Label>
                <Input
                  id="reviewer_id"
                  name="reviewer_id"
                  defaultValue={selectedReview?.reviewer_id || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review_period_start">Review Period Start</Label>
                <Input
                  id="review_period_start"
                  name="review_period_start"
                  type="date"
                  defaultValue={selectedReview?.review_period_start || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review_period_end">Review Period End</Label>
                <Input
                  id="review_period_end"
                  name="review_period_end"
                  type="date"
                  defaultValue={selectedReview?.review_period_end || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overall_rating">Overall Rating (1-5)</Label>
                <Select name="overall_rating" defaultValue={selectedReview?.overall_rating?.toString() || '3'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Below Average</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={selectedReview?.status || 'draft'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="goals_achievement">Goals Achievement</Label>
                <Textarea
                  id="goals_achievement"
                  name="goals_achievement"
                  defaultValue={selectedReview?.goals_achievement || ''}
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="strengths">Strengths</Label>
                <Textarea
                  id="strengths"
                  name="strengths"
                  defaultValue={selectedReview?.strengths || ''}
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="areas_for_improvement">Areas for Improvement</Label>
                <Textarea
                  id="areas_for_improvement"
                  name="areas_for_improvement"
                  defaultValue={selectedReview?.areas_for_improvement || ''}
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  defaultValue={selectedReview?.comments || ''}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedReview ? 'Update' : 'Create'} Review
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceTab;
