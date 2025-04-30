import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface TimelineItemProps {
  id: string;
  index: number;
  name: string;
  duration: string;
  tasks: string[];
  color?: string;
  isLast?: boolean;
}

const colorClasses: Record<string, { bg: string, text: string }> = {
  'primary': { bg: 'bg-primary-500', text: 'text-primary-400' },
  'secondary': { bg: 'bg-secondary-500', text: 'text-secondary-400' },
  'accent': { bg: 'bg-accent-500', text: 'text-accent-400' },
  'default': { bg: 'bg-slate-600', text: 'text-slate-400' }
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  id,
  index,
  name,
  duration,
  tasks,
  color = 'default',
  isLast = false
}) => {
  const { bg, text } = colorClasses[color] || colorClasses.default;
  
  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <div className={cn("w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0", bg)}>
          {index + 1}
        </div>
        <div className="ml-3">
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-slate-400">{duration}</p>
        </div>
      </div>
      <div className={cn("pl-4 ml-4", !isLast && "border-l border-slate-700")}>
        <ul className="text-sm space-y-2 text-slate-300">
          {tasks.map((task, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon className={cn("w-4 h-4", text)} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimelineItem;
