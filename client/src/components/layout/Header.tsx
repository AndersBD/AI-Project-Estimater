import React from 'react';
import { Link } from 'wouter';
import { Sparkles, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProject } from '@/context/ProjectContext';

const Header: React.FC = () => {
  const { projectSetup } = useProject();

  return (
    <header className="border-b border-slate-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">AI Software Developer</h1>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">
            {projectSetup?.name?.substring(0, 2).toUpperCase() || 'AI'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
