const pool = require("../db");

// Get all items
const getAllItems = async () => {
  const result = await pool.query("SELECT * FROM items ORDER BY name;");
  return result.rows;
};

// Get item by ID
const getItemById = async (id) => {
  const result = await pool.query("SELECT * FROM items WHERE id = $1;", [id]);
  return result.rows[0];
};

// Create a new item
const createItem = async (
  name,
  description,
  price,
  stock_quantity,
  category_id
) => {
  const result = await pool.query(
    "INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [name, description, price, stock_quantity, category_id]
  );
  return result.rows[0];
};

// Update item
const updateItem = async (
  id,
  name,
  description,
  price,
  stock_quantity,
  category_id
) => {
  const result = await pool.query(
    "UPDATE items SET name = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5 WHERE id = $6 RETURNING *;",
    [name, description, price, stock_quantity, category_id, id]
  );
  return result.rows[0];
};

// Delete item
const deleteItem = async (id) => {
  const result = await pool.query("DELETE FROM items WHERE id = $1;", [id]);
  return result;
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
