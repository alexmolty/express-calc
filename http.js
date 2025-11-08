import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const history = [];

app.post('/calc', (req, res) => {
    const {a, b, operation} = req.body ?? {};
    if (!a || !b || !operation) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    if(isNaN(a) || isNaN(b)) return res.status(400).json( { error: 'Invalid input' })
    if(!['+', '-', '*', '/'].includes(operation)) return res.status(400).json( { error: 'Invalid operation' })
    if(operation === '/' && +b === 0) return res.status(400).json( { error: 'Division by zero is not allowed' })
    const result = eval(`${a} ${operation} ${b}`);
    res.json( { result })
    const record = {
        a,
        b,
        operation,
        result,
    }
    history.push(record);
}
)
app.get('/history', (req, res) => {
    res.json( { history } )
})
app.use((req, res) => {
    res.status(404).type('text/plain; charset=utf-8').send('Not found');
})
app.listen(port, () => console.log(`Server is running on port ${port}`));