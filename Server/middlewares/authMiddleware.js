const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing",
            });
        }

        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized User",
            });
        }
        req.user = decode;
        next();
        });
    } catch (error) {
    console.log(error);  

    res.status(400).send({
        success: false,
        message: "Please provide auth token",
        error: error.message,
    });
  };
};
