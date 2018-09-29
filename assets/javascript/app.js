//test
console.log('hello');

let food = [];
//zomato api bffe3bea078cbc9eee86b514973b129e
$(document).ready(function(){

/*add this to your html -> <script src="https://storage.googleapis.com/code-snippets/rapidapi.min.js"></script> */
var rapid = new RapidAPI("default-application_5b85e35fe4b02d6cfa69e89b", "39d8805b-7d44-474d-92c4-b6d5a8def142");
$("#search").on('click', function(){
rapid.call('Zomato', 'search', { 
	'apiKey': 'bffe3bea078cbc9eee86b514973b129e',
	'coordinates': '30.26875275473545, -97.7448378504939',
	'count': '50',
	'radiusSearch': '1500',
	'entityId': '0',
	'searchQuery': $("#input").val(),
	'order': 'desc',
	'sort': 'rating'

}).on('success', function (payload) {
   /*YOUR CODE GOES HERE*/ 

   //empty list when new search 
   $("#card_list").empty();
   food = payload.result.restaurants;

   //provide cards for each result
   for(i=0; i< food.length; i++){

     //test
  console.log(payload.result.restaurants[i]);

  //target restaurant name
  let name = food[i].restaurant.name;
  //test
  console.log(name + ' name');
  //target restaurant address
  let address = food[i].restaurant.location.address;
  //test
  console.log(address + ' address');
   //target restaurant price
  let priceRange = food[i].restaurant.price_range;
  //test
  console.log(priceRange + ' price_range');
 //target restaurant rating
  let rating = food[i].restaurant.user_rating.aggregate_rating;
  //test
  console.log(rating +' rating');
 //target restaurant image
  let image = food[i].restaurant.featured_image;
  //test
  console.log(image +' image');
  //target latitude
  let latitude = parseFloat(food[i].restaurant.location.latitude);
  //target longitude
  let longitude = parseFloat(food[i].restaurant.location.longitude);

  //card for the food result
  //provide card with class equal to price range for filter targeting
  let foodDiv = $("<div class='card font-weight-bold col-sm-3 m-3 "+priceRange+"'>");
  console.log(foodDiv);
  //create image for card
  let imageDiv = $("<div class='card-image waves-effect waves-block waves-light'> <img class='activator' src='"+image+"'></div>");
  //create content div
  let contentDiv = $("<div class='card-content'> <span class='card-title font-weight-bold activator grey-text text-darken-4'>"+ name +"<i class='material-icons text-light bg-primary p-1 rounded right'>more</i></span></div>");
  //creating div to hold more content pop-up
  let moreContent = $("<div class='card-reveal'>");
  //create element for content
  //display name on the card
  let pName = $("<p class='details' data-name='"+ name +"'>").text(name);
  //display rating on the card
  let pRating = $("<p class='details' data-rating='"+ rating +"'>").text("Rating: " + rating);
  //display price on the card
  let pPrice = $("<p class='details' data-price='"+ priceRange +"'>").text("Price Range: " + priceRange);
  //display address on the card
  let pAddress = $("<p class='details' data-address='"+ address +"'>").text(address);

  //append content to card
  foodDiv.append(imageDiv)
  foodDiv.append(contentDiv)
  foodDiv.append(moreContent);
  moreContent.append(pName, pRating, pPrice, pAddress);
  //populate cards in the card list div
  $("#card_list").prepend(foodDiv);

  //add data attribute to the card equal to the restaurant's rating
  foodDiv.attr("data", priceRange);
  //test
  console.log($(".card").attr("data") + ' ayn');
  
// Initialize and add the map
function initMap() {
  // The location of target
  var target = {lat: latitude, lng: longitude};
  // The map, centered at target
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: target});
  // The marker, positioned at targer
  var marker = new google.maps.Marker({position: target, map: map});
}


//test
console.log($(".card")[0].attributes[1].value);
};
//filter by price range
$(".filter").on('click', function(){
  $(".card").hide();
  
  $("#one").on('click', function(){
    $(".1").show('slow');
    $(".2").show('slow');
   });
  
   $("#two").on('click', function(){
    $(".3").show('slow');
    $(".4").show('slow');
   });
  
   $("#three").on('click', function(){
    $(".4").show('slow');
    $(".5").show('slow');
   });
   
})



//when a card is double clicked
$(".card").dblclick(function() {
  //grab info and image from card
  let dataName = $($(this)[0].children[2].children[0]).clone();
  let dataAddress = $($(this)[0].children[2].children[3]).clone();
  let dataPrice = $($(this)[0].children[2].children[2]).clone();
  let dataRating = $($(this)[0].children[2].children[1]).clone();
  let dataImg = $($(this)[0].children[0].children[0]).clone();

  //hide all the cards
  $('.card').hide('slow');
  //prepend pop-up to card_list div
  $('#card_list').prepend("<div class='pop-up p-5 rounded'></div>");
  //prepend X in pop-up info
  $(".pop-up").prepend("<button class='exit btn-dark'>X</button>")

  //append image and info to pop-up
  $('.pop-up').append(dataImg);
  $('.pop-up').append(dataName);
  $('.pop-up').append(dataPrice);
  $('.pop-up').append(dataRating);
  $('.pop-up').append(dataAddress);
  $('.pop-up').append("<div class='m-2 rounded' id='map'></div>");
  //give image a rounded adge and make it center
  $(".activator").addClass('rounded mx-auto d-block');

  
 
  initMap();

//when x is clicked
$(".exit").on('click', function(){
  //show cards
  $('.card').show('slow');
  //remove pop-up screen
  $(".pop-up").remove();
})

})


}).on('error', function (payload) {
	 /*YOUR CODE GOES HERE*/ 
});



});


})

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVrSkm_KDrlSCH0KDWo3pQIKfW5xRRWJk",
  authDomain: "cravings-e8497.firebaseapp.com",
  databaseURL: "https://cravings-e8497.firebaseio.com",
  projectId: "cravings-e8497",
  storageBucket: "cravings-e8497.appspot.com",
  messagingSenderId: "938938502432"
};
firebase.initializeApp(config);

