const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Read dictionary data from JSON file
const dictionaryPath = path.join(__dirname, '..', 'dictionary.json');
let dictionary;

// Async function to load dictionary
async function loadDictionary() {
  try {
    const data = await fs.readFile(dictionaryPath, 'utf8');
    dictionary = JSON.parse(data);
  } catch (error) {
    console.error('Error loading dictionary:', error);
    dictionary = {};
  }
}

// Load dictionary on startup
loadDictionary();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/* GET all dictionary terms */
router.get('/dictionary', (req, res) => {
  res.json(Object.values(dictionary));
});

/* GET dictionary terms by tag */
router.get('/dictionary/tag/:tag', (req, res) => {
  const tag = req.params.tag.toLowerCase();
  const matchingTerms = Object.values(dictionary).filter(term => 
    term.tags.some(t => t.toLowerCase() === tag)
  );
  
  if (matchingTerms.length > 0) {
    res.json(matchingTerms);
  } else {
    res.status(404).json({ error: 'No terms found with this tag' });
  }
});

/* GET specific dictionary term */
router.get('/dictionary/:word', (req, res) => {
  const word = req.params.word.toLowerCase();
  if (dictionary[word]) {
    res.json(dictionary[word]);
  } else {
    res.status(404).json({ error: 'Word not found' });
  }
});

module.exports = router;
