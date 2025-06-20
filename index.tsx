import express from 'express'
import mongoose from "mongoose";
import User from './Modals/UserModal.js';
const app = express();

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
        const { username, email, password } = req.body
        const newUser = new User({ username, email, password })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: 'User registration failed', details: error });
    }

})



app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await User.findOne({ email })
        if (isUser) {
            res.status(200).json('Login')
        } else {
            res.status(400).json('User Does not exist')
        }
    } catch (error) {
        res.status(400).json({ error: 'User not found', details: error });
    }
})

connectDB()
app.listen(3000)