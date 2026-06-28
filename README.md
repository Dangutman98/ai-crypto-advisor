# AI Crypto Advisor

A full-stack, AI-powered cryptocurrency dashboard that provides real-time prices, news, and LLM-generated investing insights tailored to user preferences.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://ai-crypto-advisor-dun.vercel.app](https://ai-crypto-advisor-dun.vercel.app)
- **Backend API (Render):** [https://ai-crypto-advisor-backend-0314.onrender.com/health](https://ai-crypto-advisor-backend-0314.onrender.com/health)

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, TypeScript, React Router, Lucide Icons
- **Backend:** Node.js, Express, TypeScript, Prisma (SQLite)
- **External APIs:** CoinGecko (Live Prices), CryptoPanic (News), OpenRouter/Mistral (AI Insights), Reddit (Memes)

## ✨ Key Features
- **Secure Authentication:** JWT-based user login and registration.
- **Personalized Onboarding:** Users select their favorite assets and investor persona (e.g., HODLer, Day Trader).
- **Dynamic Dashboard:** Live crypto prices, randomized market news, and daily crypto memes fetched from Reddit.
- **AI-Powered Insights:** Daily investing insights generated via LLM based on the user's specific persona and selected assets.
- **Feedback Loop:** Users can thumbs up/down AI insights and news, providing data for future ML training.

## 💻 Running Locally
To run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dangutman98/ai-crypto-advisor.git
   cd ai-crypto-advisor
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   # Create a .env file with PORT=5000 and JWT_SECRET="your-secret"
   # Optionally add CRYPTOPANIC_API_KEY and OPENROUTER_API_KEY for real data
   npm run build
   npm start
   ```

3. **Setup the Frontend:**
   ```bash
   # In a new terminal
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Database (Feedback & Users):**
   ```bash
   # In the backend directory
   npx prisma studio
   # This will open a local web interface at http://localhost:5555
   ```

## 🤖 AI Tools Interaction Summary
This project was built collaboratively with an AI Coding Assistant. The development workflow was split into 4 iterative steps:
1. **Database & Architecture Setup:** Bootstrapping the monorepo, designing the Prisma schema (Users, DashboardData, Feedback), and setting up Express.
2. **Backend Services & API:** Building robust controllers with JWT authentication, and integrating external APIs for live crypto data and AI insight generation.
3. **Frontend UI & State Management:** Developing a highly responsive, premium-styled React dashboard featuring onboarding flows and dynamic widgets.
4. **Deployment & Polish:** Deploying the backend to Render, the frontend to Vercel, and wiring up the UI to handle live feedback (Thumbs Up/Down).

## 🧠 Bonus: Machine Learning Conceptual Explanation
As part of the assignment, we built a `Feedback` tracking system where users can click "Thumbs Up" or "Thumbs Down" on the news and AI insights. This data is actively saved to our database. 

**How to use this data to train a Machine Learning model:**
1. **Data Extraction & Preprocessing:** We can extract the feedback logs from the database, where each row contains the content (e.g., the text of the AI insight) and the label (`UP` = 1, `DOWN` = 0). 
2. **Feature Engineering:** Convert the text content into numerical embeddings using models like BERT or OpenAI's embedding endpoints. 
3. **Model Selection:** Train a supervised learning model (such as Logistic Regression or a simple Neural Network classifier) on these embeddings to predict the likelihood of an "UP" vote.
4. **Integration (RLHF):** For a more advanced approach, this thumbs up/down data can be used for **Reinforcement Learning from Human Feedback (RLHF)** to fine-tune our LLM prompts. By analyzing which types of insights get downvoted, the system can dynamically adjust the prompt parameters (e.g., tone, length, technical depth) before making the next API call. Over time, the AI Advisor learns exactly what kind of advice resonates best with each specific user profile!

---
*Built by Dan Gutman*
