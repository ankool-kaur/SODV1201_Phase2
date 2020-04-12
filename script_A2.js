const fs = require('fs');
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Using port ${PORT}`));
const path = require('path')
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:true}));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index_main.html");
  });

  app.get("/find_main", (request, response) => {
    response.sendFile(__dirname + "/find_main.html");
  });

  app.get("/login_main", (request, response) => {
    response.sendFile(__dirname + "/login_main.html");
  });

  app.get("/output_main", (request, response) => {
    response.sendFile(__dirname + "/output_main.html");
  });

  app.get("/properties_main", (request, response) => {
    response.sendFile(__dirname + "/properties_main.html");
  });

  app.get("/property_addition", (request, response) => {
    response.sendFile(__dirname + "/property_addition.html");
  });

  app.get("/property_editing", (request, response) => {
    response.sendFile(__dirname + "/property_editing.html");
  });

  app.get("/SignIn_main", (request, response) => {
    response.sendFile(__dirname + "/SignIn_main.html");
  });

  app.get("/SignOut_main", (request, response) => {
    response.sendFile(__dirname + "/SignOut_main.html");
  });

  app.get("/workspace_addition", (request, response) => {
    response.sendFile(__dirname + "/workspace_addition.html");
  });

  app.get("/workspace_editing", (request, response) => {
    response.sendFile(__dirname + "/workspace_editing.html");
  });

  app.get("/workspace_main", (request, response) => {
    response.sendFile(__dirname + "/workspace_main.html");
  });

  app.get("/workspace01_main", (request, response) => {
    response.sendFile(__dirname + "/workspace01_main.html");
  });

  app.get("/workspace02_main", (request, response) => {
    response.sendFile(__dirname + "/workspace02_main.html");
  });
  
  app.post("/register", (request, response) => {
    fs.readFile('users.json', function (err, data){
        if (request.body.role == undefined || request.body.name == '' || request.body.email == '' || request.body.phoneNumber == ''|| request.body.password == ''){
            response.sendFile(__dirname + "/signIn_main.html");
        }
        else{
          let current = JSON.parse(data);
          let repeat = false;
          for(i = 0; i < current.length; i++){
            if (current[i].email == request.body.email){
              repeat = true;
            }
          }
          if(repeat == true){
            response.sendFile(__dirname + "/signIn_main.html");
          }
          else{
            let current = JSON.parse(data);
            current.push(request.body);
            fs.writeFileSync('users.json', JSON.stringify(current));
            response.sendFile(__dirname + "/login_main.html");
          }
        }
    });
});


app.post("/login", (request, response) => {
  let valid = "no";
  fs.readFile('users.json', function (err, data){
      let users = JSON.parse(data);
      for(i = 0; i < users.length; i++){
        if(request.body.email == users[i].email & request.body.password == users[i].password){
          fs.writeFileSync('user.json', JSON.stringify(users[i]));
          valid = "yes";
          response.sendFile(__dirname + "/index_main.html");
      }
    }
    if(valid == "no"){
      response.sendFile(__dirname + "/login_main.html");
    }
  });
});

app.post("/out", (request, response) => {
  fs.readFile('user.json', function (err, data){
    fs.writeFileSync('user.json', "{}");
    console.log(request.body)
    response.sendFile(__dirname + "/login_main.html");
  })
});

app.post("/newProperty", (request, response) => {
  fs.readFile('properties.json', function (err, data){
    if (request.body.address == undefined || request.body.neighborhood == '' || request.body.squarefeet == '' ){
      response.sendFile(__dirname + "/property_addition.html");
    }
    else{
      let p = JSON.parse(data);
      p.push(request.body);
      fs.writeFileSync('properties.json', JSON.stringify(p));
      response.sendFile(__dirname + "/property_addition.html");
    }
  })
});

app.post("/updateProperty", (request, response) => {
  fs.readFile('properties.json', function (err, data){
    if (request.body.address == undefined || request.body.neighborhood == '' || request.body.squarefeet == '' ){
      response.sendFile(__dirname + "/property_addition.html");
    }
    else{
       let p = JSON.parse(data);
       for(i = 0; i < p.length; i++){
         if(p[i].idnum == request.body.idnum){
           p[i] = request.body;
         }
       }
       fs.writeFileSync('properties.json', JSON.stringify(p));
       response.sendFile(__dirname + "/properties_main.html");
    }
  })
});

app.post("/newWork", (request, response) => {
  fs.readFile('workspaces.json', function (err, data){
    if (request.body.name == undefined || request.body.type == '' || request.body.seating == '' || request.body.availibility == "" || request.body.leaseTerm == '' || request.body.price == ''){
      response.sendFile(__dirname + "/properties_main.html");
    }
    else{
      let w = JSON.parse(data);
      w.push(request.body);
      fs.writeFileSync('workspaces.json', JSON.stringify(w));
      response.sendFile(__dirname + "/properties_main.html");
    }
  })
});

app.post("/updateWork", (request, response) => {
  fs.readFile('workspaces.json', function (err, data){
    if (request.body.name == undefined || request.body.type == '' || request.body.seating == '' || request.body.availibility == "" || request.body.leaseTerm == '' || request.body.price == ''){
      response.sendFile(__dirname + "/properties_main.html");
    }
    else{
       let w = JSON.parse(data);
       for(i = 0; i < w.length; i++){
        console.log(w[i]);
        console.log(request.body);
         if(w[i].idnum2 == request.body.idnum2){
           w[i] = request.body;
         }
       }
       fs.writeFileSync('workspaces.json', JSON.stringify(w));
       response.sendFile(__dirname + "/properties_main.html");
    }
  })
});

app.post("/pList", (request, response) => {
  fs.readFile('properties.json', function (err, data){
    let current = JSON.parse(data);
    for(i = 0; i < current.length; i++){
      if(current[i].idnum == request.body.idnum){
        if(current[i].visibility == undefined){
          current[i].visibility = "on";
        }
        else {
          current[i].visibility = undefined;
        }
      }
    }
    fs.writeFileSync('properties.json', JSON.stringify(current));
  })
});

app.post("/WList", (request, response) => {
  fs.readFile('workspaces.json', function (err, data){
    let current = JSON.parse(data);
    for(i = 0; i < current.length; i++){
      if(current[i].idnum2 == request.body.idnum){
        if(current[i].visibility == undefined){
          current[i].visibility = "on";
        }
        else {
          current[i].visibility = undefined;
        }
      }
    }
    fs.writeFileSync('workspaces.json', JSON.stringify(current));
  })
});