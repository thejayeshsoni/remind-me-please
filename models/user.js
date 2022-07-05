const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "Password should be atleast 6 characters..!!"]
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    /**
    * if the password field is modified then only encryption is going to work otherwise not...
    */
    this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
userSchema.methods.isValidPassword = async function (userSendedPassword) {
    return await bcrypt.compare(userSendedPassword, this.password);
};

// create and return a JWT
userSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};

module.exports = mongoose.model("User", userSchema);