const router = require("express").Router();
const { createReminder, updateReminder, deleteReminder, getAllReminder, sendMail } = require("../controllers/reminderController");
const { isLoggedIn } = require("../middlewares/user");


router.route("/reminders/").get(isLoggedIn, getAllReminder);
router.route("/reminder/create").post(isLoggedIn, createReminder);
router.route("/reminder/update/:reminderId").patch(isLoggedIn, updateReminder);
router.route("/reminder/delete/:reminderId").delete(isLoggedIn, deleteReminder);
router.route("/reminder/sendMail/:reminderId").post(isLoggedIn, sendMail);

module.exports = router;