// Documentation for the images NASA API:
// https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf

// Michaela's key, not working atm: 'Ea9gLTyeg6BbpVDjPDbuRqDRAwytug8ilzad8Uot';
var nasaApiKey = '5BP4jRWz6oHxG11XrKhpObCRFJ5HleSkcKmY6jTJ' // Adam's API key
var nasaBgURL = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaApiKey;
var searchTerm = '' // From html page; searches all of the metadata; put an if statement here to add data & operator to URL only if the .val().trim()'ed field contains data.
var mediaType = '' // Allow selecting image or audio!
var yearStart = '' // Allow a start year for the media publication
var yearEnd = '' // Allow an end year for media publication
var nasaQueryURL = '';

// This is just the function that runs when the page loads to get a background image for the page.
var nasaBg = function () {
	$.ajax({
		url: nasaBgURL,
		method: "GET"
	}).then(function (response) {
		console.log('====== BACKGROUND IMAGE RESPONSE =======');
		console.log(response);
		$('#bgDiv').css('background-image', 'url(' + response.url + ')');
		// temp image if the API isn't working:
		// $('#bgDiv').css('background-image','url(assets/images/bgTEST.jpg)');
	});
};

var nasaImagesQuery = function () {
	// TO DO: Define the below and set if statements so they'll only contain the operator and data to add to the URL, if the field has data

	// The main function for the site
	var getSearchTerm = function() {
		if ($('#search-term') === '') {
			// error!
		} else {
			searchTerm = $('#search-term').val().trim();
		};
	};

	var getYearStart = function() {
		if ($('#search-start-date') === '') {
			yearStart = '1900';
		} else {
			yearStart = $('#search-start-date').val().trim();
		};
	};

	var getYearEnd = function() {
		if ($('#search-end-date') === '') {
			yearEnd = '2199';
		} else {
			yearEnd = $('#search-end-date').val().trim();
		};
	};

	getSearchTerm();
	getYearStart();
	getYearEnd();

	console.log('Query values: ' + searchTerm + ', ' + yearStart + '-' + yearEnd);
	
	nasaQueryURL = 'https://images-api.nasa.gov/search?q=' + searchTerm + mediaType + '&year_start=' + yearStart + '&year_end=' + yearEnd
	mediaType = function () {
		if ($('#media-type') === '') {
			return ''
		} else {
			return '&media_type=' + $('#media-type').val().trim();
		};
	};

	$.ajax({
		url: nasaQueryURL,
		method: "GET"
	}).then(function (response) {
		console.log('====== IMG QUERY RESPONSE ======');
		console.log(response);
	});
};




///////////////// On page load ///////////////
$(document).ready(function () {
	nasaBg();
});

var userId = "Ker Her";
var spotifyId = "7lYSJe9bqzeYYmzqIhSESB";
var playlistUrl = "https://api.spotify.com/v1/users/" + userId +"/playlists/"+ spotifyId +"";
var token = "Bearer BQBjrnk2A1dCHVE3BFqWm6lGIOMVLcvJYIntD5nxL0OQASaA42dgaNA0KnAuhveDbvw_mBz4Bjd7SMhhfeGeNjVlWUZ-3Dm8KRJR8T9SKBhl-VZNZ_ALw60KfMCrtL9YTqmEIZmeHmnvebVZbmYw3Z2yI-1Ar-o";
var client_id = "dd3e63a1c5c048f789e22cfd38d228e8";
var secret_id ="8705f5b4d85b4cd0bd05ec6322a7782b";
var redirect_uri = "https://michaelabee.github.io/Cool-Space-Pix/";
var scopes = "playlist-read-private";
var response_type = token;
var spotifyUri = "spotify:user:123639550:playlist:7lYSJe9bqzeYYmzqIhSESB";


$.ajax({
	url:playlistUrl,
	method:"GET",
	headers: {
		"Authorization" : token
	},
	success: function(response){
	}
})    

window.onSpotifyWebPlaybackSDKReady = () => {

	console.log("onSpotifyWebPlaybackSDKReady triggered" )
const token = 'BQAqmIUvXtA_eiXcGNOQBKd8jNqaDEO05PMwd1M3-vRGV77A891Ov9k7ZS2AD8W6SL8NbG_PQVmBD-de45Dn--zVYf_PmH0Y63z0TfgzpYl5iWtWB1FM3E5X9X6O3yPCZ_hLv0z1-AUzNLjEsTAp7d9HQDQDk9e3P2WcnLVh';
const player = new Spotify.Player({
name: 'Web Playback SDK Quick Start Player',
getOAuthToken: cb => { cb(token); }
});

// Error handling
player.addListener('initialization_error', ({ message }) => { console.error(message); });
player.addListener('authentication_error', ({ message }) => { console.error(message); });
player.addListener('account_error', ({ message }) => { console.error(message); });
player.addListener('playback_error', ({ message }) => { console.error(message); });

// Playback status updates
player.addListener('player_state_changed', state => { console.log(state); });

// Ready
player.addListener('ready', ({ device_id }) => {
console.log('Ready with Device ID', device_id);
});

// Not Ready
player.addListener('not_ready', ({ device_id }) => {
console.log('Device ID has gone offline', device_id);
});

// Connect to the player!
player.connect();

}  

// $('#submit').unbind().click(function(){
// 	console.log('clicked!');
// 	event.preventDefault();
// 	nasaImagesQuery();
// });