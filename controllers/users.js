const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
    // validation
    const error = validationResult(req);
    if(error.errors.length > 0) {
        return res.status(400).json({message: error.errors[0].msg})
    }

    // check email exist in databases
    const existEmail = await User.findOne({ email: req.body.email});
    if(existEmail) {
        return res.status(400).json({message: 'Email already exists'})
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({data: user});
    } catch(err) {
        res.status(400).send(err);
    }
}

module.exports.login = async (req, res) => {
    // validation
    const error = validationResult(req);
    if(error.errors.length > 0) {
        return res.status(400).json({message: error.errors[0].msg})
    }
        
    // check email exist in databases
    const user = await User.findOne({ email: req.body.email});
    if(!user) {
        return res.status(400).json({message:'Email not found'}); 
    }

    // validate pass
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        return res.status(400).json({message: 'Invalid password'});
    }

    // create and assign a token
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({token: token});
}