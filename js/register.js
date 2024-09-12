const Form = {
  email: () => document.getElementById("email-cadastro").value,
  senha: () => document.getElementById("senha-cadastro").value,
  nome: () => document.getElementById("nome-cadastro").value,
  data: () => document.getElementById("data-cadastro").value,
  data_crianca: () => document.getElementById("nome-cadastro-crianca").value,
  nome_crianca: () => document.getElementById("data-cadastro-crianca").value,
};

document.getElementById("btn-continuar").addEventListener("click", function () {
  // Obtendo os valores dos campos
  const email = Form.email();
  const senha = Form.senha();
  const nome = Form.nome();
  console.log(email);
  console.log(senha);
  console.log(nome);

if(email,senha){
    document.getElementById("btn-continuar").style.opacity = '100%'
}

  firebase
  .auth()
  .createUserWithEmailAndPassword(email,senha)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("entroooo");

    // ...

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            const uid = user.uid
            console.log(uid)
        }
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

    // ..
  });
});

document
  .getElementById("btn-submit-crianca")
  .addEventListener("click", function () {
    // Obtendo os valores dos campos
    const nome_crianca = Form.nome_crianca();
    const data_crianca = Form.data_crianca();
    console.log(nome_crianca);
    console.log(data_crianca);

    db.collection("users").doc("1")
      .set({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      })
      .then(() => {
        console.log("dados enviados")
      })
      .catch((error) => {
        console.error("dados nao enviados");
      });
  });


