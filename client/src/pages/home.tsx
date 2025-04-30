import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, Code, Database, GitMerge } from 'lucide-react';
import { useProject } from '@/context/ProjectContext';
import Header from '@/components/layout/Header';

const Home: React.FC = () => {
  const [_, navigate] = useLocation();
  const { resetProject } = useProject();

  const handleStartNew = () => {
    resetProject();
    navigate('/setup');
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary-900/30 rounded-full">
              <Sparkles className="h-10 w-10 text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
              AI-Powered Software Development Planning
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Create professional software development plans with AI-assisted project planning, feature selection, and timeline generation.
            </p>
            <Button
              size="lg"
              onClick={handleStartNew}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              Start New Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary-900/50 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Planning</h3>
                <p className="text-slate-300">
                  Leverage OpenAI to generate comprehensive project plans, timelines, and feature recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-secondary-900/50 rounded-lg flex items-center justify-center">
                  <Code className="h-6 w-6 text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Feature Selection</h3>
                <p className="text-slate-300">
                  Customize your project by selecting from a wide range of suggested features and technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-accent-900/50 rounded-lg flex items-center justify-center">
                  <GitMerge className="h-6 w-6 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Timeline Visualization</h3>
                <p className="text-slate-300">
                  View a detailed development timeline with milestones, tasks, and estimated completion dates.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How it works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 text-center p-6 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-semibold text-white">1</span>
                </div>
                <h3 className="font-semibold mb-2">Project Setup</h3>
                <p className="text-slate-300">Define your project requirements and goals</p>
              </div>
              <div className="flex-1 text-center p-6 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-semibold text-white">2</span>
                </div>
                <h3 className="font-semibold mb-2">Select Features</h3>
                <p className="text-slate-300">Choose from AI-recommended features for your project</p>
              </div>
              <div className="flex-1 text-center p-6 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-semibold text-white">3</span>
                </div>
                <h3 className="font-semibold mb-2">Tech Stack</h3>
                <p className="text-slate-300">Select the technologies for your development project</p>
              </div>
              <div className="flex-1 text-center p-6 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-semibold text-white">4</span>
                </div>
                <h3 className="font-semibold mb-2">Project Overview</h3>
                <p className="text-slate-300">View timeline, export plan, and start development</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pb-8">
            <Button
              size="lg"
              onClick={handleStartNew}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
