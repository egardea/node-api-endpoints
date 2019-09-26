// setup
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const fake_database = [
  {
    id: 1,
    name: 'Erik',
    age: 26
  },
  {
    id: 2,
    name: 'Carmen',
    age: 20
  }
];

app.get("/", (request, response) => {
  response.json(fake_database);
});

app.get("/user/:id", (request, response) => {
  //get the id parameter
  const { id } = request.params;

  //filter the database for the user that matches params
  const searchUsersById = fake_database.filter((user) =>{
    if(user.id === +id) return user;
  });

  //send 
  response.json(searchUsersById);

});

app.post("/user/new/", (request, response) =>{
  //retrieve name and age from request.body
  const { name, age } = request.body;

  //generate an ID for the fake_database
  const id = fake_database.length + 1;

  //new user object
  const newUser = {
    id,
    name,
    age,
  };
  
  //add the new user to the database
  fake_database.push(newUser);

  //send success back in the response
  response.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
