import { apiRequest } from './queryClient';

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

export async function generateProjectPlan(projectInfo: any) {
  try {
    const response = await apiRequest('POST', '/api/generate/plan', { projectInfo });
    
    if (!response.ok) {
      throw new Error('Failed to generate project plan');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating project plan:', error);
    throw error;
  }
}

export async function generateProjectTimeline(projectInfo: any, features: any[]) {
  try {
    const response = await apiRequest('POST', '/api/generate/timeline', { 
      projectInfo, 
      features 
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate project timeline');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating project timeline:', error);
    throw error;
  }
}

export async function suggestFeatures(projectInfo: any) {
  try {
    const response = await apiRequest('POST', '/api/generate/features', {
      projectInfo
    });
    
    if (!response.ok) {
      throw new Error('Failed to suggest features');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error suggesting features:', error);
    throw error;
  }
}

export async function suggestTechStack(projectInfo: any, features: any[]) {
  try {
    const response = await apiRequest('POST', '/api/generate/tech-stack', {
      projectInfo,
      features
    });
    
    if (!response.ok) {
      throw new Error('Failed to suggest tech stack');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error suggesting tech stack:', error);
    throw error;
  }
}
