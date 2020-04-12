let users = []

function getUsers(url) {
  return new Promise((resolve, reject) => {
      return fetch(url).then(function(response) {
          const json = response.json();
          if (json) {
              resolve(json);
          } 
          else {
              reject({ message: "Error" });
          }
      });
  });
}

getUsers("/users.json").then(data => {
  users = data;
}).catch(err => {
    console.error("error: ", err);
});

window.onload = showTime();

function showTime(){
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString()
  document.getElementById("dateTime").innerHTML = time + " " + date
  setTimeout(showTime, 100);
};


const b1 = document.getElementById("signUp");
const ownerCheck = document.getElementById("ocheck");
const coCheck = document.getElementById("ccheck");

    b1.addEventListener("click", () =>{
    const name = document.getElementById('sign-up').value;
    const email = document.getElementById('email-in').value;
    const phoneNumber = document.getElementById('sign-up-number').value;
    const password = document.getElementById('password-in').value;
    let repeat = false
    for(i = 0; i < users.length; i++){
      if(users[i].email == email){
        repeat = true;
      }
    }

    if (ownerCheck.checked == true){
      var role = "Owner"
    }
    else if(coCheck.checked == true){
      var role = "Co-Worker"
    }
    else {
      var role = undefined
    };

    if (role == undefined || name == '' || email == '' || phoneNumber == '') {
      alert('Must enter all fields');
    } 
    else if (repeat == true){
      alert('Email already exists');
    }
    else{
      alert('Sign up successfull');
    }
    
});

if (LoggedIn()) {
    window.location.href = 'index_main.html';
  }
      function LoggedIn() {
  if (localStorage.getItem('user')) {
    return true;
  } else return false;
}

function asOwner() {
  if (JSON.parse(localStorage.getItem('user')).role == 'Owner') {
    return true;
  } else return false;
}

function asCoworker() {
  if (JSON.parse(localStorage.getItem('user')).role == 'Co-Worker') {
    return true;
  } else return false;
}

function navBar(text, page) {
  let navigation = document.getElementById('navbar');
  let a = document.createElement('a');
  a.setAttribute('href', page);
  let link = document.createTextNode(text);
  a.appendChild(link);
  navbar.appendChild(a);
}

window.onload = function() {
  if (LoggedIn()) {
    if (asOwner()) {
      navBar('Home', "/");
      navBar('Add New', "/property_addition");
      navBar('My Properties', "/properties_main");
      navBar('My Workspaces', "/workspace_main"+ (JSON.parse(localStorage.getItem('user')).name));
    } else {
      navBar('Home', "/");
      navBar('All Workspaces', "/workspace02_main");
      navBar('search-area', "/find_main");
    }
    navBar('Sign Out', "/signOut_main");
  } else {
    navBar('Home', "/");
    navBar('Signup', "/signIn_main");
    navBar('Login', "/login_main");

  }
};