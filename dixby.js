//require keys.js files so we can import them
var keys = require('./keys.js');
//require functions for twitter et al
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');

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
    //handle if the second input wasn't entered
    if (typeof(secondAction) === 'undefined') {
        secondAction = "The+Sign"
    };

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
        console.log(typeof secondAction);
    });

};

function movieThis() {
	//todo: handle movie titles with multiple words.
	//todo:  handle no second input
	//todo:  rotten tomatoes breaks if it's not there.
	//todo:  rotten tomates URL???
    Request("http://www.omdbapi.com/?t=" + secondAction + "&y=&plot=short&r=json", function(error, response, body) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
       	//results
       	console.log("\n****************************\nMovie Title: " + JSON.parse(body).Title);
       	console.log("Year: " + JSON.parse(body).Year);
       	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Rotten Tomatoes Link: ";
    });

};

function doWhatItSays() {
    console.log("running doWhatItSays()");
};