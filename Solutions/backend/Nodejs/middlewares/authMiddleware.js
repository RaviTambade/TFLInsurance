const { validateToken } = require("../helpers/tokenHelper");

const verifyToken = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);

         if (!authHeader) {
            return res.status(401).json({
                message: "Token Required"
            });
        }

       const token = authHeader.split(" ")[1];
        console.log("Token:", token);

        const decoded = await validateToken(token);
        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (err) {
    console.log(err);

    return res.status(403).json({
        message: "Invalid Token",
        error: err.message
    });
}
};

const authorize = (...roles) => {

    return (req, res, next) => {

        console.log("Allowed Roles:", roles);
        console.log("User Role:", req.user.Role);

        if (!roles.includes(req.user.Role)) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};

module.exports = {
    verifyToken,
    authorize
};
