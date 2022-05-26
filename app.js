//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date)


const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {

const day = date.getDate();

res.render("lists", {listTitle: day , newItems: items});

});

app.post("/", function(req, res){

    const item = req.body.newItems

  if(req.body.list === "Work-List"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");

  }
  });

  app.get("/work", function(req, res){
    res.render("lists", {listTitle: "Work-List", newItems: workItems});
  });

  app.get("/about", function(req, res){
    res.render("about");
  });

app.listen(3000, function() {
  console.log("The server has started on port 3000");
});
