import axios from 'axios';

// In-memory cache to ensure the insight stays the same for 24 hours per investor type
const insightsCache: Record<string, { date: string, insight: string }> = {};

export const getDailyInsight = async (investorType: string, contentPrefs: string = 'general', favoriteCoins: string = '') => {
  const today = new Date().toDateString(); // e.g., "Mon Jun 29 2026"
  const cacheKey = `${investorType}-${contentPrefs}-${favoriteCoins}`;

  // Check if we already have an insight generated for this combination today
  if (insightsCache[cacheKey] && insightsCache[cacheKey].date === today) {
    return insightsCache[cacheKey].insight;
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    let generatedInsight = '';

    if (!apiKey) {
      // Fallback if no LLM key
      const fallbacks = [
        `As a ${investorType} looking for ${contentPrefs}, remember that market volatility is a feature, not a bug. Stay focused on your long-term strategy.`,
        `Patience is key for a ${investorType}. Look at the macro trends instead of getting caught up in the daily noise.`,
        `A smart ${investorType} knows when to zoom out. Historical cycles suggest we are exactly where we need to be.`,
        `Don't let emotions drive your decisions. As a ${investorType}, sticking to your original thesis is crucial right now.`,
        `The best opportunities often arise when fear is highest. Stay rational, ${investorType}.`,
        `Remember to secure your profits when possible. Even a ${investorType} needs a solid exit strategy.`,
        `Diversification isn't just a buzzword. Make sure your ${investorType} portfolio is balanced across multiple sectors.`
      ];
      // Pick a different insight each day of the month
      const dayOfMonth = new Date().getDate();
      generatedInsight = fallbacks[dayOfMonth % fallbacks.length];
    } else {
      // Use OpenRouter FREE model as requested!
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'mistralai/mistral-7b-instruct:free',
          messages: [{ role: 'user', content: `Give me a 2-sentence crypto investing insight for a ${investorType} who prefers content about ${contentPrefs}. The user is specifically invested in: ${favoriteCoins}. Tie the insight to these assets if possible, and make it sound professional.` }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      generatedInsight = response.data.choices[0].message.content;
    }

    // Save to cache
    insightsCache[cacheKey] = { date: today, insight: generatedInsight };
    return generatedInsight;

  } catch (error) {
    console.error('LLM error:', error);
    return 'Stay calm and HODL. The market rewards patience.';
  }
};
