//TA04 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.session.style;
  req.session.counter;
  res.render('pages/ta04', {
    title: 'Team Activity 04',
    path: '/ta04', // For pug, EJS
    activeTA04: true, // For HBS
    contentCSS: true, // For HBS
    textColor: req.session.style,
    countNumber: req.session.counter
  });
});

router.post('/change-style', (req, res, next) => {
  req.session.style = '#b01302';
  res.redirect('/ta04');
});

router.post('/counter', (req, res, next) => {
  if (req.body.increase === 'true') {
    req.session.counter++;
  }
  else {
    req.session.counter--;
  }
  res.redirect('/ta04');
});

router.post('/reset', (req, res, next) => {
  req.session.destroy((err) => {    console.log(err);    res.redirect('/ta04');  });
});

module.exports = router;
