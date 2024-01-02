require('dotenv').config();
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ Error: err.array() });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json([{ msg: "User Already Exist With The Given Email,Please Login" }])
        }
        const salt = await bcryptjs.genSalt(10);
        const encrpytPass = await bcryptjs.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: encrpytPass,
            email: req.body.email
        })
        const data = {
            id: user.id
        }
        const userToken = jwt.sign(data, JWT_SECRET);
        res.json({ msg: 'Sign Up Successfully!!!', userToken });//returning the user token to the user
    } catch (err) {
        console.error(err.message);
        res.status(500).send([{ msg: "Internal Server Error", err: err.msg }]);
    }
}

const login = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ Error: err.array() });
    }
    try {
        let user = await User.findOne({ 'email': req.body.email });
        if (!user) {
            return res.status(400).json([{ msg: "User Not Exist,Please Signup" }]);
        } else {
            const comparePass = await bcryptjs.compare(req.body.password, user.password);
            if (!comparePass) {
                return res.status(400).json([{ msg: "Please Enter a Correct Email/Password" }]);
            } else {
                const data = {
                    id: user.id
                }
                const userToken = jwt.sign(data, JWT_SECRET);
                return res.json({ msg: "Login Successfully!!!", userToken });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send([{ msg: "Internal Server Error" }]);
    }
}
const getUser = async (req, res) => {
    try {
        const _id = req.user.id;
        const user = await User.findOne({ _id });
        res.send(user);
    } catch (err) {
        console.error(err.msg);
        return res.status(404).send('Internal Server Problem');
    }
}
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.getUser = getUser;