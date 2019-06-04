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

//////////////////////////////////////////////////////////////
////////// QUERY FUNCTIONS TO COLLECT USER INPUT /////////////
//////////////////////////////////////////////////////////////

// Keyword search
var getSearchTerm = function () {
	if ($('#search-term').val().trim() === '') {
		searchTerm = ''
	} else {
		searchTerm = $('#search-term').val().trim();
	};
};

// Start year; if the form is empy then return no portion of the parameter
var getYearStart = function () {
	if ($('#search-start-date').val().trim() === '') {
		yearStart = '';
	} else {
		yearStart = '&year_start=' + $('#search-start-date').val().trim();
	};
};

// End year; same behavior as the start year
var getYearEnd = function () {
	if ($('#search-end-date').val().trim() === '') {
		yearEnd = '';
	} else {
		yearEnd = '&year_end=' + $('#search-end-date').val().trim();
	};
};

// Number of results, which doesn't actually go into the query URL; but the resultsQty variable is used to put the number of results in the Carousel.
var getResultsQty = function () {
	if ($('#resultsQty').val().trim() === '') {
		resultsQty = 10
	} else {
		resultsQty = $('#resultsQty').val().trim();
	};
};

//////////////////////////////////////////////////
/////////// MAIN NASA QUERY FUNCTION /////////////
//////////////////////////////////////////////////

var nasaImagesQuery = function () {

	// Grabbing the results from the functions above
	getSearchTerm();
	getYearStart();
	getYearEnd();
	getResultsQty();

	// If the search term and year boxes are empty, stop the query and return an error message.
	if (searchTerm === '' && yearStart === '' && yearEnd === '') {
		$('#errorMessage').show();
		return;
	} else {
		$('#errorMessage').hide();
	};

	// Just console logging the query values for reference and potential debugging
	console.log('Query values: ' + searchTerm + ', ' + $('#search-start-date').val().trim() + '-' + $('#search-end-date').val().trim() + '; ' + resultsQty + ' results desired');

	// Building the query URL
	nasaQueryURL = 'https://images-api.nasa.gov/search?q=' + searchTerm + yearStart + yearEnd;

	// Finally the NASA ajax query
	$.ajax({
		url: nasaQueryURL,
		method: "GET"
	}).then(function (response) {
		console.log('====== IMG QUERY RESPONSE ======');
		console.log(response);
		resultsArr = response.collection.items;
		// Here's where that resultsQty variable comes back, to run this loop.
		for (i = 0; i < resultsQty; i++) { 
			var link = $('<a>'); // A new link tag per result
			link.attr({ // Assigning some needed classes for the carousel
				'class': 'carousel-item',
				'href': '#' + [i] + '!',
			});

			var resImg = $('<img>'); // Now creating an image tag for each of the images
			resImg.attr({ // Now setting up the image attributes
				'class': 'materialboxed',
				'width': '120%',
				'src': resultsArr[i].links[0].href, // The image itself
				'title': resultsArr[i].data[0].title, // Mouseover title
				'data-caption': resultsArr[i].data[0].description, // Description for below the image
			});

			link.append(resImg); // Pushing the image into the link tag...
			
			$(".carousel").append(link); // ...then putting the link tag into the carousel itself.

			$('.carousel').carousel({ // And finally setting the carousel up.
				full_width: true
			});
			$('.materialboxed').materialbox(); // Applying method to the resImg image tags; needed for the click-and-zoom capability of the pictures.
			$('#searchQuery').hide(); // Hiding the query form while the results are showing
			$('.search-again').show(); // And showing the search reset button
			$('.carousel').show(); // Showing the carousel results
		};
	});
};

///////////////////////////////////////////////
////////// RESET PAGE FOR NEW SEARCH //////////
///////////////////////////////////////////////

var reset = function () {
	$('#searchQuery').show(); // Re-show the search query
	$('.carousel').empty(); // Empty carousel
	$('.carousel').hide(); // Hide carousel
	$('.search-again').hide(); // Hide the search again button
	$('data-caption').empty(); // Emptying the caption from carousel images
	$('.data-input').attr('value',''); // Emptying the form's search criteria
};

////////////////////////////////////////
/////////// On page load ///////////////
////////////////////////////////////////

$(document).ready(function () {
	nasaBg();
	$('.search-again').hide();
	$('.carousel').hide();
	$('.sidenav').sidenav();
});

////////////////////////////////////////
///////////// SPOTIFY API //////////////
////////////////////////////////////////

var userId = "Ker Her";
var spotifyId = "7lYSJe9bqzeYYmzqIhSESB";
var playlistUrl = "https://api.spotify.com/v1/users/" + userId + "/playlists/" + spotifyId + "";
// need to update token code //
var token = "Bearer BQBF0hm1pmpqSm56phhVrRAPOiHA6dCxnYL-3PWDL8RLjK2oEH7SRgTpJPW3HzX6XEB924wKl46QtLxxiBVmKtjcrsjRfT-7PJsOZ7ISD2JxlKwLdLjoTRbUoCzwrXGTxOqkO3oCIWZrXe6IZIa8fTtPb9_IqQA";
var client_id = "dd3e63a1c5c048f789e22cfd38d228e8";
var secret_id = "8705f5b4d85b4cd0bd05ec6322a7782b";
var redirect_uri = "https://michaelabee.github.io/Cool-Space-Pix/";
var scopes = "playlist-read-private";
var response_type = token;
var spotifyUri = "spotify:user:123639550:playlist:7lYSJe9bqzeYYmzqIhSESB";

$.ajax({
	url: playlistUrl,
	method: "GET",
	headers: {
		"Authorization": token
	},
	success: function (response) {}
})

window.onSpotifyWebPlaybackSDKReady = () => {

	console.log("onSpotifyWebPlaybackSDKReady triggered")
	const token = 'BQCyyrnC3Ydi97Eo_-pmMqreOEJv4ZM5NXZpu_ZMQxC6yLdkGV5ItIx5Wwfk1tlNlsLteSjFuCHbJ0EEAexiw5b9R2_ukH2R7tSYfEg0uZHdhw5LJVJzAwen0VpsNE-F5hyGmlPGdXTopjw35gDUdgTQzLX3UcuRzb6FV_aH';
	const player = new Spotify.Player({
		name: 'Web Playback SDK Quick Start Player',
		getOAuthToken: cb => {
			cb(token);
		}
	});

	// Error handling
	player.addListener('initialization_error', ({
		message
	}) => {
		console.error(message);
	});
	player.addListener('authentication_error', ({
		message
	}) => {
		console.error(message);
	});
	player.addListener('account_error', ({
		message
	}) => {
		console.error(message);
	});
	player.addListener('playback_error', ({
		message
	}) => {
		console.error(message);
	});

	// Playback status updates
	player.addListener('player_state_changed', state => {
		console.log(state);
	});

	// Ready
	player.addListener('ready', ({
		device_id
	}) => {
		console.log('Ready with Device ID', device_id);
	});

	// Not Ready
	player.addListener('not_ready', ({
		device_id
	}) => {
		console.log('Device ID has gone offline', device_id);
	});

	// Connect to the player!
	player.connect();
};