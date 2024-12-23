const express = require("express");
const { Category, Item } = require("../models");
const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("categories/index", { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching categories");
  }
});

// GET form to create a new category
router.get("/new", (req, res) => {
  res.render("categories/new");
});

// POST create a new category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.create({ name, description });
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating category");
  }
});

// GET form to edit a category
router.get("/:id/edit", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render("categories/edit", { category });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching category");
  }
});

// POST update a category
router.post("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.update(
      { name, description },
      { where: { id: req.params.id } }
    );
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating category");
  }
});

// DELETE a category
router.post("/:id/delete", async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting category");
  }
});

module.exports = router;
