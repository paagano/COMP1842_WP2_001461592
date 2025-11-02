// server/api/routes/vocabRoutes.js
// Import the controller
// Define the routes and map them to controller functions
// Export the router

const vocabBuilder = require("../controllers/vocabController");

module.exports = (app) => {
  app
    .route("/words")
    .get(vocabBuilder.list_all_words)
    .post(vocabBuilder.create_a_word);

  app
    .route("/words/:wordId")
    .get(vocabBuilder.read_a_word)
    .put(vocabBuilder.update_a_word)
    .delete(vocabBuilder.delete_a_word);
};
