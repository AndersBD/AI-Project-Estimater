import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import ProgressSteps from '@/components/ui/progress-steps';
import TimelineItem from '@/components/ui/timeline-item';
import Header from '@/components/layout/Header';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, label: 'Project Setup' },
  { id: 2, label: 'Features' },
  { id: 3, label: 'Tech Stack' },
  { id: 4, label: 'Overview' },
];

const ProjectOverviewPage: React.FC = () => {
  const [_, navigate] = useLocation();
  const { 
    projectSetup, 
    features, 
    techStack, 
    timeline, 
    currentStep, 
    setCurrentStep,
    resetProject
  } = useProject();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const selectedFeatures = features.filter(f => f.selected);
  const selectedTechStack = techStack.filter(t => t.selected);

  useEffect(() => {
    // Redirect if no project setup
    if (!projectSetup) {
      navigate('/setup');
      return;
    }
    
    setCurrentStep(3);
  }, [projectSetup, navigate, setCurrentStep]);

  const exportProjectPlan = () => {
    setIsExporting(true);

    try {
      // Prepare project data
      const projectData = {
        project: projectSetup,
        features: selectedFeatures,
        technologies: selectedTechStack,
        timeline: timeline,
        generatedAt: new Date().toISOString()
      };
      
      // Create file content
      const fileContent = JSON.stringify(projectData, null, 2);
      const blob = new Blob([fileContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectSetup?.name.replace(/\s+/g, '_')}_project_plan.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Export Successful",
        description: "Your project plan has been exported as JSON",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your project plan",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const startNewProject = () => {
    resetProject();
    navigate('/');
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProgressSteps steps={steps} currentStep={3} />

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
                  <p className="mb-3">Great job! I've prepared a comprehensive overview of your project based on your selections.</p>
                  <p>You can review the details below and export the plan to start your development process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Project Overview</h2>
            <Button 
              variant="outline" 
              className="bg-primary-600 hover:bg-primary-700 text-white border-primary-500"
              onClick={exportProjectPlan}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export Plan"}
              {!isExporting && <Download className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          {/* Project Info */}
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3">Project Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Name:</span>
                  <span className="font-medium">{projectSetup?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="font-medium capitalize">{projectSetup?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Industry:</span>
                  <span className="font-medium">{projectSetup?.industry || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Team Size:</span>
                  <span className="font-medium">{projectSetup?.teamSize} developer{projectSetup?.teamSize !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <Separator className="my-4 bg-slate-700" />

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-slate-300">{projectSetup?.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Selected Features */}
          <h3 className="text-lg font-medium mb-3">Selected Features</h3>
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFeatures.map(feature => (
                  <div key={feature.id} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Tech Stack */}
          <h3 className="text-lg font-medium mb-3">Technology Stack</h3>
          <Card className="bg-slate-800 border-slate-700 mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {selectedTechStack.map(tech => (
                  <div 
                    key={tech.id} 
                    className="bg-slate-700 rounded-full px-3 py-1 text-sm flex items-center gap-1"
                  >
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <h3 className="text-lg font-medium mb-3">Development Timeline</h3>
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-medium">Timeline</h4>
                <div className="text-sm text-slate-400">
                  Est. completion: {timeline.length * 2} weeks
                </div>
              </div>
              
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    name={item.name}
                    duration={item.duration}
                    tasks={item.tasks}
                    color={item.color}
                    isLast={index === timeline.length - 1}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Visualization */}
          <h3 className="text-lg font-medium mb-3">Project Visualization</h3>
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SVG visualizations */}
                <div className="bg-slate-700 rounded-lg overflow-hidden h-48 flex items-center justify-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-primary-400">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    <path d="M12 10v8"></path>
                    <path d="M8 12v3"></path>
                    <path d="M16 12v3"></path>
                    <ellipse cx="12" cy="6.5" rx="4" ry="1.5"></ellipse>
                  </svg>
                </div>
                <div className="bg-slate-700 rounded-lg overflow-hidden h-48 flex items-center justify-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-accent-400">
                    <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8v4"></path>
                    <polyline points="17 17 12 12 7 17"></polyline>
                    <line x1="12" y1="12" x2="12" y2="21"></line>
                    <circle cx="12" cy="3" r="1"></circle>
                    <circle cx="19" cy="10" r="1"></circle>
                    <circle cx="5" cy="10" r="1"></circle>
                    <circle cx="12" cy="17" r="1"></circle>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between pb-8">
            <Button
              onClick={() => navigate('/tech-stack')}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={startNewProject}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              Start New Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectOverviewPage;
