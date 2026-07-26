var express = require("express");
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();   
app.use(express.json());
// Middleware
app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Routers
var policyRouter = require("./routers/policyRouter");
var customerRouter = require("./routers/customerRouter");
var premiumRouter = require("./routers/premiumRouter");
var claimRouter = require("./routers/claimRouter");
var authRouter = require('./routers/authRouter');
var userRouter = require("./routers/userRouter");

app.use("/api/policies", policyRouter);
app.use("/api/customers", customerRouter);
app.use("/api/premiums", premiumRouter);
app.use("/api/claims", claimRouter);
app.use('/api/auth',authRouter);
app.use("/api/users",userRouter);


app.listen(5000, () => {
    console.log("Server listening on port 5000");
});