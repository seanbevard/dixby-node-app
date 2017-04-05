//require keys.js files so we can import them
var keys = require('./keys.js');
//require functions for twitter et al
var Twitter = require('twitter');
var Spotify = require('spotify');

//twitter variables
var twitterKeys = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

//spotify variables

//take in two arguments and store them as variables
var action = process.argv[2];

var secondAction = process.argv[3];

//probably need a switch statement for each command
switch (action) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Please enter a valid action!")

}

//need to define all of my functions!

function myTweets() {
    twitterKeys.get('statuses/user_timeline', { screen_name: 'dixby_', count: 20 }, function(error, tweets, response) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
            //need a for loop to run through first 20 tweets
            for (i = 0; i < 20; i++) {
            	console.log("\n****************************\n");
                console.log("Latest Tweet#" + (i + 1));
                console.log("Tweeted at: " + tweets[i].created_at);
                console.log(tweets[i].text);
            }
    });
};

function spotifyThisSong() {
    Spotify.search({ type: 'track', query: secondAction }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }

        //for loop to go through all of the tracks returned
        for (i = 0; i < data.tracks.items.length; i++) {
            console.log("\n****************************\n");
            console.log("Arist: " + data.tracks.items[i].artists[0].name);
            console.log("Track Name: " + data.tracks.items[i].name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);
            console.log("Album Name: " + data.tracks.items[i].album.name);
        }
    });

};

function movieThis() {
    console.log("running movieThis()");
};

function doWhatItSays() {
    console.log("running doWhatItSays()");
};
