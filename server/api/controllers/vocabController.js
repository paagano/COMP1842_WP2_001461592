// server/api/controllers/vocabController.js
const mongoose = require("mongoose");
// Import the Vocab model
const Vocab = mongoose.model("Vocab");

// HANDLER FUNCTIONS TO: List all words, create a word, read a word, update a word, delete a word
// Each function takes request and response objects as parameters
// and interacts with the Vocab model to perform database operations
// and sends back JSON responses to the client or error messages as appropriate
// Export each function to be used in routes
// Example: exports.functionName = (req, res) => { ... }

// 1. Handler Function to list all words
exports.list_all_words = (req, res) => {
  Vocab.find({}, (err, words) => {
    if (err) res.send(err);
    res.json(words);
  });
};

// 2. Handler Function to create a new word
exports.create_a_word = (req, res) => {
  const newWord = new Vocab(req.body);
  newWord.save((err, word) => {
    if (err) res.send(err);
    res.json(word);
  });
};

// 3. Handler Function to read a specific word by ID
exports.read_a_word = (req, res) => {
  Vocab.findById(req.params.wordId, (err, word) => {
    if (err) res.send(err);
    res.json(word);
  });
};

// 4. Handler Function to update a word by ID
exports.update_a_word = (req, res) => {
  Vocab.findOneAndUpdate(
    { _id: req.params.wordId },
    req.body,
    { new: true },
    (err, word) => {
      if (err) res.send(err);
      res.json(word);
    }
  );
};

// 5. Handler Function to delete a word by ID
exports.delete_a_word = (req, res) => {
  Vocab.deleteOne({ _id: req.params.wordId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "Word successfully deleted",
      _id: req.params.wordId,
    });
  });
};
