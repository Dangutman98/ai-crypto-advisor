import axios from 'axios';

export const getDailyInsight = async (investorType: string) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      // Fallback if no LLM key
      return `As a ${investorType}, remember that market volatility is a feature, not a bug. Stay focused on your long-term strategy and don't let short-term noise shake you out of good positions.`;
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: 'user', content: `Give me a 2-sentence crypto investing insight for a ${investorType}.` }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('LLM error:', error);
    return 'Stay calm and HODL. The market rewards patience.';
  }
};
