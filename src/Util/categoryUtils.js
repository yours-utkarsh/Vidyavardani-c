// Utility functions for handling category URLs

export const createCategoryURL = (categoryName) => {
  // Convert category name to URL-friendly format
  // Use lowercase and replace spaces with hyphens
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};

export const matchCategoryFromURL = (urlParam, categories) => {
  // Try multiple matching strategies to find the category
  const strategies = [
    // Strategy 1: Direct lowercase match
    (param, cat) => cat.name.toLowerCase() === param.toLowerCase(),
    
    // Strategy 2: URL param matches hyphenated category name
    (param, cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === param.toLowerCase(),
    
    // Strategy 3: URL param with hyphens matches category name with spaces
    (param, cat) => cat.name.toLowerCase() === param.toLowerCase().replace(/-/g, ' '),
    
    // Strategy 4: Remove all spaces and hyphens for comparison
    (param, cat) => cat.name.toLowerCase().replace(/\s+/g, '') === param.toLowerCase().replace(/-/g, ''),
    
    // Strategy 5: URL decoded comparison
    (param, cat) => {
      try {
        const decoded = decodeURIComponent(param);
        return cat.name.toLowerCase() === decoded.toLowerCase();
      } catch (e) {
        return false;
      }
    }
  ];
  
  // Try each strategy until we find a match
  for (const strategy of strategies) {
    const match = categories.find(cat => strategy(urlParam, cat));
    if (match) {
      return match;
    }
  }
  
  return null;
};

export const formatCategoryForDisplay = (categoryName) => {
  // Format category name for display (capitalize first letter of each word)
  return categoryName.replace(/\b\w/g, l => l.toUpperCase());
};
