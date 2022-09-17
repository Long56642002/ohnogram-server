const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.post('/sign-up',userController.signUp)
router.get('/get-all-users',userController.getAllUsers)

module.exports = router