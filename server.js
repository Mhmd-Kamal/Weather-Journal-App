// jshint esversion:6

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
// server listen
const port = 3000;
app.listen(port, function () {
  console.log(`server started at port ${port}`);
});

app.post("/newLocation", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
});

app.get("/locationData", (req, res) => {
  console.log(projectData);
  res.send(projectData);
});
