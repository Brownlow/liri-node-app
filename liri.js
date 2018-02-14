
// Get the User input ============================================
var command = process.argv[2];
var userInput = process.argv.slice(3);

// Require Stuff ===================================================
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


// The Tweeter ====================================================================

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

function tweeter(){
	var params = {screen_name: 'Brownlow450' }
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if(error) { 
	  	throw error 
	  }
	  else {
	  	for(var i=0; i<tweets.length; i++) {
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	  		console.log('------------------------');
	  	}
	  }
	});
}

// Spotify =========================================================================
function spotify(){

	var spotify = new Spotify({
	  id: '1ec02febd6a84a6599e22d0e37129cc1',
	  secret: 'ebfb272ada5f4bfd8822316f66aae3b6'
	});
	 
	spotify.search({ type: 'track', query: userInput })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
}

// The OMDB =========================================================================
var omdbUrl = 'http://www.omdbapi.com/';

function omdb(){
	if(!userInput){
		request(omdbUrl + "?t=mr+nobody&y=&plot=short&apikey=" + keys.omdbKey.apiKey, function(error, response, body) {
  		if (!error && response.statusCode === 200) {
  	  	var movieInfo = JSON.parse(body);
  	  	//console.log(movieInfo);
  	  	console.log('------------------------');
  	  	console.log(movieInfo.Title);
  	  	console.log(movieInfo.Year);
  	  	console.log(movieInfo.imdbRating);
  	  	console.log(movieInfo.Ratings[1].Value);
  	  	console.log(movieInfo.Country);
  	  	console.log(movieInfo.Language);
  	  	console.log(movieInfo.Plot);
  	  	console.log(movieInfo.Actors);
  	  	console.log('------------------------');
  		}
		});
	} else{
		request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + keys.omdbKey.apiKey, function(error, response, body) {
  		if (!error && response.statusCode === 200) {
  	  	var movieInfo = JSON.parse(body);
  	  	//console.log(movieInfo);
  	  	console.log('------------------------');
  	  	console.log(movieInfo.Title);
  	  	console.log(movieInfo.Year);
  	  	console.log(movieInfo.imdbRating);
  	  	console.log(movieInfo.Ratings[1].Value);
  	  	console.log(movieInfo.Country);
  	  	console.log(movieInfo.Language);
  	  	console.log(movieInfo.Plot);
  	  	console.log(movieInfo.Actors);
  	  	console.log('------------------------');
  		}
		});
	}
}

// The Other Stuff ====================================================================
function doStuff(){
	fs.readFile('random.txt', 'utf8', function(err, contents) {
    //console.log(contents);

    var inputArr = contents.split(',');
    //console.log(inputArr);

    var newCommand = inputArr[0];
    var newInput = inputArr[1];

    spotify(newCommand, newInput);
	});
}


// Respond to Users input ========================================

if(command === 'my-tweets'){
	tweeter();

} else if (command === 'spotify-this-song'){
	spotify();
 
} else if (command === 'movie-this'){
	omdb();	

} else if (command === 'do-what-it-says'){
	doStuff();

} else {
	console.log('Your commands are wack. Try again.');
}