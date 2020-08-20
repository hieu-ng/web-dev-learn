//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is home";
const aboutContent = "This is about";
const contactContent = "This is contact";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)  => {
  res.render("home", {pageTitle: "Home", pageSummary: homeStartingContent, myPosts: posts});
});

app.get("/about", (req, res)  => {
  res.render("about", {pageTitle: "About",pageSummary: aboutContent});
});

app.get("/contact", (req, res)  => {
  res.render("contact", {pageTitle: "Contact",pageSummary: contactContent});
});

app.get('/compose', (req, res) => {
  res.render("compose", {pageTitle: "Compose"});
});

app.post('/compose', (req,res) => {
  const post = {
    title: req.body.inputTitle,
    body: req.body.inputBody,
  };
  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:postTitle', (req, res) => {
  posts.forEach((i) => {
    if(_.lowerCase(i.title) === _.lowerCase(req.params.postTitle)) {
      res.render('post', {postTitle: i.title, postBody: i.body});
    } else {
      console.log('error');
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
