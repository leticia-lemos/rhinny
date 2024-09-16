// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// https://firebase.google.com/docs/web/setup#available-libraries


const form_login = {
  email: () => document.getElementById('email_cadastro').value,
  senha: () => document.getElementById('senha_cadastro').value,
};

function entrar(){
  
  var email = form_login.email()
  var password = form_login.senha()
  console.log(password)
  console.log(email)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href = "../../pagina-inicial/pagina-inicial.html"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode)
    console.log(errorMessage)
  });

}


