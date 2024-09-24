var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

// Read dictionary data from JSON file
const dictionaryPath = path.join(__dirname, '..', 'dictionary.json');
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET all dictionary terms */
router.get('/dictionary', function(req, res, next) {
  res.json(Object.values(dictionary));
});

/* GET specific dictionary term */
router.get('/dictionary/:word', function(req, res, next) {
  const word = req.params.word.toLowerCase();
  if (dictionary[word]) {
    res.json(dictionary[word]);
  } else {
    res.status(404).json({ error: 'Word not found' });
  }
});

module.exports = router;
