const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticket.controller');

router.post('/createTickets',controller.createTickets);
router.get('/getAll',controller.getAllTickets);
router.post('/updateStatus',controller.updateStatus)
module.exports = router;
