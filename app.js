require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var sequelize = require("./db");
var user = require('./controllers/usercontroller');
var coffee = require('./controllers/coffeecontroller');
var vendor = require('./controllers/vendorcontroller');

var cors = require('cors');
app.use(cors());

sequelize.sync(); // {force: true}
app.use(bodyParser.json());

app.use("/user", user);

app.use(require('./middleware/validate-session'));
app.use("/coffee", coffee);
app.use("/vendor", vendor);

app.listen(process.env.PORT, function(){
    console.log('App is listening on 3000.')
});