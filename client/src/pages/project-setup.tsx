import React from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import { projectSetupSchema, type ProjectSetup } from '@shared/schema';
import ProgressSteps from '@/components/ui/progress-steps';
import Header from '@/components/layout/Header';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, label: 'Project Setup' },
  { id: 2, label: 'Features' },
  { id: 3, label: 'Tech Stack' },
  { id: 4, label: 'Overview' },
];

const ProjectSetupPage: React.FC = () => {
  const [_, navigate] = useLocation();
  const { projectSetup, setProjectSetup, setCurrentStep } = useProject();
  const { toast } = useToast();

  const form = useForm<ProjectSetup>({
    resolver: zodResolver(projectSetupSchema),
    defaultValues: projectSetup || {
      name: '',
      description: '',
      type: 'web',
      industry: '',
      teamSize: 1
    },
  });

  const onSubmit = (data: ProjectSetup) => {
    setProjectSetup(data);
    setCurrentStep(1);
    navigate('/features');
    
    toast({
      title: "Project setup completed",
      description: "Your project has been initialized. Now let's select features.",
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProgressSteps steps={steps} currentStep={0} />

        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-slate-800 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white mb-1">AI Assistant</p>
                <div className="text-slate-300">
                  <p className="mb-3">
                    Let's start by setting up your project. I'll need some basic information to help plan your software development project.
                  </p>
                  <p>
                    Please fill out the form below with your project details. This will help me generate appropriate features and timelines for your project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter project name" 
                            {...field} 
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project in detail" 
                            {...field} 
                            className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select a project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                              <SelectItem value="web">Web Application</SelectItem>
                              <SelectItem value="mobile">Mobile Application</SelectItem>
                              <SelectItem value="desktop">Desktop Application</SelectItem>
                              <SelectItem value="backend">Backend/API</SelectItem>
                              <SelectItem value="fullstack">Full Stack</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Healthcare, Finance, Education" 
                              {...field} 
                              className="bg-slate-700 border-slate-600 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="teamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1}
                            placeholder="Number of people in the team" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            className="bg-slate-700 border-slate-600 text-white w-full md:w-1/3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="bg-primary-500 hover:bg-primary-600">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default ProjectSetupPage;
