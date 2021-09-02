import express from 'express';
import memeRouter from './routes/memeRoute';
import dotenv from 'dotenv';
import connectDB from './config/database';
dotenv.config();

const port = process.env.PORT;
const connectionURL = process.env.DB_CONNECTION_URL;

const app = express();
app.use(express.json());
app.use('/api/meme', memeRouter);


connectDB(`${connectionURL}`);


app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});