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

// Input for movie, song. In order to work properly put replace spaces with a '+'.
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
    if (input) {
        movies(input)
    } else {
        movies('Mr. Nobody');
    }
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

// This controls the movie search.

function movies(input) {
    var omdbURL = 'http://www.omdbapi.com/?t=' + input + '&apikey=trilogy&'
    
    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log('Title: ' + body.Title);
            console.log('Release Year: ' + body.Year);
            console.log('IMDB Rating: ' + body.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + body.Ratings[1].Value);
            console.log('Country Produced: ' + body.Country);
            console.log('Language: ' + body.Language);
            console.log('Plot: ' + body.Plot);
            console.log('Actors: ' + body.Actors);

        // This adds info to log.txt.
        fs.appendFile('log.txt', 'Title: ' + body.Title);
        fs.appendFile('log.txt', 'Release Year: ' + body.Year);
        fs.appendFile('log.txt', 'IMDB Rating: ' + body.imdbRating);
        fs.appendFile('log.txt', 'Rotten Tomatoes Rating: ' + body.Ratings[1].Value);
        fs.appendFile('log.txt', 'Country Produced: ' +body.Country);
        fs.appendFile('log.txt', 'Language: ' + body.Language);
        fs.appendFile('log.txt', 'Plot: ' + body.Plot);
        fs.appendFile('log.txt', 'Actors: ' + body.Actors);
        } else {
            console.log(error);
        }

        if (movies === 'Mr. Nobody') {
            console.log('------------------------');
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

        // This adds info to log.txt.
            fs.appendFile('log.txt', '------------------------');
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
        }
    });
}

// Controls the Do What it Says command.

function doIt() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        }
    
    // This will make it readable.
    var txt = data.split(',');

    // These are inputs for each command while running in random.txt.
    spotify(txt[1]);
    tweet(txt[2]);
    movies(txt[3]);
    doIt(txt[4]);
    });
}