"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Protect all routes in this file
router.use(authMiddleware_1.authenticateToken);
router.put('/preferences', userController_1.updatePreferences);
router.put('/pinned', userController_1.updatePinnedCoins);
exports.default = router;
