const express = require("express");

const router = express.Router();

router.use('/login', (req, res) => {
  res.render('login')
})

module.exports = router;