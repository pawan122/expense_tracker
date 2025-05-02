import { jest } from '@jest/globals';

// Mock data
const mockExpense = { id: 1, amount: 100, description: 'Test expense' };
const mockExpenses = [mockExpense];
const detailedExpenses = [{ ...mockExpense, category: 'Food', date: '2025-01-01' }];

// Mock the service layer before importing the controller
jest.unstable_mockModule('../services/expenseServices.js', () => ({
  addExpense: jest.fn(() => Promise.resolve(mockExpense)),
  getAllExpenses: jest.fn(() => Promise.resolve(mockExpenses)),
  getExpense: jest.fn((id) => Promise.resolve({ ...mockExpense, id })),
  updateExpense: jest.fn((id, data) => Promise.resolve({ ...mockExpense, ...data })),
  deleteExpense: jest.fn((id) => Promise.resolve({ message: `Deleted ${id}` })),
  getExpensesWithDetails: jest.fn(() => Promise.resolve(detailedExpenses)),
}));

// Import controller after mocking
const {
  createExpense,
  fetchAll,
  fetchOne,
  updateOne,
  deleteOne,
  getAllWithDetails
} = await import('../controllers/expenseController.js');

// Helper mocks
const getMockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
});

// --- Test: createExpense ---
test('createExpense: should create expense and return 201', async () => {
  const mockReq = { body: { amount: 100, description: 'Test expense' } };
  const mockRes = getMockRes();

  await createExpense(mockReq, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(201);
  expect(mockRes.json).toHaveBeenCalledWith(mockExpense);
});

// --- Test: fetchAll ---
test('fetchAll: should fetch all expenses and return 200', async () => {
  const mockRes = getMockRes();

  await fetchAll({}, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(mockExpenses);
});

// --- Test: fetchOne ---
test('fetchOne: should fetch single expense and return 200', async () => {
  const mockReq = { params: { id: 1 } };
  const mockRes = getMockRes();

  await fetchOne(mockReq, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith({ ...mockExpense, id: 1 });
});

// --- Test: updateOne ---
test('updateOne: should update expense and return 200', async () => {
  const mockReq = { params: { id: 1 }, body: { amount: 200 } };
  const mockRes = getMockRes();

  await updateOne(mockReq, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith({ ...mockExpense, amount: 200 });
});

// --- Test: deleteOne ---
test('deleteOne: should delete expense and return 200', async () => {
  const mockReq = { params: { id: 1 } };
  const mockRes = getMockRes();

  await deleteOne(mockReq, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith({ message: 'Deleted 1' });
});

// --- Test: getAllWithDetails ---
test('getAllWithDetails: should fetch detailed expenses and return 200', async () => {
  const mockRes = getMockRes();

  await getAllWithDetails({}, mockRes);
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith(detailedExpenses);
});
