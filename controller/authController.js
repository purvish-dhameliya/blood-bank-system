const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        //const { role, name, email, password, website, address, phone, organizationName, hospitalName } = req.body;
        const existingUser = await userModel.findOne({ email: req.body.email })
        //validation 
        if (existingUser) {
            res.status(200).send({
                success: true,
                message: "user is already Exists"
            })
        }

        // bcrypt for hashing password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        //then rest data 
        const user = new userModel(req.body)
        console.log("USERSAVEVRRR:::",user)
        const saved =await user.save();
        return res.status(201).send({
            success: true,
            message: 'Register Successful',
            user : saved
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            error
        })
    }
}


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        console.log("USERRR::::", user);
        //validate
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email Not Found'
            })
        }

        // compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Password!'
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token, user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Login API',
            error
        })
    }
}

const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.userId });
        return res.status(200).send({
            success: true,
            message: "User Successfully Get",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Get User",
            error
        })
    }
}


module.exports = { registerController, loginController, currentUserController }