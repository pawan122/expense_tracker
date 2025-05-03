import express from 'express';
import router from './routes/expenseRoutes.js';
import connectDb from './config/db.js';
const app = express();
const PORT = 5001;

connectDb();

app.use(express.json())

app.use('/api', router);

app.use('/api/products', (req, res) => {
    return res.status(200).json({ message: 'Products API' })    
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})