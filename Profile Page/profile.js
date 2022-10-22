var email = localStorage.getItem('email');
console.log(email);
function fetch_user_data(){
    // console.log(login_email.value);
    // console.log(login_password.value);
    var em = email;
    const s_data = {
        em
    };

    // Example POST method implementation:
  async function userData(url = '', data = {}) {
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

userData('http://localhost:3000/user', s_data )
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
    document.getElementById('name').innerHTML = data[0].u_name;
    document.getElementById('fullname').innerHTML = data[0].u_name;
    document.getElementById('email').innerHTML = data[0].email;
    document.getElementById('phn').innerHTML = data[0].phn;
    document.getElementById('dob').innerHTML = data[0].dob.slice(0, 10);
  });
}