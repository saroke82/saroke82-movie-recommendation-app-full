const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Backend running on port 5000')))
  .catch(err => console.log(err));
