const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
let user = users.filter((user)=>user.username===username && user.password===password)
if(user.length>0){
    return true;
}
return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const {username,password} = req.body;

    if(!username || !password){
      res.send("Error Logging in")
    }
    if(authenticatedUser(username, password)) {
      let accessToken = jwt.sign({
          data: password
      }, 'access', {expiresIn: 60*60});
      req.session.authorization = {
          accessToken, username
      }
      return res.status(200).send("User successfully logged in");
    }
    else{
    return res.status(208).json({message: "Invalid Login"});
    }
  });
const checkUserReview = (book,user) =>{
    if(book.reviews[user]){
        return true;
    }
    return false;

}
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    
    const isbn = req.params.isbn;
    const user = req.session.authorization['username'];
    const review = req.body.review;
    let book = books[isbn];
    
    if(checkUserReview(book,user)){
        book.reviews[user] = review;
      
    }
    else{
        book.reviews[user] = review;
       
    }

    books[isbn] = book; 
    res.send(books);
});
regd_users.delete("/auth/review/:isbn",(req,res)=>{
    const user = req.session.authorization['username'];
    const review = req.body.review;
    const isbn = req.params.isbn
    let book = books[isbn];
    if(checkUserReview(book,user)){
        delete book.reviews[user];
    }
    books[isbn] = book;
    res.send(books);
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
