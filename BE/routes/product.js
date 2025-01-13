const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Lấy tất cả sản phẩm
router.get('/public', productController.getPublicProducts);

router.get('/public/:id', productController.getPublicProductById);

//Lấy sản phẩm theo Category
router.get('/public/category/:categoryId', productController.getPublicProductsByCategory);

// Tìm kiếm sản phẩm
router.get('/search', productController.searchPublicProducts);

// CRUD cho Admin
router.post('/', auth, adminAuth, productController.createProduct);

router.get('/', auth, productController.getProducts);

router.get('/:id', auth, productController.getProductById);

router.put('/:id', auth, adminAuth, productController.updateProduct);

router.delete('/:id', auth, adminAuth, productController.deleteProduct);

module.exports = router;