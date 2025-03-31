import mongoose from "mongoose";
import { applyAutoIncrement } from "../config/autoIncrement.js";

const expenseSchema = new mongoose.Schema({
    _id: Number,
    title:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category_id: {
        type: Number,
        ref: 'category'
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {_id: false}); // disable auto generation of _id

applyAutoIncrement(expenseSchema, 'Expense');

const Expense = mongoose.model('Expenses', expenseSchema);
export default Expense;

