import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = "Back to Resources",
  className = ""
}) => {
  return (
    <Link to={to} className={`inline-flex items-center ${className}`}>
      <Button
        variant="secondary"
        size="sm"
        className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
      >
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
};

export default BackButton;
