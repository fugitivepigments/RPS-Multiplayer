//form to input playername
//waiting for another player to join
//data goes to firebase, creates branches for choices
//>multiRPS
// -----------players
// ------------------1
// ---------------------choice - created on choice
// ---------------------losses:0
// ---------------------name:
// ---------------------wins:0
//
// ------------------2
// ---------------------choice - created on choice
// ---------------------losses:0
// ---------------------name:
// ---------------------wins:0
// >turn:1
//display results
//if disconnected removed from firebase
//chat window where disconnect message is displayed

//Global variables
var wins = 0;
var losses = 0;
var ties = 0;
var turn = 1;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCoC4q6nV6ettXcNZvq-xdGf3mG8BOWL7I",
  authDomain: "rpsgame-356d4.firebaseapp.com",
  databaseURL: "https://rpsgame-356d4.firebaseio.com",
  projectId: "rpsgame-356d4",
  storageBucket: "",
  messagingSenderId: "950841213530"
};

firebase.initializeApp(config);

var database = firebase.database();

var usersRef = database.ref('users');

var players = [];

function didYouWin(yourRPS, opponentRPS) {
  // Run traditional rock, paper, scissors logic and return whether you won, lost, or had a draw.
  switch (yourRPS) {
    case 'rock':
      switch (opponentRPS) {
        case 'rock':
          return 'draw';
        case 'paper':
          return 'lose';
        case 'scissors':
          return 'win';
      }
      break;
    case 'paper':
      switch (opponentRPS) {
        case 'rock':
          return 'win';
        case 'paper':
          return 'draw';
        case 'scissors':
          return 'lose';
      }
      break;
    case 'scissors':
      switch (opponentRPS) {
        case 'rock':
          return 'lose';
        case 'paper':
          return 'win';
        case 'scissors':
          return 'draw';
      }
      break;
  }
}

// Listening for player name form submit
$("#form-player-name").on("submit", function(event) {
  event.preventDefault();

  // Gets user input
  var playerName = $("#player-name").val().trim();

  // Players object
  var player =
     {
      name: playerName,
      wins: wins,
      losses: losses,
    };

  // add the player to our local array of the players
  players.push(player);

  // Push the user to our users array (table) in the database
  // usersRef.push(player);

  usersRef.set(player);

  // This is where we update the dom
  addPlayer(player);

  console.log('player', player);
})

// This function will add the palyer to the dom, updating all necessary elements
function addPlayer(player) {

  // TODO - AM I PLAYER ONE OR PLAYER TWO??
  // 

  var $whichPlayer = $('.player-1');

  $whichPlayer.find('.player-name').text(player.name);
  $whichPlayer.find('.wins').text(player.wins);
  $whichPlayer.find('.losses').text(player.losses);


}



// Listen for a player signing up
usersRef.on('value', function(snapshot) {
  if (snapshot.val()) {
    console.log( 'THIS SHOULD BE THE NEW USER snapshot.val()', snapshot.val() );

    addPlayer( snapshot.val() );
  }
  
});


