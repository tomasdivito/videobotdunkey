var fs = require("fs");
var twit = require("twit");
var config = require("./config.js")

var lines = JSON.parse(fs.readFileSync('lines.json', 'utf8'));

var Twitter = new twit(config);

// Tweet format 
// TODO: Generate a JSON with a random order every day 
// or something around those lines.
var rnd = Math.ceil(Math.random() * (lines.length - 1));
var line = lines[rnd];

// Format
// TODO: Use a damn package for this crap
line.text = line.text.replace(/&#39;/g, "'")
                     .replace(/&quot;/g, "\"");


// TODO: This whole thing could be better.
var url = "https://youtu.be/{video}?t={time}s"
var tweet = line.text + " " + url
  .replace("{video}", line.video).replace("{time}", Math.ceil(line.time));

if (tweet.length > 144) {
  let diff = (tweet.length - 144) + 1;
  line.text = line.text.slice(diff);
  var tweet = line.text + "… " + url
    .replace("{video}", line.video).replace("{time}", Math.ceil(line.time));
}

Twitter.post("statuses/update", {status: tweet}, (err, data) => {
  console.log(data);
});