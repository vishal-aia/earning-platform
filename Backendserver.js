// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    balance: { type: Number, default: 0 },
    lastSpin: Date,
    deviceId: String
});
const User = mongoose.model('User', userSchema);

// API: Daily Spin (Profit Control Logic)
app.post('/api/spin', async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    
    // Profit Logic: 80% chance small reward, 20% chance big reward
    const rewards = [0.1, 0.2, 0.5, 1, 0, 0.05];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    
    user.balance += randomReward;
    await user.save();
    res.json({ reward: randomReward, newBalance: user.balance });
});

app.listen(5000, () => console.log("Server running on port 5000"));
