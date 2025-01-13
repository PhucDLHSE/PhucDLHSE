const crypto = require('crypto');
const Order = require('../models/Order');  


exports.paymentVNPay = async (req, res) => {
    try {
        const { orderCode } = req.params;  // Mã đơn hàng được truyền vào

        // Lấy đơn hàng từ DB dựa trên mã orderCode
        const order = await Order.findOne({ orderCode }).populate('items.product');
        if (!order) {
            return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
        }

        // Nếu phương thức thanh toán là chuyển khoản, tiến hành tạo URL VNPay
        if (order.paymentMethod === 'Chuyển khoản ngân hàng') {
            const vnp_TxnRef = order.orderCode;  // Mã đơn hàng
            const vnp_Amount = order.totalAmount * 100;  // Số tiền thanh toán (VNPay yêu cầu là VND * 100)
            const vnp_BankCode = 'VNPAY';  // Mã ngân hàng giả lập
            const vnp_OrderInfo = `Thanh toán cho đơn hàng #${order.orderCode}`;
            const vnp_CustomerName = order.fullName;
            const vnp_CustomerEmail = 'email@example.com';  // Giả lập email khách hàng
            const vnp_CustomerPhone = order.phoneNumber;
            const vnp_Locale = 'vn';  // Đặt ngôn ngữ là tiếng Việt
            const vnp_ReturnUrl = 'http://localhost:5000/api/payment/vnpay_return';  // URL quay lại sau khi thanh toán
            const vnp_TmnCode = '2QXUI4J4';  // Mã Merchant Code giả lập
            const vnp_Version = '2.1.0';  // Phiên bản VNPay
            const vnp_CreateDate = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);  // Thời gian tạo đơn hàng

            // Tạo chuỗi ký tự để hash (dùng để tạo secure hash)
            const hashString = `vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_Command=pay&vnp_CreateDate=${vnp_CreateDate}&vnp_CustomerEmail=${vnp_CustomerEmail}&vnp_CustomerName=${vnp_CustomerName}&vnp_CustomerPhone=${vnp_CustomerPhone}&vnp_Locale=${vnp_Locale}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_ReturnUrl=${vnp_ReturnUrl}&vnp_TmnCode=${vnp_TmnCode}&vnp_TxnRef=${vnp_TxnRef}&vnp_Version=${vnp_Version}`;

            // Tạo mã hash sử dụng SHA256
            const secretKey = 'your-secret-key'; // Bạn cần thay bằng secret key của bạn từ VNPay
            const secureHash = crypto.createHmac('sha256', secretKey).update(hashString).digest('hex');

            // Tạo URL thanh toán VNPay
            const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_Command=pay&vnp_CreateDate=${vnp_CreateDate}&vnp_CustomerEmail=${vnp_CustomerEmail}&vnp_CustomerName=${vnp_CustomerName}&vnp_CustomerPhone=${vnp_CustomerPhone}&vnp_Locale=${vnp_Locale}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_ReturnUrl=${vnp_ReturnUrl}&vnp_TmnCode=${vnp_TmnCode}&vnp_TxnRef=${vnp_TxnRef}&vnp_Version=${vnp_Version}&vnp_SecureHash=${secureHash}`;

            // Chuyển hướng người dùng tới trang thanh toán VNPay
            res.redirect(paymentUrl);
        } else {
            // Nếu phương thức thanh toán là khác, trả về kết quả khác
            res.status(400).json({ error: 'Chỉ hỗ trợ thanh toán qua chuyển khoản' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
