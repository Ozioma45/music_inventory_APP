const express = require("express");
const { Category } = require("../models");
const router = express.Router();

// GET Home Page
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("home", { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching categories");
  }
});

module.exports = router;
