
const express = require('express');

const router = express.Router();

const Authentication = require('../MiddleWares/Authentication')

const {signup,login,logout,home} = require('../Controllers/authControllers');

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.get('/home',Authentication,home);

module.exports = router