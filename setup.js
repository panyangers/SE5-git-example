const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { DATABASE } = require('./constants');

// Define the Mongoose Schema and Model
const cardSchema = new mongoose.Schema(DATABASE.cardSchema);
const CardModel = mongoose.model(DATABASE.collection, cardSchema);

// Connect to MongoDB using MongoClient (for server setup and data cleanup)
const client = new MongoClient(DATABASE.uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect()
  .then(() => {
    console.log('MongoDB connected');
    // Clean up old DB records to ensure data integrity
    const db = client.db(DATABASE.name);
    const cards = db.collection(DATABASE.collection);
    cards.deleteMany({})
      .then(result => {
        console.log(`${result.deletedCount} documents were deleted`);
      })
      .catch(err => {
        console.error('Error deleting documents:', err);
      });
  })
  .catch(err => {
    console.log(err);
  });

// Create and save new card entries
const newCard1 = new CardModel({
  title: "What is AI (Artificial Intelligence)?",
  article:`Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. 
           Examples of AI applications include expert systems, natural language processing (NLP), speech recognition, and machine vision.`,
  source: "TechTarget.com",
  logo: "/images/ai-pic.jpg",
  cardNumber: 1
});

const newCard2 = new CardModel({
  title: "How does AI work?",
  article: `AI systems analyze large amounts of labeled data to detect patterns and make predictions.
            For example, an AI chatbot learns to mimic human conversation from text examples, while an image recognition tool identifies objects by reviewing images.
            Generative AI, which has rapidly evolved, can now create realistic text, images, music, and other media.
            AI programming focuses on cognitive skills like:
            Learning: Acquiring data and developing algorithms to transform it into actionable information.
            Reasoning: Selecting the appropriate algorithm to achieve a goal.
            Self-correction: Continuously improving algorithms for accuracy.
            Creativity: Using AI techniques like neural networks to generate new content, such as text, images, and music.`,
  source: "TechTarget.com",
  logo: "/images/ai-flow.png",
  cardNumber: 2
});

const newCard3 = new CardModel({
  title: "Why AI is important?",
  article: `AI is transforming how we live, work, and play.AI is transforming how we live, work, and play. 
            It’s widely used in business to automate tasks like customer service, fraud detection, and quality control.
            AI excels at repetitive, detail-oriented jobs, such as analyzing legal documents, and provides businesses with insights from large data sets.
            The rise of generative AI is impacting fields like education, marketing, and product design. 
            AI’s advancements have fueled efficiency and opened new business opportunities, such as Uber’s on-demand ride service.
            Major companies like Alphabet, Apple, Microsoft, and Meta use AI to optimize operations and stay ahead of competitors.
            At Google, AI powers the search engine, autonomous vehicles through Waymo, and breakthroughs like the transformer model behind OpenAI's ChatGPT.`,
  source: "TechTarget.com",
  logo: "/images/ai-robot.jpg",
  cardNumber: 3
});

const newCard4 = new CardModel({
  title: "Advantages and Disadvantages of Artificial Intelligence",
  article:`AI excels in tasks like detecting patterns, improving efficiency in data-heavy industries, and automating repetitive or hazardous jobs. 
           It provides consistent results, personalizes user experiences, operates 24/7, scales easily, and accelerates research. 
           AI also helps optimize workflows and contributes to sustainability efforts.
           However, AI development is costly and technically complex, requiring specialized expertise that is in short supply. 
           It can perpetuate biases, struggles to generalize, and raises concerns about job displacement. 
           AI is vulnerable to security threats, has a significant environmental impact, and presents legal challenges around privacy, intellectual property, and liability.`,
  source: "TechTarget.com",
  logo: "/images/ai-mind.avif",
  cardNumber: 4
});

const newCard5 = new CardModel({
  title: "Strong and Weak AI",
  article:`AI can be categorized into two types: narrow (or weak) AI and general (or strong) AI. Narrow AI refers to models trained for specific tasks, 
           such as virtual assistants like Siri or recommendation engines on platforms like Spotify. It operates within the scope of its programming without the 
           ability to generalize or learn beyond its initial task. General AI, which does not yet exist, would be capable of performing any intellectual task that 
           a human can. It would require reasoning across multiple domains and handling uncertainty through fuzzy logic. The creation of general AI is still debated,
           and even advanced systems like ChatGPT cannot match human cognitive abilities or generalize across diverse situations.`,
  source: "TechTarget.com",
  logo: "/images/ai-circuit.avif",
  cardNumber: 5
});

// save all the default cards
newCard1.save();
newCard2.save();
newCard3.save();
newCard4.save();
newCard5.save();

console.log("Database setup (wipe & add new starting data) completed successfully!");
