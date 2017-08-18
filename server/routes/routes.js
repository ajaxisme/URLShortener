const express = require('express');

const router = express.Router();

const URLModifier = require('../url-shortener/shortener');

var urlModifier = new URLModifier("url_store");

// Add some values

router.get('/', function(req, res) {
  return res.status(404).send('<h1>URL Shortener</h1>');
});

router.get('/shortenURL', function(req, res) {

  var short_id = urlModifier.shorten_url(req.query.url);

  return res.status(200).json({
    "status" : "Success",
    "short_id" : short_id
  });
});

router.get('/:short_id', function(req, res) {

  // Find corresponding long url

  const short_id = req.params.short_id;
  var long_url = urlModifier.get_original_url(short_id);

  if(!long_url) {
    return res.status(404).send('<h1>Page not found</h1>');
  }
  else {
    long_url = "http://" + long_url;
    return res.status(302).redirect(long_url);
  }
});

module.exports = router;
