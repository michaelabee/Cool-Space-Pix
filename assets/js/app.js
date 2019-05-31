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

////////// QUERY FUNCTIONS TO COLLECT USER INPUT /////////////
var getSearchTerm = function () {
	if ($('#search-term').val().trim() === '') {
		searchTerm = ''
	} else {
		searchTerm = $('#search-term').val().trim();
	};
};

var getYearStart = function () {
	if ($('#search-start-date').val().trim() === '') {
		yearStart = '';
	} else {
		yearStart = '&year_start=' + $('#search-start-date').val().trim();
	};
};

var getYearEnd = function () {
	if ($('#search-end-date').val().trim() === '') {
		yearEnd = '';
	} else {
		yearEnd = '&year_end=' + $('#search-end-date').val().trim();
	};
};

var getResultsQty = function () {
	if ($('#resultsQty').val().trim() === '') {
		resultsQty = 10
	} else {
		resultsQty = $('#resultsQty').val().trim();
	};
};

/////////// MAIN QUERY FUNCTION /////////////
var nasaImagesQuery = function () {

	getSearchTerm();
	getYearStart();
	getYearEnd();
	getResultsQty();

	if (searchTerm === '' && yearStart === '' && yearEnd === '') {
		$('#errorMessage').show();
		return;
	} else{
		$('#errorMessage').hide();
	}

	console.log('Query values: ' + searchTerm + ', ' + yearStart + '-' + yearEnd + '; ' + resultsQty + ' results desired');

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
		resultsArr = response.collection.items;
		for (i = 0; i < resultsQty; i++) {
			var resBox = $('<div>');

			resBox.attr('class', 'carousel');
			var link = $('<a>');
			link.attr({
				'class': 'carousel-item',
				'href': '#'+ [i] + '!',
			});


			var resImg = $('<img>');

			resImg.attr({
				'class': 'resImg',
				'class': 'materialboxed',

				src: resultsArr[i].links[0].href, // Just the thumbnail
				// Also add an actual link to it for full size
				'title': resultsArr[i].data[0].title,
				'data-caption': resultsArr[i].data[0].description,
			});

			// resBox.wrap('<a href=' + results.Arr[i].href + '></a>')
			console.log(resultsArr[i].href);
			console.log(resultsArr[i].href.length);

			link.append(resImg);
			console.log(link);
			$("#carousel").append(link);
			// resBox.append(resImg);
			// resBox.append(resultsArr[i].data[0].title);
			$('.carousel').carousel({full_width:true});
			$('.materialboxed').materialbox();
			$('#searchQuery').hide();

		};

	});
};



///////////////// On page load ///////////////
$(document).ready(function () {
	nasaBg();

});

// $('#submit').unbind().click(function(){
// 	console.log('clicked!');
// 	event.preventDefault();
// 	nasaImagesQuery();
// });

///////////// SPOTIFY API //////////////
var userId = "Ker Her";
var spotifyId = "7lYSJe9bqzeYYmzqIhSESB";
var playlistUrl = "https://api.spotify.com/v1/users/" + userId +"/playlists/"+ spotifyId +"";
var token = "Bearer BQBU7pHW_4WDuNSzHu81AQQlShMYV86rWFoQs1wr3tFDBrmZhkz87H5xIX9_jdauwbjha3ofzL_2W1vLmctAVtgSnhNBmhD4r72VoUfQcnrz8IcYUPuL5JRHrnJMvpJX79Iak6MbdpP1iaUHHqzzZ_RIN2Bp6wg";
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
const token = 'BQCFk1inlUMM5TvatWBSMeSRvUbL1o8gpCcM_nTeA5j30fYSUAknsXd67xABxgc9LJWVnZTiVl9OjLbcSVNDP8_T6kpOZ510Y9iww4TknWUHpxdLao1PyrcOXLTuTkEswL9JZRDyymP38pRztKbshdwFFhxJFcHrh5ImWiwa';
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
