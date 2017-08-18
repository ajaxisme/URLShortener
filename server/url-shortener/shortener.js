const base = require("base-converter");

var URLModifier = function(db) {
  var self = this;

  this.database = "SQLite";
  this.url_list = [];

  this.initial_urls = [
    "news.ycombinator.com",
    "techcrunch.com",
    "google.com",
    "https://www.reuters.com/article/us-usa-trump-idUSKCN1AY1WH"
  ];

  function initialize_url_list() {
    this.shortened_list = this.initial_urls.map(function(url) {
      return self.shorten_url(url);
    });
  }

  initialize_url_list.call(this);
};

URLModifier.prototype.shorten_url = function(long_url) {

  // Strip http/https
  if(long_url.startsWith("http")){
    long_url = long_url.replace(/^https?:\/\//,'');
  }

  // Shortening steps
  /*
    1. Add new url to the url_map
    2. Find the index at which it is inserted
    3. Convert to base62
    4. Find the corresponding character in [a-zA-Z0-9]
    5. Return formed string
  */

  this.url_list.push(long_url);
  const index = this.url_list.length - 1;
  var short_id = base.decTo62(index);

  return short_id;
};

URLModifier.prototype.get_original_url = function(short_id) {

  const index = base._62ToDec(short_id);
  return this.url_list[short_id];
};

module.exports = URLModifier;
