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
  Images, Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, 
  Settings, Palette, Timer, Monitor, Smartphone, Tablet,
  Copy, Download, Upload, RefreshCw, Play, Pause
} from 'lucide-react';

interface Slide {
  id: string;
  sliderId?: string; // Added missing property
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle: 'primary' | 'secondary' | 'outline';
  textPosition: 'left' | 'center' | 'right';
  textColor: string;
  backgroundColor: string;
  overlayOpacity: number;
  animationType: 'fade' | 'slide' | 'zoom' | 'none';
  order: number;
  isActive: boolean;
  created_at: string;
}

interface SliderConfig {
  id: string;
  name: string;
  page: string;
  section: string;
  autoplay: boolean;
  autoplaySpeed: number;
  showDots: boolean;
  showArrows: boolean;
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  responsive: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }[];
  transition: 'slide' | 'fade' | 'cube' | 'flip';
  height: 'auto' | 'fixed';
  fixedHeight?: number;
  borderRadius: number;
  shadow: boolean;
  created_at: string;
}

const defaultSliders: SliderConfig[] = [
  {
    id: '1',
    name: 'Hero Slider',
    page: 'Home',
    section: 'Hero',
    autoplay: true,
    autoplaySpeed: 5000,
    showDots: true,
    showArrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ],
    transition: 'fade',
    height: 'fixed',
    fixedHeight: 600,
    borderRadius: 0,
    shadow: false,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Services Carousel',
    page: 'Home',
    section: 'Services',
    autoplay: false,
    autoplaySpeed: 3000,
    showDots: false,
    showArrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } }
    ],
    transition: 'slide',
    height: 'auto',
    borderRadius: 12,
    shadow: true,
    created_at: new Date().toISOString()
  }
];

const defaultSlides: Slide[] = [
  {
    id: '1',
    title: 'Global Logistics Solutions',
    subtitle: 'Your Worldwide Shipping Partner',
    description: 'Experience seamless international shipping with our comprehensive logistics network spanning over 200 countries.',
    image: '/placeholder.svg',
    imageAlt: 'Global logistics network',
    buttonText: 'Get Started',
    buttonLink: '/contact',
    buttonStyle: 'primary',
    textPosition: 'left',
    textColor: '#ffffff',
    backgroundColor: '#1e40af',
    overlayOpacity: 0.4,
    animationType: 'fade',
    order: 1,
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Air Freight Express',
    subtitle: 'Fast & Reliable',
    description: 'Time-critical shipments delivered with precision. Our air freight services ensure your cargo reaches its destination quickly and safely.',
    image: '/placeholder.svg',
    imageAlt: 'Air freight cargo plane',
    buttonText: 'Learn More',
    buttonLink: '/services/air-freight',
    buttonStyle: 'secondary',
    textPosition: 'center',
    textColor: '#ffffff',
    backgroundColor: '#dc2626',
    overlayOpacity: 0.3,
    animationType: 'slide',
    order: 2,
    isActive: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Ocean Freight Solutions',
    subtitle: 'Cost-Effective Shipping',
    description: 'Economical shipping solutions for large cargo volumes. Our ocean freight services offer competitive rates for international trade.',
    image: '/placeholder.svg',
    imageAlt: 'Container ship at sea',
    buttonText: 'View Services',
    buttonLink: '/services/ocean-freight',
    buttonStyle: 'outline',
    textPosition: 'right',
    textColor: '#ffffff',
    backgroundColor: '#059669',
    overlayOpacity: 0.5,
    animationType: 'zoom',
    order: 3,
    isActive: true,
    created_at: new Date().toISOString()
  }
];

