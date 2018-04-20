mainApp.controller('MainCtrl', function MainCtrl($scope) {

    //
    $('.ui.dropdown').dropdown();
    $('.menu .item').tab();

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBAke6SOKWX52KcQtDYDSTG2LD8s39x8EI",
        authDomain: "reidha-12034.firebaseapp.com",
        databaseURL: "https://reidha-12034.firebaseio.com",
        projectId: "reidha-12034",
        storageBucket: "",
        messagingSenderId: "528557444361"
    };

    firebase.initializeApp(config);

    var firestore = firebase.firestore();
    const $idInput = $("#id");

    const docRef = firestore.doc("recenseurs/" + $idInput.val());
    const $nomInput = $("#nom");
    const $prenomInput = $("#prenom");


    //
    $scope.myClick = function () {

        docRef.set({
            Nom: $nomInput.val(),
            Prenom: $prenomInput.val(),
            Departement: ""
        }).then(function () {
            console.log("Status saved")
        }).catch(function (error) {
            console.log("Got an error: ", error)
        });

    }
});