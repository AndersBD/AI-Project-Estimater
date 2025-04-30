import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { SiReact, SiNodedotjs, SiPostgresql, SiExpress, SiTailwindcss, SiTypescript, SiDocker, SiGraphql } from 'react-icons/si';
import { useProject } from '@/context/ProjectContext';
import ProgressSteps from '@/components/ui/progress-steps';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, label: 'Project Setup' },
  { id: 2, label: 'Features' },
  { id: 3, label: 'Tech Stack' },
  { id: 4, label: 'Overview' },
];

// Mapping of tech stack IDs to their respective icons
const techIcons: Record<string, React.ReactNode> = {
  'react': <SiReact className="w-6 h-6" />,
  'node': <SiNodedotjs className="w-6 h-6" />,
  'postgres': <SiPostgresql className="w-6 h-6" />,
  'express': <SiExpress className="w-6 h-6" />,
  'tailwind': <SiTailwindcss className="w-6 h-6" />,
  'typescript': <SiTypescript className="w-6 h-6" />,
  'docker': <SiDocker className="w-6 h-6" />,
  'graphql': <SiGraphql className="w-6 h-6" />
};

// Mapping of tech stack categories to colors
const categoryColors: Record<string, string> = {
  'frontend': 'text-blue-400',
  'backend': 'text-green-400',
  'database': 'text-yellow-400',
  'styling': 'text-pink-400',
  'language': 'text-purple-400',
  'deployment': 'text-red-400',
  'api': 'text-cyan-400'
};

const TechStackPage: React.FC = () => {
  const [_, navigate] = useLocation();
  const { projectSetup, techStack, toggleTechStack, currentStep, setCurrentStep } = useProject();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if no project setup
    if (!projectSetup) {
      navigate('/setup');
      return;
    }
    
    setCurrentStep(2);
  }, [projectSetup, navigate, setCurrentStep]);

  const handleNext = () => {
    const selectedTechnologies = techStack.filter(tech => tech.selected);
    
    if (selectedTechnologies.length === 0) {
      toast({
        title: "No technologies selected",
        description: "Please select at least one technology for your project",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep(3);
    navigate('/overview');
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProgressSteps steps={steps} currentStep={2} />

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-slate-800 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white mb-1">AI Assistant</p>
                <div className="text-slate-300">
                  <p className="mb-3">Let's select the technologies for your project. I've recommended a tech stack based on your project type and selected features.</p>
                  <p>You can customize the selection to match your team's expertise and project requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Selection */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Select Technology Stack</h2>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {techStack.map((tech) => (
                  <div 
                    key={tech.id}
                    className={cn(
                      "flex items-center space-x-4 rounded-md border p-4",
                      tech.selected ? "border-primary-500" : "border-slate-700",
                      "hover:border-primary-400 cursor-pointer transition-colors"
                    )}
                    onClick={() => toggleTechStack(tech.id)}
                  >
                    <div className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-md border",
                      tech.selected ? "border-primary-500" : "border-slate-700",
                      "bg-slate-700"
                    )}>
                      <div className={categoryColors[tech.category] || 'text-slate-400'}>
                        {techIcons[tech.id] || tech.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{tech.name}</h3>
                        <Checkbox 
                          checked={tech.selected}
                          onCheckedChange={() => toggleTechStack(tech.id)}
                        />
                      </div>
                      <p className="text-sm text-slate-400">{tech.category.charAt(0).toUpperCase() + tech.category.slice(1)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tech stack categories explanation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="bg-slate-800 p-3 rounded-md text-center">
                <span className={cn("font-medium", color)}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pb-8">
            <Button
              onClick={() => navigate('/features')}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default TechStackPage;
