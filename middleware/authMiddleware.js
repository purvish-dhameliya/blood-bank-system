const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing",
            });
        }

        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.error('Token Verification Error:', err);
                return res.status(401).send({
                    success: false,
                    message: "Auth Failed",
                });
            } else {
                //   console.log("REFH::::",req.body);
                req.userId = decode.userId;
                //  console.log("::::::::::::::",decode.userId);
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Auth Failedd",
            error : error.message,
        });
    }
};