window.onload = showTime();

function showTime(){
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString()
  document.getElementById("dateTime").innerHTML = time + " " + date
  setTimeout(showTime, 100);
};

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

function getLogin(url) {
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

const b2 = document.getElementById('b2');
b2.addEventListener("click", () =>{
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (email == '' || password == '') {
    alert('Enter both fields');
  } 
  else {
    let login = false;
    if (users) {
      for (i = 0; i < users.length; i++) {
        if (users[i].email == email & users[i].password == password) {   
            login = true;
            break;
        }
      }
      if (login == true) {
          alert('Login successful')
      } 
      else {
        alert('Invalid Login');
      }
    } 
  }
})

function LoggedIn(data) {
    if (Object.keys(data).length == 0) {
      return false;
    } else return true;
  }
  
  function asOwner(data) {
    if (data.role == 'owner') {
      return true;
    } else return false;
  }
  function asCoworker(data) {
    if (data.role == 'Co-Worker') {
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

 function create(data) {
  if (LoggedIn(data)) {
    if (asOwner(data)) {
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

getLogin("/user.json").then(data => {
  login = data;
  create(data)
}).catch(err => {
  console.error("error: ", err);
});