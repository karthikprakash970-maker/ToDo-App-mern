const express = require('express');
const { registerControler, loginControler } = require('../controllers/userController');


//router object
const router = express.Router()

//routes
//REGISTER || POST
router.post('/register',registerControler);

//LOGIN || POST
router.post('/login',loginControler);

module.exports = router;