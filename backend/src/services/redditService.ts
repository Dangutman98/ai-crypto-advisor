import axios from 'axios';

export const getMeme = async () => {
  try {
    const response = await axios.get('https://www.reddit.com/r/cryptocurrencymemes/top.json?limit=10&t=week');
    const posts = response.data.data.children;
    
    // Find a post with an image link
    const imagePost = posts.find((p: any) => p.data.url && (p.data.url.endsWith('.jpg') || p.data.url.endsWith('.png')));
    
    if (imagePost) {
      return { title: imagePost.data.title, url: imagePost.data.url };
    }
    
    return { title: 'When you buy the dip but it keeps dipping', url: 'https://i.imgflip.com/1ur9b0.jpg' };
  } catch (error) {
    console.error('Reddit error:', error);
    return { title: 'Hodl strong', url: 'https://i.imgflip.com/1ur9b0.jpg' };
  }
};
