const router = require("express").Router();
const { signUp, login, logout } = require("../controllers/userContoller");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;