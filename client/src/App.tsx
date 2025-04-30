import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ProjectSetup from "@/pages/project-setup";
import FeatureSelection from "@/pages/feature-selection";
import TechStack from "@/pages/tech-stack";
import ProjectOverview from "@/pages/project-overview";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "next-themes";
import { ProjectProvider } from "@/context/ProjectContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/setup" component={ProjectSetup} />
      <Route path="/features" component={FeatureSelection} />
      <Route path="/tech-stack" component={TechStack} />
      <Route path="/overview" component={ProjectOverview} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ProjectProvider>
            <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
              <Toaster />
              <Router />
            </div>
          </ProjectProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
