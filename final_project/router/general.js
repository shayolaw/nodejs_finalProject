const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
 const username = req.body.username;
 const password = req.body.password;
 if(!username || !password){
    res.send("Username and/or password not input");
 }
 else{
    for(i in users){
        if(users[i].username === username){
            res.send("username is taken")
        }
    }
    users.push({"username":username,"password":password});
    res.send(`user ${username} has been succesfully registered`)
 }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  var author = req.params.author
  var bookArray = Object.keys(books);

  for(var i in bookArray){
   
    if(books[bookArray[i]].author === author){
        
        res.send(books[bookArray[i]]);
    }
  }
  res.send("Author cannot be found")
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var title = req.params.title
    var bookArray = Object.keys(books);
  
    for(var i in bookArray){
     
      if(books[bookArray[i]].title === title){
          
          res.send(books[bookArray[i]]);
      }
    }
    res.send("Author cannot be found")
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
