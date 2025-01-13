const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const addressRoutes = require('./routes/address');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');

dotenv.config({ path: './BE/.env' });

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

app.use(express.static(path.join(__dirname, '../fe')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../fe/index.html'));
});

app.get('/product-details/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../fe/product-details.html'));
});

app.get('/product-dt/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../fe/product-dt.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../fe/login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../fe/admin/admin.html'));
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send({ message: 'Route not found!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
