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

// User inputs
var arguments = process.argv;
var command = arguments[2];

// Input for movie, song.
var input = arguments[3];

// ===================== Functions ===================== //

// Liri Commands 

switch (command) {
    case 'my-tweets':
        tweet();
    break;

    case 'spotify-this-song':
    if (input) {
        spotify(input)
    } else {
        spotify('The Sign');
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

function tweet() {
    // This will display the last 20 tweets.
    var params = {screen_name: input, count: 20};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log('Tweet ' + "'" + tweets[i].text + "'" + 'Created at: ' + tweets[i].created_at);
                    console.log('------------------------');

                    // This will add info to log.txt.
                    fs.appendFile('log.txt', input + "'" + 'tweets[i].text' + "'" + 'Created at: ' + 'tweets[i].created_at');
                    fs.appendFile('log.txt', '------------------------');
                }
            } else {
                    console.log(error);
            }
        });
    }

// This controls the Spotify info.

function spotify(input) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: input}, function(error, data) {
        
        if (!error) {
            var songInfo = data.tracks.items;
              console.log('Artist: ' + songInfo[0].artists[0].name);
              console.log('Song: ' + songInfo[0].name);
              console.log('Preview URL: ' + songInfo[0].preview_url);
              console.log('Album: ' + songInfo[0].album.name);
              console.log('------------------------');

              // This will add info to log.txt.
              fs.appendFile('log.txt', songInfo[0].artists[0].name);
              fs.appendFile('log.txt', songInfo[0].name);
              fs.appendFile('log.txt', songInfo[0].preview_url);
              fs.appendFile('log.txt', songInfo[0].album.name);
              fs.appendFile('log.txt', '------------------------');
          } else {
            console.log(error);
        }  
    });
}

