const Form = {
    email: () => document.getElementById("email-cadastro").value,
    senha: () => document.getElementById("senha-cadastro").value,
    nome: () => document.getElementById("nome-cadastro").value,
    data: () => document.getElementById("data-cadastro").value,
    data_crianca: () => document.getElementById("nome-cadastro-crianca").value,
    nome_crianca: () => document.getElementById("data-cadastro-crianca").value,
    
  };

document.getElementById("btn-continuar").addEventListener("click", function() {
    // Obtendo os valores dos campos
    const email = Form.email();
    const senha = Form.senha();
    const nome = Form.nome();
    console.log(email)
    console.log(senha)
    console.log(nome)
    
  })

  document.getElementById("btn-submit-crianca").addEventListener("click", function() {
    // Obtendo os valores dos campos
    const nome_crianca = Form.nome_crianca();
    const data_crianca = Form.data_crianca();
    console.log(nome_crianca)
    console.log(data_crianca)
    
  })


  firebase.auth().createUserWithEmailAndPassword()
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
  