//firebase database reference
let auth = firebase.auth();
let dB = firebase.database();
let user = firebase.auth().currentUser;

//global variables to hold for firebase
let workingUser = '';

// handles signing in 
const signIn = () => {
  if (user) {
      auth.signOut();
  } else {
      let email = $(".email-input").val().trim();
      let password = $(".password-input").val().trim();
      workingUser = email;
      //if email is too short or not correct or input
      if (email.length < 5) {
          $(".msg").append("Please enter an email address.");
          return;
      }
      //if password length is not correct or input
      if (password.length < 6) {
          $(".msg").append("Please enter a password.");
          return;
      }
      //starting the sign in process
      auth.signInWithEmailAndPassword(email, password).cath(function (error) {
          //space for handeling errors
          let errorCode = error.code;
          let errorMsg = error.message;
          //lets user know if password is incorrect
          if (errorCode === 'auth/wrong-password') {
              $(".msg").append("Wrong Password.");
          } else {
              $(".msg").append(errorMsg);
          }
      })

  }
}

// handles when a user is signing up for the first time
const signUp = () => {
  let email = $(".email-input").val().trim();
  let password = $(".password-input").val().trim();
  // what to do when an email address is not entered or short
  if (email.lenght < 5) {
      $(".msg").append("Please enter an email address");
      return;
  }
  // what to do when a password is not entered or too short
  if (password.length < 6 || password.match(/[A-z]/) || password.match(/[A-Z]/) || password.match(/\d/) ) {
      $(".msg").append("Please enter a password longer than 6 characters, has at least 1 capital letter, and 1 number.");
      return;
  }
  //creates a new user with an email and password
  auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMsg = error.message;
      if (errorCode === "auth/weak-password") {
          $(".msg").append("This password is too weak, please create a stronger password");
      } else {
          $(".msg").append(errorMsg);
      }
      emailVerif();
  })
}

// handels sending an email verification
const emailVerif = () => {
  user.sendEmailVerification().then(function() {
      $(".msg").append("Email verification has been sent!");
  })
}

//handels password resets
const passReset = () => {
  let email = $(".email-input").val().trim();
  auth.sendPasswordResetEmail(email).then(function() {
      $(".msg").append("Password reset email has been sent!");
  }).catch(function(error) {
      let errorCode = error.code;
      let errorMsg = error.message;
      if (errorCode === "auth/invalid-email") {
          $(".msg").append("Email is invalid");
          return;
      }
      if (errorCode === "auth/user-not-found") {
          $(".msg").append("Email/user was not found");
          return;
      }
  })
}
//saves recent searches in database for each user
// will create database branch by username, if not already created, then brings up recent searches. only last 5 searches. 
const searchSave = () => {
  let recentSearch = $(".search-input").val().trim();
  db.ref(workingUser).set({
      recents: recentSearch,
  })
}

$(".signIn").on("click", signIn);
$(".signUp").on("click", signUp);
$(".restPass").on("click",passReset);
