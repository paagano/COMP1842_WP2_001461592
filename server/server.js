const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
global.Vocab = require("./api/models/vocabModel");
const routes = require("./api/routes/vocabRoutes");

// mongoose CONNECTION STRING:
// 1. Enable strict query mode to avoid deprecation warnings
mongoose.set("strictQuery", true);

// 2. Connect to the MongoDB database named "vocab-builder" running on localhost
// This assumes that MongoDB is installed and running on the default port 27017
// The database will be created automatically if it doesn't exist
// No authentication is used in this connection string
// This connection is essential for the application to interact with the database and perform CRUD operations on the vocab collection
mongoose
  .connect("mongodb://localhost/vocab-builder")
  .then(() => {
    console.log("✅ Successfully connected to MongoDB (vocab-builder)");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });

// Set up the server
// Use the PORT environment variable if available, otherwise default to port 3000
// Create an Express application instance
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*"; // origin: "*" - Allowing requests from any origin
const app = express();

// MIDDLEWARES: Initialize middlewares for CORS and body parsing
// 1. CORS Middleware
// Allowing only requests from this origin
// Alt: app.use(cors());
// Alt: app.use(cors({origin: '*'}));
app.use(
  cors({
    origin: CORS_ORIGIN, // Allowing requests from this origin
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed Methods
    credentials: true, // Allowing cookies to be sent
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// 2. Request Handler Middleware. Alt: <Bodyparser></Bodyparser>
// This will parse the incoming request body in JSON format and make it available under req.body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// ROUTES:
// Initialize the routes by passing the app instance to the routes function
// This sets up all the API endpoints defined in vocabRoutes.js
// The routes handle requests for listing, creating, reading, updating, and deleting vocabulary words
// This keeps the server.js file clean and delegates route management to a separate module
routes(app);

// Start the server
app.listen(PORT);

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` }); // Send a 404 response with the original URL
});

// Log a message when the server starts
console.log(`Server started on port ${PORT}`);
