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

	// The main function for the site
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

	queryError();

	console.log('Query values: ' + searchTerm + ', ' + yearStart + '-' + yearEnd + '; ' + resultsQty + ' results desired');

	nasaQueryURL = 'https://images-api.nasa.gov/search?q=' + searchTerm + mediaType + yearStart + yearEnd;

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
			resBox.attr('class', 'resBox');
			var resImg = $('<img>');
			resImg.attr({
				'class': 'resImg',
				src: resultsArr[i].links[0].href, // Just the thumbnail
				// TO DO Also add an actual link to it for full size
				'title': resultsArr[i].data[0].title,
			});
			// resBox.wrap('<a href=' + results.Arr[i].href + '></a>')

			console.log(resultsArr[i].href);
			console.log(resultsArr[i].href.length);
			console.log(resultsArr[i].href.length);
			// var myJSON = JSON.parse(resultsArr[i].href);
			// console.log(myJSON);
			// for (j = 0 ; j < 5 ; j++) {
			// 	console.log(resultsArr[i].href[j]);
			// }

			$('#results').prepend(resBox);
			resBox.append(resImg);
			resBox.append(resultsArr[i].data[0].title);
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