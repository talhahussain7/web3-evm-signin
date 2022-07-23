const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');

// @route   Get /api/:public_address/nonce
// @desc    returns user's nonce
// @access  Public
router.get('/:public_address/nonce', authController.getNonce);

// @route   Post /api/:public_address/signature
// @desc    returns jwt token if authentic user
// @access  Public
router.post('/:public_address/signature',authController.getJwtToken)

// @route   Post /api/register
// @desc    register user
// @access  Public
router.post('/:public_address/register',authController.registerUser);

module.exports = router;