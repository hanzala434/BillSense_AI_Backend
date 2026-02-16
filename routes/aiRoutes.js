import express from "express";
import { parseInvoiceFromText, generateReminderEmail, getDashboardSummary } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate-invoice", protect, parseInvoiceFromText);
router.post("/generate-reminder", protect, generateReminderEmail);
router.get("/dashboard-summary", protect, getDashboardSummary);

export default router;
