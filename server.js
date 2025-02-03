const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const homeRoutes = require("./routes/index");
const categoryRoutes = require("./routes/categories");
const itemRoutes = require("./routes/items");

const { Category, Item } = require("./models");

// Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // Serve static files

// Setting EJS as the view engine
app.set("view engine", "ejs");

//routes
app.use("/", homeRoutes);
app.use("/categories", categoryRoutes);
app.use("/items", itemRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
