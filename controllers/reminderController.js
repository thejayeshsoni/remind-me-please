const Reminder = require("../models/remind");
const mailHelper = require("../utils/emailHelper");

exports.createReminder = async (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        req.body.user = req.user.id;
        const reminder = await Reminder.create(req.body);
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.updateReminder = async (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        req.body.user = req.user.id;
        req.body.modifiedOn = Date.now();
        const updatedReminder = await Reminder.findByIdAndUpdate(req.params.reminderId || req.query.reminderId, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            updatedReminder
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.reminderId);
        if (!reminder) {
            return res.status(401).josn({ message: "No such reminder Found..!!" });
        }
        await reminder.remove();
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllReminder = async (req, res) => {
    try {
        const reminder = await Reminder.find({ user: req.user.id });
        if (!reminder) {
            return res.status(401).josn({ message: "No such reminder Found..!!" });
        }
        res.status(200).json({
            success: true,
            reminder
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.sendMail = async (req, res) => {
    const reminder = await Reminder.findById(req.params.reminderId);
    try {
        // craft a message
        const messageToSendInEmail = `Title : ${reminder.title}\n\nMessage : ${reminder.message}`;
        await mailHelper({
            toEmail: req.user.email,
            subject: `Reminding you about...${reminder.title}`,
            messageToSendInEmail
        });
        res.status(200).json({
            success: true,
            message: "Email sent successfully...!!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in sending mail...!!",
            error
        });
    }
};