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

const getBooks =()=>{
    return new Promise((resolve,reject)=>{
        setTimeout (()=>{
            resolve(books);
        },1000);
    })

}
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    getBooks()
    .then((books) => {
      res.send(JSON.stringify(books));
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    getBooks()
    .then((books)=>{
        res.send(books[isbn])
    })
    .catch((error)=>{
        res.status(500).send({error})
    })
   
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  var author = req.params.author
  getBooks()
  .then((books)=>{
    var bookArray = Object.keys(books);

    for(var i in bookArray){
     
      if(books[bookArray[i]].author === author){
          
          res.send(books[bookArray[i]]);
      }
    }
  })
  .catch((error)=>{
    res.status(500).send(error)
  })

 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var title = req.params.title
    getBooks()
    .then((books)=>{
      var bookArray = Object.keys(books);
  
      for(var i in bookArray){
     
        if(books[bookArray[i]].title === title){
            
            res.send(books[bookArray[i]]);
        }
      }
    })
    .catch((error)=>{
      res.status(500).send(error)
    })
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
