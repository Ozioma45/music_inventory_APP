const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../models/items");

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await getAllItems();
    res.render("items", { items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single item
router.get("/:id", async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new item
router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_id } = req.body;
    const newItem = await createItem(
      name,
      description,
      price,
      stock_quantity,
      category_id
    );
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an item
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category_id } = req.body;
    const updatedItem = await updateItem(
      req.params.id,
      name,
      description,
      price,
      stock_quantity,
      category_id
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    await deleteItem(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
