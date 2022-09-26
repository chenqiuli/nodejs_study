const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('home');
});
router.get('/swiper', (req, res) => {
  res.send('home-swiper');
});

module.exports = router;