import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Database, 
  Sparkles, 
  BarChart, 
  Box, 
  CheckCircle,
  Server,
  FileCode,
  CloudCog,
  Cog,
  Globe,
  Shield,
  MessageSquare,
  ShoppingCart,
  Smartphone,
  Upload
} from 'lucide-react';

interface FeatureCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  selected: boolean;
  onToggle: (id: string) => void;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  'user': <User className="w-5 h-5" />,
  'database': <Database className="w-5 h-5" />,
  'sparkles': <Sparkles className="w-5 h-5" />,
  'bar-chart': <BarChart className="w-5 h-5" />,
  'cube': <Box className="w-5 h-5" />,
  'check-circle': <CheckCircle className="w-5 h-5" />,
  'server': <Server className="w-5 h-5" />,
  'code': <FileCode className="w-5 h-5" />,
  'cloud': <CloudCog className="w-5 h-5" />,
  'settings': <Cog className="w-5 h-5" />,
  'globe': <Globe className="w-5 h-5" />,
  'shield': <Shield className="w-5 h-5" />,
  'chat': <MessageSquare className="w-5 h-5" />,
  'cart': <ShoppingCart className="w-5 h-5" />,
  'mobile': <Smartphone className="w-5 h-5" />,
  'upload': <Upload className="w-5 h-5" />
};

const categoryColorMap: Record<string, { bg: string, text: string }> = {
  'security': { bg: 'bg-primary-900', text: 'text-primary-400' },
  'infrastructure': { bg: 'bg-secondary-900', text: 'text-secondary-400' },
  'intelligence': { bg: 'bg-accent-900', text: 'text-accent-400' },
  'reporting': { bg: 'bg-green-900', text: 'text-green-400' },
  'visualization': { bg: 'bg-orange-900', text: 'text-orange-400' },
  'quality': { bg: 'bg-pink-900', text: 'text-pink-400' },
  'default': { bg: 'bg-slate-800', text: 'text-slate-400' }
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  name,
  description,
  icon,
  selected,
  onToggle,
  className,
}) => {
  // Get icon component or default
  const IconComponent = iconMap[icon] || <Cog className="w-5 h-5" />;
  
  // Get color based on icon (fallback to default)
  let category = 'default';
  if (icon === 'user') category = 'security';
  if (icon === 'database') category = 'infrastructure';
  if (icon === 'sparkles') category = 'intelligence';
  if (icon === 'bar-chart') category = 'reporting';
  if (icon === 'cube') category = 'visualization';
  if (icon === 'check-circle') category = 'quality';
  
  const { bg, text } = categoryColorMap[category];

  return (
    <div 
      className={cn(
        "bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors relative",
        selected && "border-primary-500",
        className
      )}
      onClick={() => onToggle(id)}
    >
      <Checkbox 
        checked={selected}
        className="absolute top-4 right-4"
        onCheckedChange={() => onToggle(id)}
      />
      <div className="mb-2 flex items-center">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mr-3", bg, text)}>
          {IconComponent}
        </div>
        <h3 className="font-medium text-white">{name}</h3>
      </div>
      <p className="text-sm text-slate-400 ml-11">{description}</p>
    </div>
  );
};

export default FeatureCard;
