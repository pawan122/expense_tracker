import { addExpense, getAllExpenses, getExpense, updateExpense, deleteExpense, getExpensesWithDetails } from "../services/expenseServices.js";

export const createExpense = async (req, res) => {
    try {
        const expense = await addExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchAll = async (req, res) => {
    console.log('fetching all expenses')
    try {
        const expenses = await getAllExpenses();
        res.status(200).json(expenses);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchOne = async (req, res) => {
    try {
        let id = req.params.id;
        const expense = await getExpense(id)
        res.status(200).json(expense);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const updateOne = async (req, res) => {
    try {
        let id = req.params.id;
        const expense = await updateExpense(id, req.body);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteOne = async (req, res) => {
    try {
        let id = req.params.id;
        const expense = await deleteExpense(id);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllWithDetails = async (req, res) => {
    console.log('fetching all expenses with details')
    try {
        const detailedData = await getExpensesWithDetails();
        res.status(200).json(detailedData);
        
    } catch (error) {
        //console.log(error)
        res.status(500).json({ message: error.message });
    }

}
