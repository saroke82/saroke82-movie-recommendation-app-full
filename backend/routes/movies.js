const router = require('express').Router();
const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// TMDB Search
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`);
  res.json(response.data.results);
});

// Add Favorite
router.post('/favorite', async (req, res) => {
  const token = req.cookies.token;
  const { movie } = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(id);
  user.favorites.push(movie);
  await user.save();
  res.json({ message: 'Added to favorites' });
});

module.exports = router;
