const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");

exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({
            message: "Name, Email and Password are required..!!"
        });
    };

    const user = await User.create({ name, email, password });
    cookieToken(user, res);
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // check for presence of email and password
    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password..!!"
        });
    }

    // get user from DB
    const user = await User.findOne({ email }).select("+password");

    // if user not found in DB
    if (!user) {
        return res.status(400).json({ message: "Email or password does not match or not exist" });
    }

    // match the password
    const isPasswordCorrect = await user.isValidPassword(password);

    // if password does not match
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Email or password does not match or not exist" });
    }

    // if all goes good and we send the token
    cookieToken(user, res);
};

exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout Success"
    });
};