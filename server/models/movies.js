var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "rating": {
    "max": Number,
    "average": Number,
    "stars": String,
    "min": Number
  },
  "genres": Array,
  "title": String,
  "casts": [{
    "alt": String,
    "avatars": {
      "small": String,
      "large": String,
      "medium": String
    },
    "name": String
  }],
  "collect_count": Number,
  "original_title": String,
  "subtype": String,
  "directors": [
    {
      "alt": String,
      "avatars": {
        "small": String,
        "large": String,
        "medium": String
      },
      "name": String
    }
  ],
  "year": String,
  "images": {
    "small": String,
    "large": String,
    "medium": String
  },
  "alt": String
});
module.exports = mongoose.model('Movie', userSchema);

