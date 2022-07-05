const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const user = require("./routes/user");
const reminder = require("./routes/reminder");


app.use("/api/v1", user);
app.use("/api/v1", reminder);

app.get("/", (req, res) => {
    res.send("<h1>Hello From Reminder-web-app</h1>");
});

module.exports = app;