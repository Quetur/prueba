const express = require('express');
const router = express.Router();

const LocalStrategy = require('passport-local').Strategy;

const { isLoggedIn } = require('../lib/auth');

console.log('poductojs router');


module.exports = router;




