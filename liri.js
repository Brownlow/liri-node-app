
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
	  		console.log('------------------------');
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
	  id: keys.spotifyKeys.client_id,
	  secret: keys.spotifyKeys.client_secret
	});
	 
	if(!userInput){
		spotify.search({ type: 'track', query: 'The Sign' })
  			.then(function(response) {
  			  var trackInfo = response.tracks.items;
  			  for(var i =0; i < trackInfo.length; i++){
  			  	console.log('-----------------------------------');
  			  	console.log("You searched for: " + userInput);
  			  	console.log("Artists: " + trackInfo[i].name);
  			  	console.log("Song name: " + trackInfo[i].name);
  			  	console.log("Spotify Preview Link: " + trackInfo[i].preview_url);
  			  	console.log("Album name: " + trackInfo[i].album.name);
  			  	console.log('-----------------------------------');
  			  }
  			})
  			.catch(function(err) {
  			  //console.log(err);
  		});
  		
  	} else{

  		spotify.search({ type: 'track', query: userInput })
  			.then(function(response) {
  			  var trackInfo = response.tracks.items;
  			  for(var i =0; i < trackInfo.length; i++){
  			  	//console.log(trackInfo);
  			  	console.log('-----------------------------------')
  			  	console.log("You searched for: " + userInput);
  			  	console.log("Artists: " + trackInfo[i].album.artists);
  			  	console.log("Song name: " + trackInfo[i].name)
  			  	console.log("Spotify Preview Link: " + trackInfo[i].preview_url)
  			  	console.log("Album name: " + trackInfo[i].album.name)
  			  	console.log('-----------------------------------')
  			  }
  			})
  			.catch(function(err) {
  			  //console.log(err);
  		});
  	}

	
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
    // console.log(contents);

    // create an array from the contents of random.txt
    var inputArr = contents.split(',');

    // grab the song title out the array
    var newInput = inputArr.splice(1);

    // string it up
    console.log(JSON.parse(newInput));

    // run the spotify function
    spotify(newInput);
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

// Fix Spotify API situation
// Get do stuff to do stuff