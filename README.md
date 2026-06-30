# AI Crypto Advisor

A full-stack, AI-powered cryptocurrency dashboard that provides real-time prices, news, and LLM-generated investing insights tailored to user preferences.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://ai-crypto-advisor-dun.vercel.app](https://ai-crypto-advisor-dun.vercel.app)
- **Backend API (Render):** [https://ai-crypto-advisor-backend-0314.onrender.com/health](https://ai-crypto-advisor-backend-0314.onrender.com/health)

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, TypeScript, React Router, Lucide Icons
- **Backend:** Node.js, Express, TypeScript, Prisma (PostgreSQL)
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
   # Add DATABASE_URL with the PostgreSQL connection string
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

## 🗄️ Database Access
The application uses a live, remote **PostgreSQL** database hosted on Render. 

You can easily inspect the live database (Users, Preferences, and Feedback tables) using any standard database client (e.g., DBeaver, DataGrip, TablePlus, pgAdmin) with the following connection string:

```text
postgresql://crypto_db_28gd_user:DdGAKJrhr19iyrRzKGEXmFGQjhZfsjuF@dpg-d91d5d6q1p3s73e4b790-a.virginia-postgres.render.com/crypto_db_28gd
```

**Alternative (Prisma Studio):**
If you prefer not to use an external DB client, you can use the built-in Prisma Studio:
1. Clone the repository and navigate to the `backend` folder.
2. Run `npm install`.
3. Create a `.env` file and add the `DATABASE_URL` with the connection string above.
4. Run `npx prisma studio` to open a visual database editor in your browser.

## 🤖 AI Collaboration Summary
During this assignment, I used an AI coding assistant to help speed up my work. I treated the AI like a coding partner, I was the one making the decisions about the research, architecture, and product logic, while the AI helped me execute the vision and write the code faster.

Here is a quick breakdown of how we worked together:

*   **Research & Requirements:** Before writing a single line of code or even planning the project, I asked the AI to perform a deep web search on the company's website to understand your product, target audience, and culture. I then instructed the AI to carefully analyze the assignment instructions and highlight the core requirements to ensure we were perfectly aligned with the goals.
*   **Project Planning & Architecture:** After the research phase, I asked the AI to help me break down the entire assignment into a step-by-step guide. I divided the project into manageable phases (Frontend UI, Backend APIs, Database, and Integrations). I also made sure to guide the AI to separate the backend code systematically into Routes, Controllers, and Services so the project wouldn't become messy.
*   **Testing & Quality Assurance:** Before jumping into the main codebase, I created a dedicated `tests` folder to plan out tests for both the frontend and backend. I wanted to ensure we had a strategy to evaluate edge cases and verify the code's stability from all angles. Additionally, before pushing any code to production, I thoroughly tested the Database operations and API endpoints using **Postman** (for API route validation) and **DBeaver** (for database integrity) to ensure the foundation was solid before connecting the UI.
*   **Design & UI:** I wanted a modern "Glassmorphism" look for the app, taking direct inspiration from the **Fey** app UI. Instead of using a big CSS framework, I asked the AI to help me write clean, custom CSS. I tweaked its suggestions to make sure the colors, shadows, and overall feel looked premium.
*   **API & Core Logic:** The AI was great at writing the basic fetch requests to connect to external APIs. However, I designed the actual logic. For example, I noticed the initial AI prompt only used the user's "Investor Type". I actively changed the backend code, so it also uses the user's "Content Preferences" to generate much smarter and more personalized daily insights.
*   **Debugging:** When I ran into bugs, I used the AI to bounce ideas off. For example, when a specific file was throwing errors, I instructed the AI to inject detailed console logs throughout the entire execution flow of that file to help me pinpoint the exact breaking point. Also, when deploying to Vercel, I got a 404 routing error. I figured out it was a React Router SPA issue and asked the AI to help me generate the correct `vercel.json` configuration file to fix it.

**Conclusion:** 
Using AI was incredibly helpful for writing repetitive code quickly. This saved me a lot of time and allowed me to really focus on the big picture, researching the company, planning the project phases, setting up a solid testing strategy, designing the architecture, and debugging edge cases. I reviewed and tested everything the AI generated to make sure it met the assignment's exact requirements.

## 🧠 Bonus: Machine Learning Conceptual Explanation
As part of the assignment, we built a `Feedback` tracking system where users can click "Thumbs Up" or "Thumbs Down" on the news and AI insights. This data is actively saved to our database. 

**How to use this data to train a Machine Learning model:**
1. **Data Extraction & Preprocessing:** We can extract the feedback logs from the database, where each row contains the content (e.g., the text of the AI insight) and the label (`UP` = 1, `DOWN` = 0). 
2. **Feature Engineering:** Convert the text content into numerical embeddings using models like BERT or OpenAI's embedding endpoints. 
3. **Model Selection:** Train a supervised learning model (such as Logistic Regression or a simple Neural Network classifier) on these embeddings to predict the likelihood of an "UP" vote.
4. **Integration (RLHF):** For a more advanced approach, this thumbs up/down data can be used for **Reinforcement Learning from Human Feedback (RLHF)** to fine-tune our LLM prompts. By analyzing which types of insights get downvoted, the system can dynamically adjust the prompt parameters (e.g., tone, length, technical depth) before making the next API call. Over time, the AI Advisor learns exactly what kind of advice resonates best with each specific user profile!

---
*Built by Dan Gutman*
