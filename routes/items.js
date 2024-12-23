const express = require("express");
const { Category, Item } = require("../models");
const router = express.Router();

// GET items by category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.categoryId, {
      include: "items",
    });
    res.render("items/index", { category });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching items");
  }
});

// GET form to create a new item
router.get("/new", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("items/new", { categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching categories");
  }
});

// POST create a new item
router.post("/", async (req, res) => {
  try {
    const { name, category_id, price, quantity, description } = req.body;
    await Item.create({ name, category_id, price, quantity, description });
    res.redirect(`/items/category/${category_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating item");
  }
});

// DELETE an item
router.post("/:id/delete", async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
    res.redirect(`/items/category/${item.category_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item");
  }
});

module.exports = router;
