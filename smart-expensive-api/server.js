const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors()); // 🔥 TRÈS IMPORTANT

app.use(express.json());

// routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');

app.use('/user', userRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});