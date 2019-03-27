

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

$(document).on('click',"#signinWithGoogle",function(event){
    event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.email);
        console.log(user.displayName);
        database.ref('/users').once('value',function(snap){
            if(snap.val() && Object.keys(snap.val()).indexOf(user.uid) == -1){
                pushUserToDB(user);
                updateUserToDBwithName(user);
            }
        })
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        showError(errorCode,errorMessage);
    });
})




  