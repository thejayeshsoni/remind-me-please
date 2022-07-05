const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", '');

        if (!token) {
            return res.status(401).json({ message: "Login first to acess this page..!!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
        console.log(error);
    }
};