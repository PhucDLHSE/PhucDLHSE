const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Category = require('../models/Category');

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { name, price, status, brand, category, description, images, quantity } = req.body;
      
    const brandExists = await Brand.findById(brand);
    const categoryExists = await Category.findById(category);

    if (!brandExists || !categoryExists) {
      return res.status(400).json({ msg: 'Không tìm thấy Brand hoặc Category tương ứng' });
    }

    const product = new Product({
      name,
      price,
      status,
      brand,
      category,
      description,
      images,
      quantity,
    });

    await product.save();
    res.status(201).json({ msg: 'Sản phẩm đã được thêm thành công', product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Lấy tất cả Sản phẩm (Yêu cầu xác thực)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('brand category');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Lấy tất cả Sản phẩm
exports.getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('brand category');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Lấy một Sản phẩm theo ID (Yêu cầu xác thực)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('brand category');
    if (!product) {
      return res.status(404).json({ msg: 'Không tìm thấy sản phẩm!' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Lấy sản phẩm theo Category
exports.getPublicProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('brand category');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Cập nhật Sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, status, brand, category, description, images, quantity } = req.body;

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.status = status || product.status;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.images = images || product.images;
    product.quantity = quantity !== undefined ? quantity : product.quantity;

    await product.save();
    res.json({ msg: 'Product updated successfully', product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Xóa Sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Không tìm thấy!' });
    }

    res.json({ msg: 'Sản phẩm đã được xóa thành công' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Tìm kiếm sản phẩm
exports.searchPublicProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i' 
      }
    } : {};

    const products = await Product.find({ ...keyword }).populate('brand category');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPublicProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('brand category');
    if (!product) {
      return res.status(404).json({ msg: 'Không tìm thấy sản phẩm!' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
