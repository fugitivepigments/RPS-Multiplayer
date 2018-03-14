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

var playerNum = 0;

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
var localPlayer = {};

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

  // Player object
  var player =
     {
      name: playerName,
      wins: wins,
      losses: losses,
      currentChoice: ''
    };

  localPlayer = player;

  // Push the user to our users array (table) in the database
  usersRef.child(player.name).set(player);

  // add the player to our local array of the players
  players.push(player);

  // This is where we update the dom
  // and check which player the user will be
  addPlayer(player);

  console.log('player', player);


  // Once a user logs in, you dont want them to log in again, 
  // so remove that container
  $('.login-wrapper').remove();

  // TODO -- 
  // Check and see if we have both players, when we do, start the game!!!
  if ( players.length === 2 ) {
    startGame();
  }

})

// This function will add the palyer to the dom, updating all necessary elements
function addPlayer(player) {

  // player one or player two?
  

  // if there is already a player in the local array, this player is player 2
  // otherwise this player is player one
  if (players.length > 0) {
    playerNum = 2;
  } else {
    playerNum = 1;
  }

  // Add all the stuff to the dom
  var $whichPlayer = $('.player-' + playerNum);

  $whichPlayer.find('.player-name').text(player.name);
  $whichPlayer.find('.wins').text(player.wins);
  $whichPlayer.find('.losses').text(player.losses);
}

// This function starts the game
function startGame() {

  // TODO --
  // Add Rocks, papers and scissors for the player to click on
  $('.rpc-choices').removeClass('d-none');


  // TODO --
  // Add event listeners on those things to see which one they clicked

  // This class is applied to all choices
  $('.rpc-choice').on('click', function() {

    // TODO --
    // Check which one they clicked with a data attribute
    var choice = $(this).data('rpc');

    console.log('choice', choice);

    localPlayer.currentChoice = choice;

    // once the choice has been made, add it to the player object and
    // push it to firebase

    // database.ref('users/'+localPlayer.name).update(localPlayer);

    //https://stackoverflow.com/questions/14963776/get-users-by-name-property-using-firebase
    //https://firebase.google.com/docs/database/web/read-and-write#get_a_database_reference

    console.log('localPlayer', localPlayer);

    usersRef.child(localPlayer.name).update({ currentChoice: choice })


    // then we need to check and see if the other player has made a choice

    // get the other player by 


    // TODO --
    // Once the user has made a choice, check if the other player has also made a choice

    // If they have then match the two choices and see who one, and who lost,
    // update the dom

  });
}



// Listen for a player signing up
usersRef.once('value', function(snapshot) {
  if (snapshot.val()) {
    console.log( 'THIS SHOULD BE THE NEW USER snapshot.val()', snapshot.val() );

    addPlayer( snapshot.val() );

    // add the player to our local array of the players
    players.push(snapshot.val());
  }
  
});


