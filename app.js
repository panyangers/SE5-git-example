const express = require('express');
const mongoose = require('mongoose');
const { DATABASE, PORT } = require('./constants');

const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());
// Use EJS for templating
app.set('view engine', 'ejs');
// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Connect to MongoDB using Mongoose for schema-based operations
mongoose.connect(`${DATABASE.uri}/${DATABASE.name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the Mongoose Schema and Model
const cardSchema = new mongoose.Schema(DATABASE.cardSchema);
const CardModel = mongoose.model(DATABASE.collection, cardSchema);

// Route to render the cards from the database
app.get('/', async (req, res) => {
  try {
    const cardsData = await CardModel.find().sort({ upvotes: -1 });  // Sort by cardNumber
    res.render('cardTemplate', { cardsData });  // Render cardTemplate.ejs and pass cardsData
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching cards');
  }
});

// Route to handle upvotes and downvotes
app.post('/vote/:id', async (req, res) => {
  const cardId = req.params.id;  // Get the card ID from the request params
  const voteType = req.body.voteType;  // Get the vote type (up or down) from the request body

  try {
    const card = await CardModel.findById(cardId);  // Find the card by its ID

    if (!card) {
      return res.status(404).send('Card not found');
    }

    // Update the votes based on the voteType
    if (voteType === 'up') {
      card.upvotes += 1;  // Increment upvotes
    } else if (voteType === 'down') {
      card.downvotes += 1;  // Increment downvotes
    }

    await card.save();  // Save the updated card in the database
    res.json({ upvotes: card.upvotes, downvotes: card.downvotes });  // Respond with the updated votes
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating vote count');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
