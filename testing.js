const inputArtist = $('.input-artist');
const inputSong = $('.input-song');
const buttonFind = $('.find-btn');
const buttonView = $('.view-btn');
const songtitle = $('.song-title');
const lyricField = $('.lyric-text');
const errorBox = $('.error-box');

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
            let songDetails = `${artistVal}-${songVal}`.split('-');
            let artistName = songDetails[0].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            let songName = songDetails[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            songtitle.text(`${artistName} - ${songName}`);
            let formattedLyrics = lyric.lyrics.split("\n").slice(1).join("<br />");
            lyricField.html(formattedLyrics);
            inputArtist.val('');
            inputSong.val('');
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
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${encodeURIComponent(query)}&key=${youtubeApikey}`)
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
// Function to retrieve recent searches from local storage
function getRecentSearches() {
    // Retrieve recent searches from local storage
    let recentSearches = localStorage.getItem('recentSearches');

    // If no recent searches found, return an empty array
    if (!recentSearches) {
      return [];
    }

    // Parse recent searches from JSON format
    return JSON.parse(recentSearches);
  }

  // Function to render recent searches in HTML
  function renderRecentSearches() {
    const recentSearchList = document.getElementById('recentSearchList');
    recentSearchList.innerHTML = ''; // Clear existing list

    // Retrieve recent searches
    const recentSearches = getRecentSearches();

    // Render each search item in HTML
    recentSearches.forEach((search, index) => {
      const li = document.createElement('li');
      li.textContent = search;

      // Create a button to remove the search item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        removeRecentSearch(index);
        renderRecentSearches();
      });

      li.appendChild(removeButton);
      recentSearchList.appendChild(li);
    });
  }

  // Function to remove a recent search item
  function removeRecentSearch(index) {
    const recentSearches = getRecentSearches();
    recentSearches.splice(index, 1);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }

  // Call the render function when the page loads
  window.onload = renderRecentSearches;