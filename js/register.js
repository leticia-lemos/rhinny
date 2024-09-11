// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// https://firebase.google.com/docs/web/setup#available-libraries

document.getElementById("cadastrar").addEventListener("click", function() {
  // Obtendo os valores dos campos
  
  const email = Form.email().value;
  const senha = Form.senha().value;
  const nome = Form.nome().value;
  const telefone = Form.telefone().value;
  const genero = Form.genero().value;
  const data = Form.data().value;
})

firebase.auth().createUserWithEmailAndPassword(form.email(), form.senha())
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
    console.log(form.email().value)
    console.log(form.senha().value)
    
    // ..
  });



