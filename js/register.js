const firebaseConfig = {
    apiKey: "AIzaSyAK1Y4DAftt63mVx3tngghMWXYDfg5zzTo",
    authDomain: "rhinny-319e6.firebaseapp.com",
    projectId: "rhinny-319e6",
    storageBucket: "rhinny-319e6.appspot.com",
    messagingSenderId: "860506842460",
    appId: "1:860506842460:web:e3176d1e88d16664590d99",
    measurementId: "G-KKE67JZ0M6"
}

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

