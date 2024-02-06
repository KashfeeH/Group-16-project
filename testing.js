const inputArtist = $('.input-artist');
const inputSong = $('.input-song');
const buttonFind = $('.find-btn');
const buttonView = $('.view-btn');
const songtitle = $('.song-title');
const lyricField = $('.lyric-text');
const errorBox = $('.error-box');
let search = [""];
var searchStorage = JSON.parse(localStorage.getItem("search")) || []

buttonFind.on('click', findLyrics);
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
            localStorage.setItem(`lyrics-${artistVal}-${songVal}`, lyric.lyrics);
            let songDetails = `${artistVal}-${songVal}`.split('-');
            let listItem = $('<li>').addClass('list-group-item').text(songDetails);
            $('#recentSearchList').prepend(listItem);
            let artistName = songDetails[0].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            let songName = songDetails[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            songtitle.text(`${artistName}${songName}`);
            let formattedLyrics = lyric.lyrics.split("\n").slice(1).join("<br />");
            lyricField.html(formattedLyrics);
            inputArtist.val('');
            inputSong.val('');
            localStorage.setItem(`lyrics-${artistVal}-${songVal}`, lyric.lyrics);
        })
        .catch(error => {
            errorBox.show();
            setTimeout(() => {
                errorBox.hide();
            }, 3000);
        });
    }
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

