# LIRI

### Overview

This is the LIRI (Language Interpretation and Recognition Interface) application. 
LIRI is a command line node application that takes in parameters and returns the datat to the
user.

## Capabilities

### Twitter

`node liri.js my-tweets`

LIRI will connect to the user's Twitter feed and output the user's last 20 tweets to the bash/terminal window.

### Spotify 

`node liri.js spotify-this-song '<song name here>'` 

This will output the following information to the bash/terminal window: 

* Artist

* Song name

* Preview link of the song from Spotify

* Album that the song is from

### Movies

`node liri.js movie-this '<movie name here>'`

This will output the following to the bash/terminal window:

* Title of the movie

* Year the movie came out

* IMDB rating of the movie

* Country where the movie was produced

* Language of the movie

* Plot of the movie

* Actors in the movie

### Do What it Says

Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.