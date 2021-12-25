const express = require('express');
const route = require("./Route/route")
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser())
app.use(express.json())
app.use(route)

app.listen(8000, () => {
    console.log("Running... ");
})