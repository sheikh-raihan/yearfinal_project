var login_email = document.getElementById('login-email');
var login_password = document.getElementById('login-password');
var login = document.getElementById('login')

var signup_name = document.getElementById('signup-name');
var signup_email = document.getElementById('signup-email');
var signup_password = document.getElementById('signup-password');
//var signup_confpassword = document.getElementById('signup-confpassword');
var signup_phn = document.getElementById('signup-phn');
var signup = document.getElementById('signup');
var cont = document.getElementById('cont');

login.onclick = function(){
    // console.log(login_email.value);
    // console.log(login_password.value);
    var em = login_email.value;
    var pass = login_password.value;
    const s_data = {
        em,
        pass
    };
    console.log(s_data);

    // Example POST method implementation:
  async function getData(url = '', data = {}) {
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

getData('http://localhost:3000/signin', s_data )
  .then((data) => {
    //console.log(data); // JSON data parsed by `data.json()` call
    if(data[0].email==em & data[0].pass==pass) {
      localStorage.setItem('email', em);
      window.location.replace('/Profile Page/profile.html');
    }
  });

}

signup.onclick = function(){
    var nam = signup_name.value;
    var em = signup_email.value;
    var pass = signup_password.value;
    //var confpass = signup_confpassword.value;
    var phn = signup_phn.value;

    const s_data = {
        em,
        nam,
        phn,
        pass
    };
    // Example POST method implementation:
  async function postData(url = '', data = {}) {
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

  postData('http://localhost:3000/signup', s_data )
  .then((data) => {
    // console.log(data); // JSON data parsed by `data.json()` call
    localStorage.clear;
    localStorage.setItem('email', em);
    window.location.replace('/Profile Page/profile.html');
    })  
}
