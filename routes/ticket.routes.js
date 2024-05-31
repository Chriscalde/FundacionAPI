const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticket.controller');

router.post('/createTickets',controller.createTickets);

module.exports = router;