const SliderManager = () => {
  const [sliders, setSliders] = useLocalStorage('sliders', defaultSliders);
  const [slides, setSlides] = useLocalStorage('slides', defaultSlides);
  const [activeTab, setActiveTab] = useState('sliders');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [selectedSliderId, setSelectedSliderId] = useState(sliders[0]?.id || '');
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openDialog = (item: any = null, type: 'slider' | 'slide' = 'slider') => {
    setEditingItem(item);
    setFormData(item || { 
      type, 
      id: Date.now().toString(),
      sliderId: selectedSliderId,
      ...(type === 'slider' ? {
        name: '',
        page: '',
        section: '',
        autoplay: true,
        autoplaySpeed: 5000,
        showDots: true,
        showArrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        transition: 'fade',
        height: 'auto',
        borderRadius: 8,
        shadow: true
      } : {
        title: '',
        image: '',
        imageAlt: '',
        textPosition: 'center',
        textColor: '#ffffff',
        backgroundColor: '#1e40af',
        overlayOpacity: 0.4,
        animationType: 'fade',
        buttonStyle: 'primary',
        isActive: true,
        order: slides.filter((s: any) => s.sliderId === selectedSliderId).length + 1
      })
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (formData.type === 'slider' || !formData.type) {
      if (editingItem) {
        setSliders(prev => prev.map((slider: any) => 
          slider.id === editingItem.id ? { ...formData, id: editingItem.id } : slider
        ));
        toast({ title: "Success", description: "Slider updated successfully." });
      } else {
        const newSlider = {
          ...formData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        };
        setSliders(prev => [...prev, newSlider]);
        toast({ title: "Success", description: "Slider created successfully." });
      }
    } else if (formData.type === 'slide') {
      if (editingItem) {
        setSlides(prev => prev.map((slide: any) => 
          slide.id === editingItem.id ? { ...formData, id: editingItem.id } : slide
        ));
        toast({ title: "Success", description: "Slide updated successfully." });
      } else {
        const newSlide = {
          ...formData,
          id: Date.now().toString(),
          sliderId: selectedSliderId,
          created_at: new Date().toISOString()
        };
        setSlides(prev => [...prev, newSlide]);
        toast({ title: "Success", description: "Slide added successfully." });
      }
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleDelete = (id: string, type: 'slider' | 'slide') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'slider') {
        setSliders(prev => prev.filter((slider: any) => slider.id !== id));
        // Also delete associated slides
        setSlides(prev => prev.filter((slide: any) => slide.sliderId !== id));
      } else {
        setSlides(prev => prev.filter((slide: any) => slide.id !== id));
      }
      toast({ title: "Success", description: `${type} deleted successfully.` });
    }
  };

  const moveSlide = (slideId: string, direction: 'up' | 'down') => {
    const slidesList = slides.filter((s: any) => s.sliderId === selectedSliderId).sort((a: any, b: any) => a.order - b.order);
    const slideIndex = slidesList.findIndex((s: any) => s.id === slideId);
    
    if ((direction === 'up' && slideIndex > 0) || (direction === 'down' && slideIndex < slidesList.length - 1)) {
      const newSlides = [...slides];
      const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1;
      
      // Swap orders
      const currentSlide = newSlides.find((s: any) => s.id === slidesList[slideIndex].id);
      const targetSlide = newSlides.find((s: any) => s.id === slidesList[targetIndex].id);
      
      if (currentSlide && targetSlide) {
        const tempOrder = currentSlide.order;
        currentSlide.order = targetSlide.order;
        targetSlide.order = tempOrder;
      }
      
      setSlides(newSlides);
      toast({ title: "Success", description: "Slide order updated." });
    }
  };

  const duplicateSlide = (slide: any) => {
    const newSlide = {
      ...slide,
      id: Date.now().toString(),
      title: `${slide.title} (Copy)`,
      order: slides.filter((s: any) => s.sliderId === slide.sliderId).length + 1,
      created_at: new Date().toISOString()
    };
    setSlides(prev => [...prev, newSlide]);
    toast({ title: "Success", description: "Slide duplicated successfully." });
  };

  const toggleSlideStatus = (slideId: string) => {
    setSlides(prev => prev.map((slide: any) => 
      slide.id === slideId ? { ...slide, isActive: !slide.isActive } : slide
    ));
  };

  const renderSliders = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Sliders</h3>
        <Button onClick={() => openDialog(null, 'slider')} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Slider
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders.map((slider: any) => {
          const sliderSlides = slides.filter((s: any) => s.sliderId === slider.id);
          return (
            <Card key={slider.id} className={selectedSliderId === slider.id ? 'ring-2 ring-primary' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{slider.name}</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSliderId(slider.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDialog(slider, 'slider')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(slider.id, 'slider')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  {slider.page} - {slider.section}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Slides:</span>
                    <Badge variant="outline">{sliderSlides.length}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Autoplay:</span>
                    <Badge variant={slider.autoplay ? 'default' : 'outline'}>
                      {slider.autoplay ? 'On' : 'Off'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transition:</span>
                    <Badge variant="secondary">{slider.transition}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Show:</span>
                    <span className="font-medium">{slider.slidesToShow} slides</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderSlides = () => {
    const selectedSlider = sliders.find((s: any) => s.id === selectedSliderId);
    const sliderSlides = slides.filter((s: any) => s.sliderId === selectedSliderId).sort((a: any, b: any) => a.order - b.order);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Manage Slides</h3>
            {selectedSlider && (
              <p className="text-sm text-muted-foreground">
                Editing slides for: {selectedSlider.name} ({selectedSlider.page} - {selectedSlider.section})
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <Select value={selectedSliderId} onValueChange={setSelectedSliderId}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select slider" />
              </SelectTrigger>
              <SelectContent>
                {sliders.map((slider: any) => (
                  <SelectItem key={slider.id} value={slider.id}>
                    {slider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => openDialog(null, 'slide')} size="sm" disabled={!selectedSliderId}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>
        </div>

        {selectedSliderId && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Animation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliderSlides.map((slide: any) => (
                <TableRow key={slide.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{slide.order}</span>
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSlide(slide.id, 'up')}
                          disabled={slide.order === 1}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSlide(slide.id, 'down')}
                          disabled={slide.order === sliderSlides.length}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{slide.title}</p>
                      {slide.subtitle && (
                        <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{slide.textPosition}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{slide.animationType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSlideStatus(slide.id)}
                    >
                      {slide.isActive ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDialog(slide, 'slide')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateSlide(slide)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(slide.id, 'slide')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {selectedSliderId && sliderSlides.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Images className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No slides yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first slide to this slider.
              </p>
              <Button onClick={() => openDialog(null, 'slide')}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Slide
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Slider Management</h2>
          <p className="text-muted-foreground">Create and manage sliders for different pages and sections</p>
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
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sliders">Sliders</TabsTrigger>
          <TabsTrigger value="slides">Slides</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="sliders">
          {renderSliders()}
        </TabsContent>

        <TabsContent value="slides">
          {renderSlides()}
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="p-8 text-center">
              <Monitor className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Slider Preview</h3>
              <p className="text-muted-foreground mb-4">
                Preview functionality will be implemented in the next update.
              </p>
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Preview Slider
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 
                (formData.type === 'slide' ? 'Edit Slide' : 'Edit Slider') : 
                (formData.type === 'slide' ? 'Add New Slide' : 'Create New Slider')
              }
            </DialogTitle>
            <DialogDescription>
              {formData.type === 'slide' ? 
                'Configure slide content, styling, and behavior' : 
                'Set up slider configuration and behavior settings'
              }
            </DialogDescription>
          </DialogHeader>
          
          {formData.type === 'slide' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Slide title"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Slide subtitle"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Slide description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL *</Label>
                  <Input
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="imageAlt">Image Alt Text</Label>
                  <Input
                    id="imageAlt"
                    value={formData.imageAlt || ''}
                    onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                    placeholder="Descriptive alt text"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={formData.buttonText || ''}
                      onChange={(e) => handleInputChange('buttonText', e.target.value)}
                      placeholder="Call to action"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonLink">Button Link</Label>
                    <Input
                      id="buttonLink"
                      value={formData.buttonLink || ''}
                      onChange={(e) => handleInputChange('buttonLink', e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonStyle">Button Style</Label>
                    <Select value={formData.buttonStyle || 'primary'} onValueChange={(value) => handleInputChange('buttonStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="textPosition">Text Position</Label>
                    <Select value={formData.textPosition || 'center'} onValueChange={(value) => handleInputChange('textPosition', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input
                      id="textColor"
                      type="color"
                      value={formData.textColor || '#ffffff'}
                      onChange={(e) => handleInputChange('textColor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={formData.backgroundColor || '#1e40af'}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="overlayOpacity">Overlay Opacity</Label>
                  <Input
                    id="overlayOpacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.overlayOpacity || 0.4}
                    onChange={(e) => handleInputChange('overlayOpacity', parseFloat(e.target.value))}
                  />
                  <div className="text-sm text-muted-foreground mt-1">{formData.overlayOpacity || 0.4}</div>
                </div>
                
                <div>
                  <Label htmlFor="animationType">Animation Type</Label>
                  <Select value={formData.animationType || 'fade'} onValueChange={(value) => handleInputChange('animationType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="slide">Slide</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive || false}
                    onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Slider Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Hero Slider"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="page">Page</Label>
                    <Select value={formData.page || ''} onValueChange={(value) => handleInputChange('page', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="About">About</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Contact">Contact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      value={formData.section || ''}
                      onChange={(e) => handleInputChange('section', e.target.value)}
                      placeholder="Hero, Services, etc."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoplay"
                      checked={formData.autoplay || false}
                      onCheckedChange={(checked) => handleInputChange('autoplay', checked)}
                    />
                    <Label htmlFor="autoplay">Autoplay</Label>
                  </div>
                  <div>
                    <Label htmlFor="autoplaySpeed">Autoplay Speed (ms)</Label>
                    <Input
                      id="autoplaySpeed"
                      type="number"
                      value={formData.autoplaySpeed || 5000}
                      onChange={(e) => handleInputChange('autoplaySpeed', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showDots"
                      checked={formData.showDots || false}
                      onCheckedChange={(checked) => handleInputChange('showDots', checked)}
                    />
                    <Label htmlFor="showDots">Show Dots</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showArrows"
                      checked={formData.showArrows || false}
                      onCheckedChange={(checked) => handleInputChange('showArrows', checked)}
                    />
                    <Label htmlFor="showArrows">Show Arrows</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slidesToShow">Slides to Show</Label>
                    <Input
                      id="slidesToShow"
                      type="number"
                      min="1"
                      max="6"
                      value={formData.slidesToShow || 1}
                      onChange={(e) => handleInputChange('slidesToShow', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slidesToScroll">Slides to Scroll</Label>
                    <Input
                      id="slidesToScroll"
                      type="number"
                      min="1"
                      max="6"
                      value={formData.slidesToScroll || 1}
                      onChange={(e) => handleInputChange('slidesToScroll', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="transition">Transition</Label>
                  <Select value={formData.transition || 'slide'} onValueChange={(value) => handleInputChange('transition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slide">Slide</SelectItem>
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="cube">Cube</SelectItem>
                      <SelectItem value="flip">Flip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="height">Height Mode</Label>
                  <Select value={formData.height || 'auto'} onValueChange={(value) => handleInputChange('height', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.height === 'fixed' && (
                  <div>
                    <Label htmlFor="fixedHeight">Fixed Height (px)</Label>
                    <Input
                      id="fixedHeight"
                      type="number"
                      value={formData.fixedHeight || 400}
                      onChange={(e) => handleInputChange('fixedHeight', parseInt(e.target.value))}
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="borderRadius">Border Radius (px)</Label>
                  <Input
                    id="borderRadius"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.borderRadius || 0}
                    onChange={(e) => handleInputChange('borderRadius', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="shadow"
                    checked={formData.shadow || false}
                    onCheckedChange={(checked) => handleInputChange('shadow', checked)}
                  />
                  <Label htmlFor="shadow">Drop Shadow</Label>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SliderManager;