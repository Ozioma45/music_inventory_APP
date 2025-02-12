require("dotenv").config(); // Load environment variables early

const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Replaces body-parser.json()
app.use(express.urlencoded({ extended: true })); // Replaces body-parser.urlencoded()
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // Better static path handling

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Inventory Management" });
});

app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);

// Handle 404 (Not Found)
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
