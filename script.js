//When the user types in the name of a song or an artist
//returns the closest match to the string being entered
//and then lists all the possible videos. This is where
//we will make use of the video Api. 
//we fetch() the data and then the search-result div is dynamically updated
//when the user clicks on the links, the video container is where the video plays
// Define variables to store API keys or any necessary configurations
const musixmatchApiKey = 'b5c14c721405ef563497ac0b168300a7';
const youtubeApiKey = 'AIzaSyC_A54f2YKjbw7wjMVH79Abs1rVj4PfNH4';
// Function to handle form submission
$('#search-button').on("click", function(event) {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = $('#searchInput').val(); // Get the search term from input field
    // Call functions to search for song and lyrics using APIs
    searchSong(searchTerm);
    searchLyrics(searchTerm);
});
// Function to search for a song using Musixmatch API
function searchSong(searchTerm) {
    // Implement your code to call Musixmatch API and display search results
    // Placeholder comment: Call Musixmatch API to search for songs
    // For now, let's assume you have a function to get the video ID for the given search term
    getVideoId(searchTerm);
}
// Function to get the video ID for the given search term using YouTube API
function getVideoId(searchTerm) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        data: {
            key: youtubeApiKey,
            q: searchTerm,
            part: 'snippet',
            maxResults: 1, // Only retrieve the first result
            type: 'video'
        },
        success: function(data) {
            if (data.items.length > 0) {
                const videoId = data.items[0].id.videoId; // Extract video ID from search results
                initYoutubePlayer(videoId); // Initialize and embed YouTube player with the video ID
            } else {
                $('#lyrics').text('No song found for this search. Please enter another song.');
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Error:', textStatus);
        }
    });
}
// Function to search for lyrics using Musixmatch API
function searchLyrics(searchTerm) {
    $.ajax({
        url: 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get',
        dataType: 'json',
        data: {
            apikey: musixmatchApiKey,
            q_track: searchTerm,
            format: 'jsonp',
            callback: 'jsonp_callback'
        },
        success: function(data) {
            if (data.message.body.lyrics) {
                const lyrics = data.message.body.lyrics.lyrics_body;
                displayLyrics(lyrics);
            } else {
                $('#lyrics').text('No lyrics found for this song. Please search for another song.');
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Error:', textStatus);
        }
    });
}
// Function to initialize and embed YouTube player
function initYoutubePlayer(videoId) {
    // Implement your code to initialize and embed YouTube player with the given video ID
    // Placeholder comment: Embed YouTube player with the provided video ID
    const youtubePlayer = $('<iframe>', {
        width: '100%',
        height: '315', // Adjust height as needed
        src: 'https://www.youtube.com/embed/' + videoId,
        frameborder: 0,
        allowfullscreen: true
    });
    $('#youtubePlayer').empty().append(youtubePlayer);
}
// Function to display lyrics
function displayLyrics(lyrics) {
    $('#lyrics').text(lyrics);
}