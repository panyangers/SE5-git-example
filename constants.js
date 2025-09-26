/* Pre-Defined Constants */
const PORT = 3000;
const DATABASE = {
  uri: 'mongodb://localhost:27017',
  name: 'cards_database',
  collection: 'cards',
  cardSchema: {
    title: String,
    article: String,
    source: String,
    logo: String,
    cardNumber: Number, // Add cardNumber for sorting
    upvotes: { type: Number, default: 0 },  // Tracks upvotes, initialized to 0
    downvotes: { type: Number, default: 0 }  // Tracks downvotes, initialized to 0
  }
};

module.exports = { 
  DATABASE,
  PORT
};