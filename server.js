const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();
const pool = require("./db");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes placeholder
app.get("/", (req, res) => {
  res.render("index", { title: "Inventory Management" });
});

// Category Routes
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/categories", categoryRoutes);

// Item Routes
const itemRoutes = require("./routes/itemRoutes");
app.use("/items", itemRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
