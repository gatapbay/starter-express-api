const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const setup = require('./config');
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;


// Một số thiết lập cho server
app.disable('etag');
app.use(cors({origin: '*'}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '/public')));


// ---------------------- [ ROUTER ] ----------------------

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

const uploadRouter = require('./routes/upload');
app.use('/api/upload', uploadRouter);

const clientRouter = require('./routes/client');
app.use('/api', clientRouter);

// ---------------------- [ /ROUTER ] ---------------------


// Gửi trang index và lỗi 404
app.use('/api', (req, res) => {
    res.status(404).json({ message: 'API Not Found' })
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Kết nối CSDL và khởi động server
mongoose.connect(setup.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.listen(PORT, () => {
    console.log('Server is runing...');
});
