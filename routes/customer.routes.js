const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer.controller');

router.post('/createCustomer',controller.createCustomer);
router.get('/getCustomers',controller.getCustomers);
router.get('/getLastOrder',controller.getLastOrder);
module.exports = router;