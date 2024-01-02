const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');;
const {createUser,login,getUser} = require("../controllers/auth")

//Route 1 : creating a endpoint for user to signup ; '/api/auth/createuser' : No Login Required
router.post('/createuser', [
    body('name', 'Length Of Name Should Be Minimum 3').isLength({ min: 3 }),
    body('email', 'Please Enter a valid email').isEmail(),
    body('password', 'password must be of minimum length 8').isLength({ min: 8 })
], createUser)

//Route 2 : creating a endpoint for login : '/api/auth/login' : No Login Required
router.post('/login',[
    body('email','Please Enter a valid email').isEmail(),
    body('password','Password Cannot Be Blank').isLength({min:1})
],login)

//Route 3 : creating a endpoint for /getuser : '/api/auth/getuser' : Login Required
router.get('/getuser',fetchuser,getUser)

module.exports = router