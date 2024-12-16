const express = require('express');
const UserController = require('../controller/UserController');
const { authorizeRoles } = require('../config/Security');
const UserRole = require('../enums/UserRole');
const JwtTokenFilter = require('../utils/JwtTokenFilter');

const router = express.Router();

router.post('/users', (req, res) => UserController.createUser(req, res));
router.get('/users', JwtTokenFilter, authorizeRoles([UserRole.ADMIN, UserRole.SUPER_ADMIN]), (req, res) => UserController.getAllUsers(req, res));
router.get('/users/:id', JwtTokenFilter, authorizeRoles([UserRole.USER]), (req, res) => UserController.getUserById(req, res));
router.put('/users/:id', JwtTokenFilter, (req, res) => UserController.updateUser(req, res));
router.delete('/users/:id', JwtTokenFilter, authorizeRoles([UserRole.ADMIN]), (req, res) => UserController.deleteUser(req, res));

module.exports = router;
