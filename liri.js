// This makes it so the code can read and set any environment variables with the dotenv package.

require("dotenv").config();

// ===================== Global Variables ===================== //

// Requires
var fs = require('fs');
var request = require('request');
var twitter =  require('twitter');
var spotify = require('node-spotify-api');

// Grabs key data.
var keys = require('./keys.js');

// Twitter keys
var client = new Twitter(keys.twitter);

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
        tweets();
    break;

    case 'spotify-this-song':
        if(input) {
            song(input);
        } else {
            song('The Sign');
        }
    break;

    case 'movie-this':
        movie();
    break;

    case 'do-what-it-says':
        doIt();
    break;

    default:
        console.log('Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says');
    break;
}

