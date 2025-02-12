# Music Inventory App

## Live Preview

[Music Inventory App](https://music-inventory-app.onrender.com/)

## Description

The **Music Inventory App** is a simple inventory management system designed to help users manage categories and items in a music store. It allows users to add, edit, and delete categories and items efficiently while leveraging a PostgreSQL database.

## Features

- **Category Management:** Add, edit, and delete categories.
- **Item Management:** Add, edit, and delete musical items.
- **SweetAlert Integration:** Displays interactive notifications for actions like deletions.
- **Remote Database Support:** Uses a PostgreSQL database hosted remotely.
- **Responsive UI:** Built with Skeleton CSS for a lightweight and responsive design.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript)
- **Database:** PostgreSQL
- **CSS Framework:** Skeleton CSS
- **Hosting:** Render (for deployment)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/Ozioma45/music_inventory_APP.git
cd music-inventory-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure your database:

```env
DATABASE_URL=your_remote_database_url
NODE_ENV=production
```

### 4. Run Database Migrations

To create the necessary tables, run the following command:

```sh
psql "your_remote_database_url" -f setupDb/init.sql
```

Alternatively, connect to your PostgreSQL instance and execute:

```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
```

### 5. Start the Application

```sh
npm start
```

The app should be running on `http://localhost:3000` (or your configured port).

## API Routes

### Categories

- `GET /categories` - View all categories
- `GET /categories/add` - Form to add a new category
- `POST /categories/add` - Create a new category
- `GET /categories/edit/:id` - Form to edit a category
- `POST /categories/edit/:id` - Update a category
- `DELETE /categories/:id` - Delete a category

### Items

- `GET /items` - View all items
- `GET /items/add` - Form to add a new item
- `POST /items/add` - Create a new item
- `GET /items/edit/:id` - Form to edit an item
- `POST /items/edit/:id` - Update an item
- `DELETE /items/:id` - Delete an item

## Deployment

The app is deployed on Render. To deploy manually:

1. Push your latest changes to GitHub.
2. Link your GitHub repository to Render.
3. Add environment variables on Render.
4. Deploy the service.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is open-source and available under the **MIT License**.

---

Made with ❤️ by Ozioma Egole
