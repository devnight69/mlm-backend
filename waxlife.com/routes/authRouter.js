const express = require('express');
const AuthController = require('../controller/AuthController');

const router = express.Router();

router.post('/auth', (req, res) => AuthController.loginUser(req, res));

module.exports = router;