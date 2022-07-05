const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log(`DB got connected..!!`))
        .catch(error => {
            console.log(`DB connection issues\n${error}`);
            process.exit(1);
        });
};

module.exports = connectDB;