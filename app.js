//jshint esversion:6
const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const _ = require("lodash");

const mongoose = require("mongoose");





const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

let posts= [];
mongoose.connect("mongodb+srv://Arbas-Ali:ghochu01@cluster0.xhcfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);






app.get("/", function(req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
    });
  });
});






app.get("/about", function(req, res) {
  res.render("about");
});





app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/compose", function(req, res) {
  res.render("compose")

});






app.post("/compose", function(req, res) {
  const newTitle = req.body.newTitle;
  const newContent = req.body.newPost;

  const post = new Post({
    title: newTitle,
    content: newContent
  });
  post.save(function(err){
    if(!err){

      res.redirect("/");
    }
  });

});






app.get("/posts/:postid", function(req, res) {
  const requestedPostID = req.params.postid;


  Post.findOne({_id: requestedPostID}, function(err,post){
    if(!err){
      res.render("post", {title: post.title , content: post.content});
    }
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1075;
}
app.listen(port, function() {
  console.log("Server started Successfully");
});
