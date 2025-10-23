# 🍳 Recipe Finder

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** application that allows users to search, discover, and save their favorite recipes.  
The app features a clean UI with search functionality, random recipe generation, authentication, and user-specific favorites.

---

## 🚀 Features

### 🌐 Navigation
- **Home** – Search recipes by ingredient or name.  
- **Home(Footer)** – shows the favourite list.
- **About** – Information about the application.  
- **Random Recipe** – Fetch a random recipe with a single click.  
- **Login / Signup** – User authentication and registration.

### 🏠 Home Page
- Search recipes by entering keywords (ingredient or recipe name).  
- Displays search results dynamically in a results section.  
- Click on a recipe card to open a **Recipe Modal** showing detailed information (ingredients, instructions, etc.).

### 🎲 Random Recipe
- Contains a **“Get Random Recipe”** button.  
- On click, a random recipe is fetched and displayed.  
- Clicking the recipe opens a **Recipe Modal** with complete details.

### 🔐 Authentication
- **Login Page** – Existing users can log in with email and password.  
- **Signup Page** – New users can register with their details.  
- Authentication is managed using **JWT (JSON Web Tokens)** and **bcrypt** for password hashing.

### ❤️ Favorite Recipes
- Logged-in users can save their favorite recipes.  
- Favorites are stored securely in the user’s account and can be viewed later.

---

## 🧩 Tech Stack

**Frontend:**
- React.js
- React Router
- Axios and Fetch
- CSS 

**Authentication & Security:**
- bcrypt.js – Password hashing  
- JWT – Secure authentication and session management  
- dotenv – Environment variable management
