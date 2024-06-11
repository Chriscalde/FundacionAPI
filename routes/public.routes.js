const express = require('express');
const router = express.Router();
const controller = require('../controllers/public.controller');

router.post('/login',controller.loginUser);

module.exports = router