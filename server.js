const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Setting EJS as the view engine
app.set("view engine", "ejs");

// A test route to confirm our server is running
app.get("/", (req, res) => {
  res.send("Welcome to Musical Inventory!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
