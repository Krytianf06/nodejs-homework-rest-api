const express = require('express');
const router = express.Router();

const userController = require('../../queryMongoDB/userMongoDB');
const {authorization} = require('../../service/validation/tokenValid');
const {uploadMiddleware, modificationImages} = require('../../service/avatarConfig');

router.post('/signup', userController.register);
router.post('/login', userController.login);
router.get('/logout', authorization, userController.logout);
router.get('/current', authorization, userController.current);
router.patch('/', authorization, userController.pathUser);
router.patch('/avatars', authorization, uploadMiddleware.single("avatar"),modificationImages ,userController.pathUserAvatar);
router.get("/verify/:verificationToken", userController.verificationToken);
router.post("/verify", userController.repeatverificationToken);

 
 
module.exports = router;