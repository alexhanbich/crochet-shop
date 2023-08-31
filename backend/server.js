import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';


const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.get('/', (req, res) => { res.send('api running') });

app.get('/api/products', (req, res) => { 
    res.json({ img: 'https://picsum.photos/200', name:'name', price:'price', rating:4.5, numReviews:'10' });
});

app.get('/api/products/:id', (req, res) => {
    res.json({ img: 'https://picsum.photos/200', name:'name', price:'price', rating:4.5, numReviews:'10' });
});

app.listen(port, () => console.log(`server running on port ${port}`))