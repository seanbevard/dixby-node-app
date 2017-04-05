//require keys.js files so we can import them
var keys = require('./keys.js');
//require functions for twitter et al
var Twitter = require('twitter');
//store the keys in variables
//need this
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});
//take in two arguments and store them as variables
var action = process.argv[2];
var second_argv = process.argv[3];

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
    //console.log("running myTweets()");
    //var params = { screen_name: 'dixby_' };
    client.get('statuses/user_timeline', {screen_name: 'dixby_', count: 20}, function(error, tweets, response) {
        if (!error) {
            //need a for loop to run through first 20 tweets
            for (i = 0; i < 20; i++) {
                console.log("Latest Tweet#" + (i+1));
                console.log("Tweeted at: " + tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("\n****************************\n");


            }
            //log the response for testing
            // console.log(JSON.stringify(tweets, null, 4));
            //else log the error
        } else {
            console.log(error);
        }
    });
};

function spotifyThisSong() {
    console.log("running spotifyThisSong()");
};

function movieThis() {
    console.log("running movieThis()");
};

function doWhatItSays() {
    console.log("running doWhatItSays()");
};
