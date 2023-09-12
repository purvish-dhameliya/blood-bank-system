const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);
        //admin valid or not
        if (user?.role !== "admin") {
            return res.status(401).send({
                success: true,
                message: "Auth Failed",
                error: error.message
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Invalid admin or faild",
            error: error.message
        })
    }
}