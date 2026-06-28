import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import dashboardRoutes from './routes/dashboard';
import feedbackRoutes from './routes/feedback';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Crypto Advisor API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
