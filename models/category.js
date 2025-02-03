const pool = require("../db");

// Get all categories
const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY name;");
  return result.rows;
};

// Get category by ID
const getCategoryById = async (id) => {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1;", [
    id,
  ]);
  return result.rows[0];
};

// Create a new category
const createCategory = async (name, description) => {
  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;",
    [name, description]
  );
  return result.rows[0];
};

// Update category
const updateCategory = async (id, name, description) => {
  const result = await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *;",
    [name, description, id]
  );
  return result.rows[0];
};

// Delete category
const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categories WHERE id = $1;", [id]);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
