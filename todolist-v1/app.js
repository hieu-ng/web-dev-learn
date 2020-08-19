//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items= ['hello'];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));  

app.get("/", function(req, res){
  
  var today = new Date();

  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString('en-US', options);
  res.render('list', {curDay: day, newItemList: items});
});

app.post("/", (req,res) => {
  items.push(req.body.newItem);

  res.redirect("/");

});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
}); 

// module.exports = router;