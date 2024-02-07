const inputArtist = $('.input-artist');
const inputSong = $('.input-song');
const buttonFind = $('.find-btn');
const buttonView = $('.view-btn');
const songTitle = $('.song-title');
const lyricField = $('.lyric-text');
const errorBox = $('.error-box');
let search = [""];
var searchStorage = JSON.parse(localStorage.getItem("search")) || []

buttonFind.on('click', findLyrics);
function formatSongDetails(artist, song) {
let songDetails = `${artist}-${song}`.split('-');
let artistName = songDetails[0].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
let songName = songDetails[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
return { artistName, songName };
}

function formatLyrics(lyrics) {
return lyrics.split("\n").slice(1).join("<br />");
}

function updateUIWithLyrics(lyrics, artist, song) {
let { artistName, songName } = formatSongDetails(artist, song);
songTitle.text(`${artistName}-${songName}`);
lyricField.html(formatLyrics(lyrics));
}

function findLyrics() {
let artistVal = inputArtist.val().trim();
let songVal = inputSong.val().trim();
if (artistVal !== '' && songVal !== '') {
    errorBox.hide();
    fetch(`https://api.lyrics.ovh/v1/${artistVal}/${songVal}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No lyrics found');
        }
        return response.json();
    })
    .then(lyric => {
        let listItem = $('<li>').addClass('list-group-item').text(`${artistVal}-${songVal}`);
        $('#recentSearchList').prepend(listItem);
        listItem.on('click', function() {
            let storedLyrics = localStorage.getItem(`lyrics-${artistVal}-${songVal}`);
            if (storedLyrics) {
                // Display the lyrics from local storage
                updateUIWithLyrics(storedLyrics, artistVal, songVal);
            } else {
                console.error('Lyrics not found in local storage');
            }
        });
        updateUIWithLyrics(lyric.lyrics, artistVal, songVal);
        inputArtist.val('');
        inputSong.val('');
        localStorage.setItem(`lyrics-${artistVal}-${songVal}`, lyric.lyrics);
    })
    .catch(error => {
        errorBox.show();
        setTimeout(() => {
            errorBox.hide();
        },  3000);
    });
}
}
function displayLyrics(lyrics, artist, song) {
updateUIWithLyrics(lyrics, artist, song);
}

buttonView.on('click', getVideo);
function getVideo()
{
const youtubeApikey = 'AIzaSyCxq1fOqiEee1Wk6c7izIOl5YX9YwZwDUE'
let artist = inputArtist.val().trim();
let song = inputSong.val().trim();
let query = `${artist} ${song}`;
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${youtubeApikey}`)
.then(response => response.json())
.then(data => {
let videoId = null;
for (let i = 0; i < data.items.length; i++) {
if (data.items[i].snippet.title.toLowerCase().includes(query.toLowerCase())) {
    videoId = data.items[i].id.videoId;
    console.log("videoId", videoId)
    break;
}

}

if (videoId !== null) {
console.log('Found url: ', videoId);

// Update the search history in local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
searchHistory.unshift({ artist, song, videoId });
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

// Prepend the search term to the recent search list
let listItem = $('<li>').addClass('list-group-item').text(`${artist}-${song}`);
$('#recentSearchList').prepend(listItem);
localStorage.setItem('videoId', videoId);
listItem.on('click', function() {
    var videoId = localStorage.getItem('videoId');
    if (videoId) {
        // Create an iframe
        let $iframe = $('<iframe/>', {
            width: '560',
            height: '315',
            src: `https://www.youtube.com/embed/${videoId}`,
            frameborder: '0',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowfullscreen: ''
        });
        
        // Empty the player and append the new iframe
        $('#youtubePlayer').empty().append($iframe);
    } else {
        console.error('Video ID not found in local storage');
    }
});

} else {
console.log('No match found');
}

// Clear the old video
$('#youtubePlayer').empty();

//Create an iframe
let $iframe = $('<iframe/>', {
width: '560',
height: '315',
src:`https://www.youtube.com/embed/${videoId}`,
frameborder: '0',   allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
allowfullscreen: ''
});

    // Append the iframe to your page
$('#youtubePlayer').append($iframe);
});
}
