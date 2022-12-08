const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 7060;
const jwt = require("jsonwebtoken");
const connectDB = require("./moongoDB");
const cors = require('cors');

// Connect to Data Base
connectDB();

app.use(express.json());
app.use(cors());


app.use("/", require("./controller/routes/logcontroller"))

app.use('/apidocjs',express.static('./static/apidoc'));


app.listen(PORT, () => {
    console.log(`Log-Service at ${PORT}`);
});




