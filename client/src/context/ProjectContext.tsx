import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  type ProjectSetup, 
  type Feature, 
  type TechStackItem, 
  type TimelineItem 
} from '@shared/schema';
import { v4 as uuidv4 } from 'uuid';

interface ProjectContextType {
  // Project setup data
  projectSetup: ProjectSetup | null;
  setProjectSetup: (setup: ProjectSetup) => void;
  
  // Features
  features: Feature[];
  setFeatures: (features: Feature[]) => void;
  addFeature: (feature: Omit<Feature, 'id'>) => void;
  toggleFeature: (id: string) => void;
  
  // Tech stack
  techStack: TechStackItem[];
  setTechStack: (stack: TechStackItem[]) => void;
  toggleTechStack: (id: string) => void;
  
  // Timeline
  timeline: TimelineItem[];
  setTimeline: (timeline: TimelineItem[]) => void;
  
  // Steps
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  // Generate methods
  generateTimeline: () => Promise<void>;
  
  // Reset method
  resetProject: () => void;
}

// Default features
const defaultFeatures: Feature[] = [
  {
    id: 'auth',
    name: 'User Authentication',
    description: 'Secure login, registration, and user profile management',
    icon: 'user',
    category: 'security',
    selected: true
  },
  {
    id: 'database',
    name: 'Database Integration',
    description: 'PostgreSQL integration for persistent storage of application data',
    icon: 'database',
    category: 'infrastructure',
    selected: true
  },
  {
    id: 'ai',
    name: 'AI Integration',
    description: 'OpenAI API integration for intelligent text and code generation',
    icon: 'sparkles',
    category: 'intelligence',
    selected: true
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Visualize project metrics and performance data',
    icon: 'bar-chart',
    category: 'reporting',
    selected: true
  },
  {
    id: '3d',
    name: '3D Visualization',
    description: 'Interactive 3D visualization of project components and designs',
    icon: 'cube',
    category: 'visualization',
    selected: false
  },
  {
    id: 'testing',
    name: 'Automated Testing',
    description: 'Integrated testing framework for quality assurance',
    icon: 'check-circle',
    category: 'quality',
    selected: false
  }
];

// Default tech stack items
const defaultTechStack: TechStackItem[] = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    icon: 'react',
    selected: true
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'backend',
    icon: 'server',
    selected: true
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'database',
    icon: 'database',
    selected: true
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    icon: 'server',
    selected: true
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'styling',
    icon: 'paintbrush',
    selected: true
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'language',
    icon: 'code',
    selected: true
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'deployment',
    icon: 'box',
    selected: false
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'api',
    icon: 'git-merge',
    selected: false
  }
];

// Default timeline
const defaultTimeline: TimelineItem[] = [];

// Create context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [projectSetup, setProjectSetup] = useState<ProjectSetup | null>(null);
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);
  const [techStack, setTechStack] = useState<TechStackItem[]>(defaultTechStack);
  const [timeline, setTimeline] = useState<TimelineItem[]>(defaultTimeline);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Add a feature
  const addFeature = (feature: Omit<Feature, 'id'>) => {
    const newFeature: Feature = {
      id: uuidv4(),
      ...feature,
    };
    setFeatures([...features, newFeature]);
  };

  // Toggle feature selection
  const toggleFeature = (id: string) => {
    setFeatures(
      features.map(feature => 
        feature.id === id ? { ...feature, selected: !feature.selected } : feature
      )
    );
  };

  // Toggle tech stack selection
  const toggleTechStack = (id: string) => {
    setTechStack(
      techStack.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Generate timeline using OpenAI
  const generateTimeline = async () => {
    if (!projectSetup) return;

    try {
      const selectedFeatures = features.filter(f => f.selected);
      
      // Import the OpenAI functions from the library
      const { generateProjectTimeline } = await import('@/lib/openai');

      // Call the API using our library function
      const data = await generateProjectTimeline(projectSetup, selectedFeatures);
      
      if (data.timeline && Array.isArray(data.timeline)) {
        setTimeline(data.timeline);
      } else {
        // Fallback timeline if API doesn't return expected format
        setTimeline([
          {
            id: '1',
            name: 'Project Setup & Planning',
            duration: '1 week',
            order: 1,
            tasks: [
              'Requirements gathering and analysis',
              'Project architecture design',
              'Development environment setup'
            ],
            color: 'primary'
          },
          {
            id: '2',
            name: 'Core Development',
            duration: '3 weeks',
            order: 2,
            tasks: [
              'Backend API development',
              'Database integration',
              'User authentication implementation'
            ],
            color: 'secondary'
          },
          {
            id: '3',
            name: 'Feature Implementation',
            duration: '2 weeks',
            order: 3,
            tasks: [
              'AI integration',
              'UI development',
              'Analytics dashboard implementation'
            ],
            color: 'accent'
          },
          {
            id: '4',
            name: 'Testing & Deployment',
            duration: '2 weeks',
            order: 4,
            tasks: [
              'Quality assurance testing',
              'Performance optimization',
              'Deployment and documentation'
            ]
          }
        ]);
      }
    } catch (error) {
      console.error('Error generating timeline:', error);
      // Set fallback timeline
      setTimeline([
        {
          id: '1',
          name: 'Project Setup & Planning',
          duration: '1 week',
          order: 1,
          tasks: [
            'Requirements gathering and analysis',
            'Project architecture design',
            'Development environment setup'
          ],
          color: 'primary'
        },
        {
          id: '2',
          name: 'Core Development',
          duration: '3 weeks',
          order: 2,
          tasks: [
            'Backend API development',
            'Database integration',
            'User authentication implementation'
          ],
          color: 'secondary'
        },
        {
          id: '3',
          name: 'Feature Implementation',
          duration: '2 weeks',
          order: 3,
          tasks: [
            'AI integration',
            'UI development',
            'Analytics dashboard implementation'
          ],
          color: 'accent'
        },
        {
          id: '4',
          name: 'Testing & Deployment',
          duration: '2 weeks',
          order: 4,
          tasks: [
            'Quality assurance testing',
            'Performance optimization',
            'Deployment and documentation'
          ]
        }
      ]);
    }
  };

  // Reset project data
  const resetProject = () => {
    setProjectSetup(null);
    setFeatures(defaultFeatures);
    setTechStack(defaultTechStack);
    setTimeline([]);
    setCurrentStep(0);
  };

  return (
    <ProjectContext.Provider value={{
      projectSetup,
      setProjectSetup,
      features,
      setFeatures,
      addFeature,
      toggleFeature,
      techStack,
      setTechStack,
      toggleTechStack,
      timeline,
      setTimeline,
      currentStep,
      setCurrentStep,
      generateTimeline,
      resetProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Hook for using the project context
export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
