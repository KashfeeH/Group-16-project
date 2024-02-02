const $inputArtist = $('.input-artist');
const $inputSong = $('.input-song');
const $buttonFind = $('.find-btn');
const $buttonView = $('.view-btn');
const $songtitle = $('.song-title');
const $lyricField = $('.lyric-text');
const $errorBox = $('.error-box');

// function handleButtonClick() {
//   getLyrics();
//   getVideo();
// }

$buttonFind.on('click', getLyrics);
 
function getLyrics() {
    let artistVal = $inputArtist.val().trim();
    let songVal = $inputSong.val().trim();

    if (artistVal !== '' && songVal !== '') {
        $errorBox.hide();
        fetch(`https://api.lyrics.ovh/v1/${artistVal}/${songVal}`)
        .then(response => response.json())
        .then(lyric => {
            let song = `${artistVal}-${songVal}`.split('-');
            let artistName = song[0].split(' ').map(elem => elem[0].toUpperCase() + elem.slice(1)).join(' ');
            let songName = song[1].split(' ').map(elem => elem[0].toUpperCase() + elem.slice(1)).join(' ');
    
            $songtitle.text(`${artistName} - ${songName}`);
            
            let lyrics = lyric.lyrics.split("\n").join("<br />");
            
            $lyricField.html(lyrics);
    
            $inputArtist.val('');
            $inputSong.val('');
        })
        .catch(err => {
            $errorBox.show();
            $errorBox.children().eq(1).text('Sorry! Lyrics not found.');
            setTimeout(() => {
                $errorBox.hide();
            }, 2500);
        });

    } else {
        $errorBox.show();
        setTimeout(() => {
            $errorBox.hide();
        }, 2500);
    }
}
$buttonView.on('click', getVideo);
function getVideo()
{
const youtubeApikey = 'AIzaSyCxq1fOqiEee1Wk6c7izIOl5YX9YwZwDUE'
let artist = $inputArtist.val().trim();
let song = $inputSong.val().trim();
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

 //let videoId = thumbnailUrl.split('/').pop().split('.')[0];
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
// $buttonView.on('click', getVideo);

// function getVideo() {
//  const youtubeApikey = 'AIzaSyCxq1fOqiEee1Wk6c7izIOl5YX9YwZwDUE'
//  let artist = $inputArtist.val().trim();
//  let song = $inputSong.val().trim();
//  let query = `${artist} ${song}`;

//  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${encodeURIComponent(query)}&key=${youtubeApikey}`)
//     .then(response => response.json())
//     .then(data => {
//       let thumbnailUrl = null;
//       for (let i = 0; i < data.items.length; i++) {
//         if (data.items[i].snippet.title.toLowerCase().includes(query.toLowerCase())) {
//           thumbnailUrl = data.items[i].snippet.thumbnails.high.url; // Use default thumbnail
//           break;
//         }
//       }

//       if (thumbnailUrl !== null) {
//         console.log('Found url: ', thumbnailUrl);
//         // Display the thumbnail
//         let $img = $('<img/>', {
//           src: thumbnailUrl,
//           alt: query
//         });
//         $('#youtubePlayer').empty();
//         $('#youtubePlayer').append($img);
//       } else {
//         console.log('No match found');
//       }
//     });
// }
