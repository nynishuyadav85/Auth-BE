import express from 'express'
import mongoose from "mongoose";
import User from './Modals/UserModal.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';


const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Needed if you're using cookies
}));


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nynishuyadav85:Nc0SEAf0Pg18l3Td@auth.j5hu0tt.mongodb.net/')
            .then(() => console.log('Connected!'));
    } catch (error) {
        console.log('DB not connected')
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Worldsssss')
})


app.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const newUser = new User({ userName, email, password })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: 'User registration failed', details: error });
    }

})



app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        console.log()
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
            // res.status(200).json('Login')
        }
        const token = jwt.sign({ userId: user._id }, 'ABC')
        res.cookie('token', token)
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ error: 'User not found', details: error });
    }
})

connectDB()
app.listen(3000)