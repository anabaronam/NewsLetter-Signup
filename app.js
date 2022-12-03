const express = require("express");
const bodyParser = require ("body-parser");
const request = require("request");
const https = require ("https");

const app = express();
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({apiKey: "bc200755992fe2e7d7a7c5e5f5e4b83f-us21",  server: "us21",});

//Para cargar el css y las imagenes

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

console.log(firstName, lastName, email);

const subscribingUser = {firstName: firstName, lastName: lastName, email: email};

const run = async () => {
     const response = await client.lists.addListMember("c52a778997", {
       email_address: subscribingUser.email,
       status: "subscribed",
       merge_fields: {
           FNAME: subscribingUser.firstName,
           LNAME: subscribingUser.lastName
       }
     });

     //If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req,res){
  res.redirect("/");
})







// const md5 = require("md5");
// const subscriberHash = md5(email.toLowerCase());
//
// try {
//   const response = await client.lists.getListMember("c52a778997",
//   subscriberHash
// );
//
// res.sendFile(__dirname + "/success.html");
//
// } catch (e) {
//
// if (e.status === 404){
//   res.sendFile(__dirname + "/failure.html");
// }
//
// }

//console.log(response);

// }
//  run();
// });


// const data = {
//   memebers: [
//     {
//       email_adress: email,
//       status: "subscribed",
//       merge_fields:{
//         FNAME: firstName,
//         LNAME: lastName,
//       }
//     }
//   ]
// };

// const jsonData = JSON.stringify(data)
//
// const url = "https://us21.api.mailchimp.com/3.0/lists/c52a778997";

// const options = {
//   method: "POST",
//   auth: "anabarona:bc200755992fe2e7d7a7c5e5f5e4b83f-us21"
// }



// const request = https.request(url, options, function(response){
// response.on("data", function(data){
//   console.log(JSON.parse(data));
// })
// })
//
// request.write(jsonData);
// request.end();
//
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.")
});


//Mailchip api key
//bc200755992fe2e7d7a7c5e5f5e4b83f-us21

//ide
//c52a778997
