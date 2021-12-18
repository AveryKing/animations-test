"use strict";
exports.__esModule = true;
var express = require('express');
var login_1 = require("./controllers/login");
var user_1 = require("./controllers/user");
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/login', login_1["default"]);
app.use('/api/users', user_1["default"]);
var connStr = 'mongodb+srv://fullstack:fullstack@cluster0.qynol.mongodb.net/account-system?retryWrites=true&w=majority';
mongoose.connect(connStr).then(function (_result) {
    console.log('Connected to MongoDB');
});
app.get('/', function (_req, res) {
    res.send('hello world!');
});
var PORT = 4500;
app.listen(PORT, function () {
    console.log("Express listening on port ".concat(PORT));
});
