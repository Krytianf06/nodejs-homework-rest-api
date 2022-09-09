const express = require('express');
const router = express.Router();

const userController = require('../../queryMongoDB/userMongoDB');
const {authorization} = require('../../service/validation/tokenValid');

router.post("/signup", userController.register);
router.post('/login', userController.login);
router.get('/logout', authorization, userController.logout);
router.get('/current', authorization, userController.current);
 
module.exports = router;