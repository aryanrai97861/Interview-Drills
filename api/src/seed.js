const mongoose = require('mongoose');
const Drill = require('./models/drill');
const { MONGO_URI } = require('./config');

const sampleDrills = [
  {
    title: 'Arrays and Loops',
    tags: ['arrays', 'basics'],
    difficulty: 'easy',
    questions: [
      { text: 'Explain how to reverse an array in place.', keywords: ['reverse', 'swap', 'in place'] },
      { text: 'How do you find the max in an array?', keywords: ['max', 'iterate', 'compare'] },
      { text: 'Describe filtering an array.', keywords: ['filter', 'predicate', 'condition'] },
      { text: 'What is array map?', keywords: ['map', 'transform'] },
      { text: 'How to remove duplicates?', keywords: ['set', 'unique', 'hash'] }
    ]
  },
  {
    title: 'Strings and Parsing',
    tags: ['strings'],
    difficulty: 'medium',
    questions: [
      { text: 'How to check palindrome?', keywords: ['reverse', 'two pointers', 'compare'] },
      { text: 'Split CSV safely?', keywords: ['split', 'quote', 'escape'] },
      { text: 'Count characters frequency', keywords: ['frequency', 'map', 'hash'] },
      { text: 'Validate email format', keywords: ['regex', 'pattern'] },
      { text: 'Trim whitespace efficiently', keywords: ['trim', 'regex', 'slice'] }
    ]
  }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB');
  await Drill.deleteMany({});
  const inserted = await Drill.insertMany(sampleDrills);
  console.log(`Inserted ${inserted.length} drills`);
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
