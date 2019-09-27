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

app.put("/user/update/name/", (request, response) => {
  //get the ID and name from the body
  const { id, name } = request.body;

  //loop through the database
  fake_database.forEach((user) => {
    if(user.id === +id){
      user.name = name;
    }
  });

  //send
  response.json({ success: true });


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

app.delete("/user/delete/:id", (request, response) => {
  //get id parameter
  const { id } = request.params;

  //filter through the database and delete the user
  const findIndexToDelete = fake_database.findIndex((user) => user.id === +id);

  //and remove the user that matches
  fake_database.splice(findIndexToDelete, 1);

  response.json({ success: true });

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
