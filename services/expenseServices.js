import Expense from "../models/Expense.js";

export const addExpense = async (expenseData) => { 
    const expense = new Expense(expenseData);
    return await expense.save();
};

export const getAllExpenses = async () => {
    return await Expense.find();
};

export const getExpense = async (id) => {
    return await Expense.findById(id);
};

export const updateExpense = async (id, expenseData) => {
    return await Expense.findByIdAndUpdate(id, expenseData, { new: true });
};

export const deleteExpense = async (id) => {
    return await Expense.findByIdAndDelete(id);
}

export const getExpensesWithDetails = async () => {
    let resultData = await Expense.aggregate([
        {
            $match: {
                category_id: 1
            }
        },
        {
            $lookup: {
                from: 'category',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
           $unwind: '$category'
        },
        {
            $project: {
                _id: 1,
                title: 1,
                amount: 1,
                date: 1,
                category_id: 1,
                category_name: '$category.name'
            }
        }
    ]);
    return resultData;    

}





