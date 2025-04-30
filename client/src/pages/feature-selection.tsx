import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import ProgressSteps from '@/components/ui/progress-steps';
import FeatureCard from '@/components/ui/feature-card';
import Header from '@/components/layout/Header';
import TimelineItem from '@/components/ui/timeline-item';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, label: 'Project Setup' },
  { id: 2, label: 'Features' },
  { id: 3, label: 'Tech Stack' },
  { id: 4, label: 'Overview' },
];

const FeatureSelectionPage: React.FC = () => {
  const [_, navigate] = useLocation();
  const { 
    projectSetup, 
    features, 
    toggleFeature, 
    addFeature, 
    currentStep, 
    setCurrentStep,
    generateTimeline,
    timeline
  } = useProject();
  const { toast } = useToast();
  
  const [customFeature, setCustomFeature] = useState('');
  const [isGeneratingTimeline, setIsGeneratingTimeline] = useState(false);

  useEffect(() => {
    // Redirect to setup if project info is missing
    if (!projectSetup) {
      navigate('/setup');
      return;
    }
    
    setCurrentStep(1);
  }, [projectSetup, navigate, setCurrentStep]);

  const handleAddCustomFeature = () => {
    if (customFeature.trim().length < 3) {
      toast({
        title: "Feature name too short",
        description: "Please provide a longer name for your feature",
        variant: "destructive"
      });
      return;
    }

    addFeature({
      name: customFeature,
      description: `Custom feature: ${customFeature}`,
      icon: 'settings',
      category: 'custom',
      selected: true
    });

    toast({
      title: "Feature Added",
      description: `${customFeature} has been added to your project.`
    });

    setCustomFeature('');
  };

  const handleNext = async () => {
    const selectedFeatures = features.filter(f => f.selected);
    
    if (selectedFeatures.length === 0) {
      toast({
        title: "No features selected",
        description: "Please select at least one feature for your project",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingTimeline(true);
    
    try {
      await generateTimeline();
      setCurrentStep(2);
      navigate('/tech-stack');
    } catch (error) {
      toast({
        title: "Error generating timeline",
        description: "There was a problem generating your project timeline",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingTimeline(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProgressSteps steps={steps} currentStep={1} />

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
                  <p className="mb-3">Now, let's select the core features for your software project. I've pre-selected some essential features based on your initial requirements.</p>
                  <p>Please select or deselect features as needed. You can also add custom features below.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Selection */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Select Project Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {features.map(feature => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                name={feature.name}
                description={feature.description}
                icon={feature.icon}
                selected={feature.selected}
                onToggle={toggleFeature}
              />
            ))}
          </div>

          {/* Custom Feature Input */}
          <div className="bg-slate-800 rounded-lg p-4 mb-8">
            <h3 className="font-medium mb-3">Add Custom Feature</h3>
            <div className="flex gap-2">
              <Input 
                type="text" 
                placeholder="Enter custom feature name..." 
                className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomFeature()}
              />
              <Button 
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={handleAddCustomFeature}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Timeline Preview */}
          {timeline.length > 0 && (
            <div className="max-w-3xl mx-auto mb-8">
              <h2 className="text-xl font-semibold mb-4">Estimated Timeline</h2>
              <div className="bg-slate-800 rounded-lg p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium">Development Timeline</h3>
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
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pb-8">
            <Button
              onClick={() => navigate('/setup')}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-primary-500 hover:bg-primary-600 text-white"
              disabled={isGeneratingTimeline}
            >
              {isGeneratingTimeline ? "Generating Timeline..." : "Next"}
              {!isGeneratingTimeline && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default FeatureSelectionPage;
