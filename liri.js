// This makes it so the code can read and set any environment variables with the dotenv package.

var dotenv = require("dotenv").config();

// ===================== Global Variables ===================== //

// Requires
var fs = require('fs');
var request = require('request');
var Twitter =  require('twitter');
var Spotify = require('node-spotify-api');

// Grabs key data.
var keys = require('./keys.js');

// Twitter keys
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify)
// User inputs
var arguments = process.argv;
var command = process.argv[2];
var input = '';

// ===================== Functions ===================== //

// This runs if the user's input has multiple words.

for (var i = 3; i < arguments.length; i++) {
    if ( i < 3 && i < arguments.length) {
        input = input + '+' + arguments[i];
    } else {
        input = input + arguments[i];
    }
}

// Liri Commands 

switch (command) {
    case 'my-tweets':
        tweet(input);
    break;

    case 'spotify-this-song':
        if(input) {
            song(input);
        } else {
            song('The Sign');
        }
    break;

    case 'movie-this':
        movie(input);
    break;

    case 'do-what-it-says':
        doIt();
    break;

    default:
        console.log('Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says');
    break;
}

// This controls the Twitter feed.

function tweet(input) {
    var params = {screen_name: input, count: 20};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log('@nikee.test: ' + "'" + tweets[i].text + "'" + 'Created at: ' + tweets[i].created_at);

                    // This will add info to log.txt.
                    fs.appendFile('log.txt', '@nikee.test: ' + "'" + 'tweets[i].text' + "'" + 'Created at: ' + 'tweets[i].created_at');
                }
            } else {
                    console.log(error);
            }
        });
    }

// This controls the Spotify info.

function song(input) {
    spotify.search({ type: 'track', query: song}, function(error, data) {
      if (!error) {
          for (var i = 0; i < data.tracks.items.length; i++) {
              var songInfo = data.tracks.items[i];
              console.log('Artist: ' + songInfo.artists[i].name);
              console.log('Song: ' + songInfo.name);
              console.log('Preview URL: ' + songInfo.preview_url);
              console.log('Album: ' + songInfo.album.name);

              // This will add info to log.txt.
              fs.appendFile('log.txt', songInfo.artists[0].name);
              fs.appendFile('log.txt', songInfo.name);
              fs.appendFile('log.txt', songInfo.preview_url);
              fs.appendFile('log.txt', songInfo.album.name);
          }
        } else {
            console.log(error);
        }
      });  
    }


