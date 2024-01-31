// Define songTitle here. This should be the name of the song that the user is searching for.
var songTitle = "Despacito";

const musixmatchApiKey = 'b5c14c721405ef563497ac0b168300a7';
const youtubeApiKey = 'AIzaSyC_A54f2YKjbw7wjMVH79Abs1rVj4PfNH4';

var songs = [""];
var songStorage = JSON.parse(localStorage.getItem("songs")) || [];

var url = 'https://www.googleapis.com/youtube/v3/search?' + 
 'part=snippet&' + 
 'maxResults=1&' + 
 'q=' + encodeURIComponent(songTitle) + '&' + 
 'key=' + youtubeApiKey;

fetch(url)
 .then(response => response.json())
 .then(data => {
    var videoId = data.items[0].id.videoId;
    // Now that we have the video ID, we can use it to play the video
    document.querySelector('#youtubePlayer').setAttribute('src', 'https://www.youtube.com/embed/' + videoId);
 })
 .catch((error) => {
    console.error('Error:', error);
 });

fetch(`http://localhost:3000/proxy/ws/1.1/track.search?q_track=${songTitle}&apikey=${musixmatchApiKey}`)
 .then(response => response.json())
 .then(data => {
     var trackId = data.message.body.track_list[0].track.track_id;
 
     // Then, get the lyrics of the song
     return fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${musixmatchApiKey}`);
 })
 .then(response => response.json())
 .then(data => {
     var lyrics = data.message.body.lyrics.lyrics_body;
     // Now that we have the lyrics, we can display them
     $('#lyrics').text(lyrics);
 });

 

