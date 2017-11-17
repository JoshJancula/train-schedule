         /* global moment firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtC6TyWH0pE0gng-SMGVZwrgBbRYDSR1A",
    authDomain: "fir-homework-7f74d.firebaseapp.com",
    databaseURL: "https://fir-homework-7f74d.firebaseio.com",
    projectId: "fir-homework-7f74d",
    storageBucket: "",
    messagingSenderId: "655417347247"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var firstTrain;
var frequency = "";

// this is for when we want to load the entire screen
database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
  // storing the snapshot.val() in a variable for convenience
var sv = childSnapshot.val();
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTrainConverted = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
// Difference between the times
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
// Time apart (remainder)
var tRemainder = diffTime % sv.frequency;

    // Minutes Until Train
var minutesAway = sv.frequency - tRemainder;
  // Next Train
var nextTrain = moment().add(minutesAway, "minutes");
var nextArrival = moment(nextTrain).format("HH:mm");

  loadDataDisplay(sv.name, sv.destination, sv.firstTrain, sv.frequency, nextArrival, minutesAway);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#firstTrain-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

    $("#name-input").val("");
      $("#destination-input").val("");
        $("#firstTrain-input").val("");
          $("#frequency-input").val("");
});

// function to load the data on the screen
function loadDataDisplay(name, destination, firstTrain, frequency, nextArrival, minutesAway) {
  $(".tableBody").append("<tr>");
  $(".tableBody").append("<td id=\"name-display\">" + name + "</td>");
  $(".tableBody").append("<td id=\"destination-display\">" + destination + "</td>");
  $(".tableBody").append("<td id=\"firstTrain-display\">" + firstTrain + "</td>");
  $(".tableBody").append("<td id=\"frequency-display\">" + frequency + "</td>");
  $(".tableBody").append("<td id=\"nextArrival-display\">" + nextArrival + "</td>");
  $(".tableBody").append("<td id=\"minutesAway-display\">" + minutesAway + "</td>");
  $(".tableBody").append("</tr>");

}

