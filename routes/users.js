var express = require('express');
var router = express.Router();

// Mock dictionary data (replace this with a real database in production)
const dictionary = [
  { word: 'apple', definition: 'A round fruit with red or green skin and white flesh' },
  { word: 'book', definition: 'A written or printed work consisting of pages glued or sewn together along one side' },
  { word: 'computer', definition: 'An electronic device for storing and processing data' },
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET dictionary terms */
router.get('/dictionary', function(req, res, next) {
  res.json(dictionary);
});

module.exports = router;
