import React, { useEffect, useState } from 'react';
import { shortcodeParser } from '@/utils/shortcodeParser';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type Form = {
  id: string;
  name: string;
  title: string;
  description?: string;
  fields: any[];
  submitText: string;
  successMessage: string;
  styling: {
    layout: 'vertical' | 'horizontal' | 'inline';
    theme: 'default' | 'modern' | 'minimal' | 'gradient';
    size: 'sm' | 'md' | 'lg';
    buttonStyle: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  active: boolean;
};

interface ShortcodeRendererProps {
  content: string;
  className?: string;
}

const ShortcodeRenderer: React.FC<ShortcodeRendererProps> = ({ content, className = '' }) => {
  const [forms] = useLocalStorage<Form[]>('formsData', []);
  const [ctaData] = useLocalStorage('ctaData', { enabled: false, text: '', link: '' });
  const { toast } = useToast();

  // Register shortcode handlers
  useEffect(() => {
    // Form shortcode handler
    shortcodeParser.register('form', (attributes) => {
      const formId = attributes.id;
      const form = forms.find(f => f.id === formId && f.active);
      
      if (!form) {
        return <div key={`form-${formId}`} className="p-4 border border-dashed border-muted-foreground/30 rounded text-center text-muted-foreground">
          Form not found or inactive
        </div>;
      }

      return <FormRenderer key={`form-${formId}`} form={form} />;
    });

    // CTA shortcode handler
    shortcodeParser.register('cta', (attributes) => {
      if (!ctaData.enabled) return null;

      return (
        <div key="cta" className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
          <p className="mb-2">{ctaData.text}</p>
          {ctaData.link && (
            <Button variant="secondary" asChild>
              <a href={ctaData.link}>Learn More</a>
            </Button>
          )}
        </div>
      );
    });

    // Contact shortcode handler
    shortcodeParser.register('contact', (attributes) => {
      return (
        <Card key="contact" className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Phone:</strong> +91 80476 97802 / +91 80476 97628</p>
            <p><strong>Email:</strong> info@swenlog.com</p>
            <p><strong>Address:</strong> No.2, 2nd Floor, Kodambakkam High Road, Nungambakkam, Chennai - 600034</p>
          </CardContent>
        </Card>
      );
    });

    // Social media shortcode handler
    shortcodeParser.register('social', (attributes) => {
      return (
        <div key="social" className="flex gap-4 justify-center">
          <Button variant="outline" size="sm">Facebook</Button>
          <Button variant="outline" size="sm">Twitter</Button>
          <Button variant="outline" size="sm">LinkedIn</Button>
          <Button variant="outline" size="sm">Instagram</Button>
        </div>
      );
    });

    // Newsletter shortcode handler
    shortcodeParser.register('newsletter', (attributes) => {
      return (
        <Card key="newsletter" className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Subscribe to Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      );
    });
  }, [forms, ctaData]);

  const elements = shortcodeParser.parse(content);

  return (
    <div className={className}>
      {elements.map((element, index) => {
        if (typeof element === 'string') {
          return <span key={index} dangerouslySetInnerHTML={{ __html: element }} />;
        }
        return <div key={index}>{element}</div>;
      })}
    </div>
  );
};

// Form renderer component
const FormRenderer: React.FC<{ form: Form }> = ({ form }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useLocalStorage('formSubmissions', []);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = form.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.id]);

    if (missingFields.length > 0) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      const submission = {
        id: crypto.randomUUID(),
        formId: form.id,
        formName: form.name,
        data: formData,
        submittedAt: new Date().toISOString(),
        source: window.location.pathname
      };

      setSubmissions((prev: any[]) => [...prev, submission]);
      
      toast({
        title: form.successMessage || "Form submitted successfully!"
      });

      setFormData({});
      setIsSubmitting(false);
    }, 1000);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const getThemeClasses = () => {
    const baseClasses = "p-6 rounded-lg border";
    switch (form.styling.theme) {
      case 'modern':
        return `${baseClasses} bg-gradient-to-br from-background to-muted/50 shadow-lg`;
      case 'minimal':
        return `${baseClasses} bg-background border-none shadow-sm`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-r from-primary/10 to-secondary/10`;
      default:
        return `${baseClasses} bg-background`;
    }
  };

  const getSizeClasses = () => {
    switch (form.styling.size) {
      case 'sm': return 'max-w-md';
      case 'lg': return 'max-w-2xl';
      default: return 'max-w-lg';
    }
  };

  return (
    <div className={`w-full ${getSizeClasses()} mx-auto`}>
      <div className={getThemeClasses()}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{form.title}</h3>
              {form.description && (
                <p className="text-muted-foreground mt-1">{form.description}</p>
              )}
            </div>

            <div className={`space-y-4 ${form.styling.layout === 'horizontal' ? 'grid grid-cols-2 gap-4' : ''}`}>
              {form.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <Select
                      value={formData[field.id] || ''}
                      onValueChange={(value) => handleFieldChange(field.id, value)}
                      required={field.required}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option: string, index: number) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              type="submit"
              variant={form.styling.buttonStyle as any}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Submitting...' : form.submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShortcodeRenderer;