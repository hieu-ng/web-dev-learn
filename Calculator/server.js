xconst express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmiCalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res) {

  var result = Number(req.body.weight) / Math.pow(Number(req.body.height), 2);

  res.send("BMI: " + result.toFixed(1));
});

app.listen(port, function() {
  console.log("Server starts on port 3000");
});
