
// var channeldata = document.getElementById('channeldata');

// channeldata.onclick = function(){
//     var channelIn = document.getElementById('channel-input');
//     var chnl = channelIn.value;
//     localStorage.clear;
//     localStorage.setItem('input', chnl);
//     console.log(localStorage.getItem('input'));
// }


var logincheck = document.getElementById('login-check');
logincheck.onclick = function(){
    email = localStorage.getItem('email');
    if(email!=null) window.location.replace('/Profile Page/profile.html');
    else window.location.replace('/log in and sign up/login_signup.html');
}


