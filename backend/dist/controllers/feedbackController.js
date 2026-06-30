"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitFeedback = void 0;
const db_1 = require("../db");
const submitFeedback = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { contentId, contentType, voteType } = req.body;
        if (!contentId || !contentType || !voteType) {
            return res.status(400).json({ error: 'Missing required fields (contentId, contentType, voteType)' });
        }
        const existingFeedback = await db_1.prisma.feedback.findFirst({
            where: { userId, contentId, contentType }
        });
        let feedback;
        if (existingFeedback) {
            feedback = await db_1.prisma.feedback.update({
                where: { id: existingFeedback.id },
                data: { voteType }
            });
        }
        else {
            feedback = await db_1.prisma.feedback.create({
                data: { userId, contentId, contentType, voteType }
            });
        }
        res.status(201).json({ message: 'Feedback saved successfully', feedback });
    }
    catch (error) {
        console.error('Feedback error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.submitFeedback = submitFeedback;
