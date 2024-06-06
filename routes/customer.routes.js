const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer.controller');

router.post('/createCustomer',controller.createCustomer);
router.get('/getCustomers',controller.getCustomers);
module.exports = router;