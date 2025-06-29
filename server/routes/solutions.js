import express from 'express';
import { mockSolutionsData } from '../data/mockSolutions.js';

const router = express.Router();

// Mock AI solution discovery endpoint
router.post('/find', async (req, res) => {
  try {
    const { problem, userId } = req.body;

    if (!problem || typeof problem !== 'string' || problem.trim().length < 10) {
      return res.status(400).json({ 
        error: 'Please provide a detailed problem description (at least 10 characters)' 
      });
    }

    // Simulate processing time for realistic UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get relevant solutions based on problem keywords
    const solutions = getSolutionsForProblem(problem.toLowerCase());

    // Log search for analytics (in real app, save to database)
    console.log(`🔍 Search performed: "${problem}" by user: ${userId || 'anonymous'}`);

    res.json({
      success: true,
      problem: problem.trim(),
      solutions: solutions,
      searchId: generateSearchId(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in /find endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to find solutions. Please try again.' 
    });
  }
});

// Helper function to match problems with relevant solutions
function getSolutionsForProblem(problemText) {
  const keywords = problemText.split(' ').map(word => word.toLowerCase());
  
  // Define keyword mappings to solution categories
  const categoryMappings = {
    project: ['project-management', 'productivity'],
    task: ['project-management', 'productivity'],
    team: ['project-management', 'collaboration'],
    discord: ['discord-bots', 'communication'],
    bot: ['discord-bots', 'automation'],
    monitor: ['monitoring', 'automation'],
    code: ['development-tools', 'productivity'],
    ai: ['ai-tools', 'development-tools'],
    design: ['design-tools', 'creativity'],
    marketing: ['marketing-tools', 'business'],
    analytics: ['analytics-tools', 'business'],
    database: ['development-tools', 'backend'],
    frontend: ['development-tools', 'frontend'],
    backend: ['development-tools', 'backend']
  };

  // Find matching categories
  const matchedCategories = new Set();
  keywords.forEach(keyword => {
    if (categoryMappings[keyword]) {
      categoryMappings[keyword].forEach(cat => matchedCategories.add(cat));
    }
  });

  // If no specific matches, return general productivity tools
  if (matchedCategories.size === 0) {
    matchedCategories.add('productivity');
    matchedCategories.add('general');
  }

  // Get solutions from matched categories
  const solutions = [];
  Object.entries(mockSolutionsData).forEach(([category, items]) => {
    if (matchedCategories.has(category)) {
      solutions.push(...items);
    }
  });

  // Return up to 6 solutions, shuffled for variety
  return shuffleArray(solutions).slice(0, 6);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateSearchId() {
  return 'search_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export default router;