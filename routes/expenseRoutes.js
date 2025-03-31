import express from "express";
import { createExpense, deleteOne, fetchAll, fetchOne, updateOne, getAllWithDetails } from "../controllers/expenseController.js";

const router = express.Router();

router.post('/add', createExpense);
router.get('/test', getAllWithDetails)
router.get('/:id', fetchOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne)
router.get('/', fetchAll);

export default router;