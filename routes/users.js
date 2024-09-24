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

/* GET dictionary terms */
router.get('/dictionary', function(req, res, next) {
  res.json(dictionary);
});

module.exports = router;
