//require keys.js files so we can import them
var keys = require('./keys.js');

//adding colors because the console hurts my eyes
var Colors = require('colors/safe');

//make a couple color themes
Colors.setTheme({
    error: ['red', 'bgWhite', 'bold'],
    tweet:['bold'],
    tweet1:['cyan','bold']
});

//require functions for twitter et al
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');
var fs = require('fs');

//twitter variables
var twitterKeys = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

//take in two arguments and store them as variables
var action = process.argv[2];
var secondAction = process.argv[3];

//switch statement for each command
//putting it inside a function so the do-what-it-says function can call it.
function mainFunction() {
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
            console.log(Colors.error('Please enter a valid action!'));
    }
}

//need to define all of my functions!
function myTweets() {
    twitterKeys.get('statuses/user_timeline', { screen_name: 'dixby_', count: 20 }, function(error, tweets, response) {
        if (error) {
            console.log(Colors.error('Error occurred: ' + error));
            return;
        }
        //need a for loop to run through first 20 tweets
        for (i = 0; i < 20; i++) {
            console.log(Colors.error("Latest Tweet #" +(i + 1)));
            console.log(Colors.tweet1("\nTweeted at: " + Colors.green(tweets[i].created_at)+"\n"));
            console.log(Colors.tweet1(Colors.green(tweets[i].text)));
            console.log(Colors.bgRed("                                                                               "));
            console.log(Colors.bgRed("                                                                               "));
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
            console.log(Colors.error('Error occurred: ' + error));
            return;
        }

        //for loop to go through all of the tracks returned
        for (i = 0; i < data.tracks.items.length; i++) {
            console.log(Colors.tweet1("Arist: " + Colors.error(data.tracks.items[i].artists[0].name)));
            console.log(Colors.tweet1("Track Name: " + Colors.green(data.tracks.items[i].name)));
            console.log(Colors.tweet1("Preview Link: " + Colors.green(data.tracks.items[i].preview_url)));
            console.log(Colors.tweet1("Album Name: " + Colors.green(data.tracks.items[i].album.name)));
            console.log(Colors.bgRed("                                                                               "));
            console.log(Colors.bgRed("                                                                               "));
        }
    });

};

function movieThis() {
    if (typeof(secondAction) === 'undefined') {
        secondAction = "Mr. Nobody";
        console.log(Colors.bgRed("                                                                               "));
        console.log(Colors.bgRed("                                                                               "));
        console.log(Colors.error("If you haven't watched 'Mr. Nobody,'' then you should: " + Colors.blue("\nhttp://www.imdb.com/title/tt0485947/")));
        console.log(Colors.error("It's on Netflix!"));
    };

    Request("http://www.omdbapi.com/?t=" + secondAction + "&y=&plot=short&tomatoes=true&r=json", function(error, response, body) {
        if (error) {
            console.log(Colors.error('Error occurred: ' + error));
            return;
        }
        //results
        console.log(Colors.bgRed("                                                                               "));
        console.log(Colors.bgRed("                                                                               "));
        console.log(Colors.tweet1("Title: " + Colors.error(JSON.parse(body).Title)));
        console.log(Colors.tweet1("Year: " + Colors.green(JSON.parse(body).Year)));
        console.log(Colors.tweet1("IMDB Rating: " + Colors.green(JSON.parse(body).imdbRating)));
        console.log(Colors.tweet1("Country: " + Colors.green(JSON.parse(body).Country)));
        console.log(Colors.tweet1("Language: " + Colors.green(JSON.parse(body).Language)));
        console.log(Colors.tweet1("Plot: " + Colors.green(JSON.parse(body).Plot)));
        console.log(Colors.tweet1("Actors: " + Colors.green(JSON.parse(body).Actors)));

        var ratingAtIndexOne = ( typeof JSON.parse(body).Ratings !== "undefined" )
                                  ? "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
                                  : "Rating: Not Available";

        console.log(Colors.tweet1(Colors.green(ratingAtIndexOne)));
        console.log(Colors.tweet1("Rotten Tomatoes Link: " + Colors.green(JSON.parse(body).tomatoURL)));
        console.log(Colors.bgRed("                                                                               "));
        console.log(Colors.bgRed("                                                                               "));
    });

};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        //split data and assign it to the variables we used for the actions
        var dataArr = data.split(",");
        action = dataArr[0];
        secondAction = dataArr[1];
        //run the main function but now with the updated variables
        mainFunction();
    });

};

//run the switch statement
mainFunction();
