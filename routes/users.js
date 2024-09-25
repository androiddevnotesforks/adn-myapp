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

/* GET all dictionary terms with pagination */
router.get('/dictionary', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  const totalItems = Object.keys(dictionary).length;

  if (endIndex < totalItems) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  results.totalPages = Math.ceil(totalItems / limit);
  results.currentPage = page;
  results.items = Object.values(dictionary).slice(startIndex, endIndex);

  res.json(results);
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
