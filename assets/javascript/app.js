var config = {
        apiKey: "AIzaSyCaeRmuM5PoHokxD83Oo96G3tNDw8KYQPw",
        authDomain: "trainapp-31d9f.firebaseapp.com",
        databaseURL: "https://trainapp-31d9f.firebaseio.com",
        projectId: "trainapp-31d9f",
        storageBucket: "",
        messagingSenderId: "920246402569"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function(event) {

        event.preventDefault();

        var  trainName = $("#trainNameInput").val().trim();
        var  destination = $("#destinationInput").val().trim();
        var  firstTrain = $("#frsttrainInput").val().trim();
        var  frequency = $("#frequencyInput").val().trim();

        var newTrain = {
        	trainName: trainName,
        	destination: destination,
        	firstTrain: firstTrain,
        	frequency: frequency,
        };

        database.ref().push(newTrain);

        console.log(newTrain.trainName)
        console.log(newTrain.destination)
        console.log(newTrain.firstTrain)
        console.log(newTrain.frequency)

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#frsttrainInput").val("");
        $("#frequencyInput").val("");
    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){

    	console.log(childSnapshot.val());

    	var  trainName = childSnapshot.val().trainName;
        var  destination = childSnapshot.val().destination;
        var  firstTrain = childSnapshot.val().firstTrain;
        var  frequency = childSnapshot.val().frequency; 

        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "days");
    console.log(firstTrainConverted);
;
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $(".table").append("<tr><td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>Every " + frequency + "min</td>" + "<td>" + moment(nextTrain).format("hh:mm") + "</td>"  + "<td>" + minutesAway + "</td></tr>");





    })