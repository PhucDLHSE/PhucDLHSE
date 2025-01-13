const express = require('express');
const router = express.Router();
const { paymentVNPay } = require('../controllers/paymentController');

router.get('/vnpay/:orderCode', paymentVNPay);

module.exports = router;
