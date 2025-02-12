const pool = require("./db"); // Ensure this is your database connection file

const createTables = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
    );`;

    try {
        await pool.query(query);
        console.log("Tables created successfully!");
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        pool.end(); // Close the database connection
    }
};

createTables();
