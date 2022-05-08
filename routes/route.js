const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const theatreController = require("../controllers/theatreController");
const showController = require('../controllers/showController')
const mid = require('../middlewares/appMiddleware');
const validator = require('../middlewares/validator');

router.post('/admin', adminController.createAdmin);

router.post('/adminLogin', adminController.login);

router.post('/user', validator.checkUser, userController.createUser);

router.post('/login', userController.login);

router.post('/theatre/:adminId', validator.theatreCheck, mid.mwAdmin ,theatreController.createTheatre);

router.post('/show/:adminId', validator.checkShow, mid.mwAdmin,showController.createShow);

router.post('/booking/:userId', validator.bookingCheck, mid.mwUser, showController.booking);

router.get('/showSeats', showController.showSeats);


module.exports = router;