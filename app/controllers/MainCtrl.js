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

    const colRef = firestore.collection("agents");
    const $nomInput = $("#nom");
    const $prenomInput = $("#prenom");
    const $departement = $("#departement");
    const $errorMessage = $("#error-message");
    const $agentTableRow = $("#agent-table tbody");



    //
    $scope.myClick = function () {

        var id = $idInput.val();
        if (id == "") {
            $errorMessage.text("An ID is requierd");
            return;
        }

        var docRef = colRef.doc(id);

        docRef.set({
            Nom: $nomInput.val(),
            Prenom: $prenomInput.val(),
            Departement: $departement.dropdown('get value')
        }).then(function () {
            console.log("Status saved");
            $idInput.val("");
            $nomInput.val("");
            $prenomInput.val("");
            $departement.val("");
            $errorMessage.hide();
        }).catch(function (error) {
            console.log("Got an error: ", error);
            $errorMessage.text("Got an error: " + error);
            $errorMessage.show();
        });
    }

    $scope.onCollectAgents = function () {
        $agentTableRow.empty();

        colRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (doc && doc.exists) {
                        var data = doc.data();
                        var row = "<td>" + doc.id + "</td>" + "<td>" + data.Nom + "</td>" + "<td>" + data.Prenom + "</td>" + "<td>" + data.Departement + "</td>";

                        $agentTableRow.append('<tr>' + row + '</tr>');
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }


    getRealTimeUpdates = function () {
        $agentTableRow.empty();

        colRef.onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc && doc.exists) {
                    var data = doc.data();
                    var row = "<td>" + doc.id + "</td>" + "<td>" + data.Nom + "</td>" + "<td>" + data.Prenom + "</td>" + "<td>" + data.Departement + "</td>";

                    $agentTableRow.append('<tr>' + row + '</tr>');
                    console.log();
                }

            });

        });
    }

    getRealTimeUpdates();

});