
firebase.auth().createUserWithEmailAndPassword("receba@gmail.com", "oieeeeeeeee")
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log('entroooo')
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // ..
  });

