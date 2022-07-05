const app = require("./app");
const connectDB = require("./configs/db");
require("dotenv").config();

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
});