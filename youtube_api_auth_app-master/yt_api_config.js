const content = document.getElementById('content');
const feed = document.getElementById('feed');
const channelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');


//authenticate google sign in
// function authenticate() {
// return gapi.auth2.getAuthInstance()
//     .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
//     .then(function() { console.log("Sign-in successful"); },
//             function(err) { console.error("Error signing in", err); });
// }

function loadClient() {
gapi.client.setApiKey("AIzaSyBApTDIWjTq1piLbGqFRCXshiL8v8BuCYc");
return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}


gapi.load("client:auth2", function() {
gapi.auth2.init({client_id: "311012207302-h28pq4siu6dn4a3lpq1spo66ebpmt5la.apps.googleusercontent.com"});
});



// Form submit and change channel
feed.addEventListener('click', e => {
  e.preventDefault();

  channel_list();

});


// Get channel from API
function getChannel(channel) {
  gapi.client.youtube.channels
    .list({
      part: 'snippet,contentDetails,statistics,id',
      forUsername: channel
    })
    .then(response => {
      console.log(response);
      const channel = response.result.items[0];
      console.log(response);

      // const output = `
      //   <ul class="collection">
      //     <li class="collection-item">Title: ${channel.snippet.title}</li>
      //     <li class="collection-item">ID: ${channel.id}</li>
      //     <li class="collection-item">Subscribers: ${numberWithCommas(
      //       channel.statistics.subscriberCount
      //     )}</li>
      //     <li class="collection-item">Views: ${numberWithCommas(
      //       channel.statistics.viewCount
      //     )}</li>
      //     <li class="collection-item">Videos: ${numberWithCommas(
      //       channel.statistics.videoCount
      //     )}</li>
      //   </ul>
      //   <p>${channel.snippet.description}</p> 
      //   <hr>
      //   <a class="btn grey darken-2" target="_blank" href="https://youtube.com/${
      //     channel.snippet.customUrl
      //   }">Visit Channel</a>
      // `;
      // showChannelData(output);

      const playlistId = channel.contentDetails.relatedPlaylists.uploads;
      requestVideoPlaylist(playlistId);
      console.log(channel);
    })
    .catch(err => console.log('No Channel By That Username.<br> Please insert exact channel Username'));
}


//doing something
function requestVideoPlaylist(playlistId) {
  const requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 20
  };

  const request = gapi.client.youtube.playlistItems.list(requestOptions);

  request.execute(response => {
    console.log(response);
    const playListItems = response.result.items;
    if (playListItems) {
      let output = '<br><h4 class="center-align">Latest Videos</h4>';

      // Loop through videos and append output
      playListItems.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;

        output += `
          <div class="col s12 center-align">
          <iframe width="900px" height="520px" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        `;
      });

      // Output videos
      videoContainer.innerHTML = output;
    } else {
      videoContainer.innerHTML = 'No Uploaded Videos';
    }
  });
}




var add = document.getElementById('add_channel');
var rem = document.getElementById('remove_channel');

add.addEventListener('click', e => {
  e.preventDefault();
  
  var chnl = channelInput.value;
  var em = localStorage.getItem('email');
  const s_data = {
      em,
      chnl
  };
  // Example POST method implementation:
async function addchnl(url = '', data = {}) {
  // Default options are marked with *
  var response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

addchnl('http://localhost:3000/addchannel', s_data )
.then((data) => {
  // console.log(data); // JSON data parsed by `data.json()` call
  })
  console.log("channel added");
});



rem.addEventListener('click', e => {
  e.preventDefault();

  var chnl = channelInput.value;

  const s_data = {
      chnl
  };
  
async function remchnl(url = '', data = {}) {
  // Default options are marked with *
  var response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

remchnl('http://localhost:3000/remchannel', s_data )
.then((data) => {
  // console.log(data); // JSON data parsed by `data.json()` call
  })
  console.log("channel removed");

});



function channel_list(){
  var a;
  var em = localStorage.getItem('email');
  const s_data = {
      em
  };
  // Example POST method implementation:
async function chnl(url = '', data = {}) {
  // Default options are marked with *
  var response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

chnl('http://localhost:3000/getchannellist', s_data )
.then((data) => {
  // console.log(data); // JSON data parsed by `data.json()` call
  //console.log(data[0].channel_id);
  for(i=0; i<data.length; i++) {
    getChannel(data[i].channel_id);
    console.log(data[i].channel_id);
  }

});


}