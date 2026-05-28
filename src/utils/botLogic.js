import { problemKeywords } from '../data/keywords';
import { botResponses } from '../data/responses';

export const getBotResponse = (userMessage, language, userName) => {
  const msg = userMessage.toLowerCase();
  let detectedCategory = 'default';

  // Check for crisis FIRST (Priority)
  if (problemKeywords.crisis.some(kw => msg.includes(kw))) {
    detectedCategory = 'crisis';
  } else {
    // Check other categories
    for (const [category, keywords] of Object.entries(problemKeywords)) {
      if (keywords.some(kw => msg.includes(kw))) {
        detectedCategory = category;
        break; // Stop at first match
      }
    }
  }

  // Get response based on category and language
  let response = botResponses[detectedCategory]?.[language] || botResponses.default[language];
  
  // Replace {name} placeholder with the actual user name
  return response.replace('{name}', userName || 'Dost');
};