// Import mongoose to define the schema
const mongoose = require("mongoose");

// Create a Schema object
const Schema = mongoose.Schema;

// Define the Vocab schema with english, german and swahili fields
const VocabSchema = new Schema(
  {
    english: {
      type: String,
      required: "English word cannot be blank",
    },
    german: {
      type: String,
      required: "German word cannot be blank",
    },
    swahili: {
      type: String,
      required: "Swahili word cannot be blank",
    },
  },

  // Specify the collection name (as "vocab") to avoid automatic pluralization which would change it to "vocabs"
  // This ensures consistency with existing data and avoids confusion
  { collection: "vocab" }
);

// Export the model
// The model is named "Vocab" and uses the VocabSchema
// This makes the model accessible via mongoose.model("Vocab") in other files
// This is important for the controller to interact with the database and perform CRUD operations on the vocab collection
module.exports = mongoose.model("Vocab", VocabSchema);
