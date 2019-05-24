// Documentation for the images NASA API:
// https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf

// Michaela's key, not working atm: 'Ea9gLTyeg6BbpVDjPDbuRqDRAwytug8ilzad8Uot';
var nasaApiKey = '5BP4jRWz6oHxG11XrKhpObCRFJ5HleSkcKmY6jTJ' // Adam's NASA API key
var nasaBgURL = 'https://api.nasa.gov/planetary/apod?api_key=' + nasaApiKey;
var searchTerm = '' // From html page; searches all of the metadata; put an if statement here to add data & operator to URL only if the .val().trim()'ed field contains data.
var mediaType = '' // Allow selecting image or audio!
var yearStart = '' // Allow a start year for the media publication
var yearEnd = '' // Allow an end year for media publication
var nasaQueryURL = 'https://images-api.nasa.gov/search?q=' + searchTerm + mediaType + yearStart + yearEnd + '&api_key=' + nasaApiKey;

// This is just the function that runs when the page loads to get a background image for the page.
var nasaBg = function () {
    $.ajax({
        url: nasaBgURL,
        method: "GET"
    }).then(function (response) {
        console.log('====== BACKGROUND IMAGE RESPONSE =======');
        console.log(response);
        $('#bgDiv').css('background-image','url(' + response.url + ')');
        // temp image if the API isn't working:
        // $('#bgDiv').css('background-image','url(assets/images/bgTEST.jpg)');
    });
};

var nasaImagesQuery = function () {
    // TO DO: Define the below and set if statements so they'll only contain the operator and data to add to the URL, if the field has data

    

    // The main function for the site
    $.ajax({
        url: nasaQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log('====== IMG QUERY RESPONSE ======');
        console.log(response);
    });
};


///////////////// On page load ///////////////
$(document).ready(function() {
    nasaBg();
});

$('#submit').click(nasaImagesQuery());