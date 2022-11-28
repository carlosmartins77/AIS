const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 7080;
const jwt = require("jsonwebtoken");
const password = process.env.PASSWORD
const connectDB = require("./moongoDB");
const bodyParser = require('body-parser');
const cors = require('cors');
const secretKey = '<SECRETKEY>';
//const swaggerUi = require('swagger-ui-express')
//const configswagger = require('./swaggerconfig')

// Connect to Data Base
connectDB();

app.use(express.json());
app.use(cors());


app.use("/", require("./controller/routes/funcroutes"))
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(configswagger))

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});




