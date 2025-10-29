# DEVHUB: Hackathon Management Portal (MERN Stack)

Hey there! 👋 This is a full-stack website built to run a hackathon, made with the **MERN** stack (MongoDB, Express, React, Node.js). It handles everything from getting users signed up and into teams, right through to submitting their projects for the judges.

## 🚀 Check it out Live!

* **Frontend:** `[YOUR-NETLIFY-LINK.netlify.app]`
* **Backend API:** `[YOUR-RENDER-API-LINK.onrender.com]`



## ✨ What it Can Do

* **Sign Up & Login:** Users can create accounts and log in securely. Uses **JWT** for authentication, and passwords get hashed with **bcryptjs**.
* **Team Up!:** Once logged in, you can create your own team (and get a unique code via `shortid`) or join someone else's team using their code.
* **Submit Your Project:** Got your hackathon project ready? Teams can submit their details (title, description, GitHub link, demo link) through a simple form. You can update it later if needed.
* **Keeps You Logged In:** The frontend uses **React Context API** to manage global authentication state, keeping track of the logged-in user and their token.
* **Protected Routes:** Frontend routes (`/dashboard`, `/team`, `/project`, `/admin`) are protected, redirecting unauthorized users.
* **Admin Powers:** There's a special `/admin` dashboard that only users with the "admin" role can access. This uses role-based access control **middleware** on the backend.
* **Judging Panel:** From the admin dashboard, admins can see tables of *all* registered users and *all* submitted projects (populated with team names via **Mongoose**), making it easy to review everything.




## 🛠️ Tech Stack & Details

### Backend (Server)

* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Cloud hosted on MongoDB Atlas)
* **ODM:** Mongoose (for modeling data and connecting `User`, `Team`, `Project` collections)
* **Authentication:** JWT (jsonwebtoken) for generating tokens, bcryptjs for password hashing
* **API Design:** RESTful API structure with separate route files (`auth`, `teams`, `projects`, `admin`)
* **Middleware:** Custom middleware for token verification (`authMiddleware`) and admin role checking (`adminMiddleware`)
* **Other Packages:** `cors`, `dotenv`, `shortid`
* **Module System:** CommonJS (`require`, `module.exports`)

### Frontend (Client)

* **Library:** React.js
* **Routing:** React Router (`react-router-dom`) for handling page navigation
* **UI Components:** Chakra UI for pre-built, accessible components and theming
* **State Management:** React Context API (`AuthContext`) for global authentication state
* **API Calls:** Axios for making requests to the backend API
* **Module System:** ES6 Modules (`import`, `export`)

### Development & Testing Tools

* **Version Control:** Git & GitHub
* **API Testing:** Postman
* **Code Editor:** VS Code

## 🏁 How to Run it Locally

Want to run this on your own machine? You'll need Node.js and a MongoDB database (like a free one from MongoDB Atlas).

You'll need **two terminals** open because the frontend and backend run separately.

### 1. Get the Backend Running

```bash
# First, grab the code
git clone [https://github.com/Ajajay44/DEVHUB-Hackathon-Management-Website.git](https://github.com/Ajajay44/DEVHUB-Hackathon-Management-Website.git)

# Go into the server folder
cd DEVHUB-Hackathon-Management-Website/server

# Install all the backend packages
npm install

# IMPORTANT: Create a file named .env in this /server folder.
#            Put these two lines in it (with your real values):
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=make_up_a_long_random_secret_key

# Now, start the server!
npm start

Your backend API should now be running on http://localhost:5000.


