window.onload = showTime();

function showTime(){
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString()
  document.getElementById("dateTime").innerHTML = time + " " + date
  setTimeout(showTime, 100);
};

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

const b3 = document.getElementById('b3');

b3.addEventListener("click", ()=>{
    const address = document.getElementById('property-address').value;
    const neighborhood = document.getElementById('property-neighborhood').value;
    const sqft = document.getElementById('property-square-feet').value;
    const parking = document.getElementById('property-parking').checked;
    const transportation = document.getElementById('property-transportation').checked;
    const visibility = true;
    if (address == '' || neighborhood == '' || sqft == '') {
      alert('Must enter all fields');
    } else {  
        alert('Property Added');
    }
    });


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
    if (!asOwner(data)) {
      window.location.href = 'index_main.html';
    }
  } else {
    window.location.href = 'index_main.html';
  }
  if (LoggedIn(data)) {
    if (asOwner(data)) {
      navBar('Home', "/");
      navBar('Add New', "/property_addition");
      navBar('My Properties', "/properties_main");
      navBar('My Workspaces', "/workspace_main");
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
  document.getElementById("owner").value = data.email;
  document.getElementById("idnum").value = Math.floor(Math.random() * 1000000000);
  create(data)
}).catch(err => {
  console.error("error: ", err);
});