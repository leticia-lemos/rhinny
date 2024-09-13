// Objeto Form que contém métodos para obter valores dos campos do formulário
const Form = {
  email: () => document.getElementById("email-cadastro").value,
  senha: () => document.getElementById("senha-cadastro").value,
  nome: () => document.getElementById("nome-cadastro").value,
  data: () => document.getElementById("data").value,
  data_crianca: () => document.getElementById("nome-cadastro-crianca").value,
  nome_crianca: () => document.getElementById("data-cadastro-crianca").value,
  botao_cadastrar: () => document.getElementById("btn-submit-crianca"),
  botao_continuar: () => document.getElementById("btn-continuar")
};

// Adiciona um ouvinte de evento ao botão "btn-continuar"
document.getElementById("btn-continuar").addEventListener("click", function () {

  const email = Form.email();
  const senha = Form.senha();
  const nome = Form.nome();
  console.log(email);
  console.log(senha);
  console.log(nome);
  // Tenta criar um usuário com email e senha usando Firebase
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Se a criação do usuário for bem-sucedida
      var user = userCredential.user; // Obtém o objeto do usuário
      console.log("entroooo"); // Mensagem de confirmação no console
    })
    .catch((error) => {
      // Se ocorrer um erro durante a criação do usuário
      var errorCode = error.code; // Obtém o código do erro
      var errorMessage = error.message; // Obtém a mensagem do erro
      console.log(errorCode); // Registra o código do erro no console
      console.log(errorMessage); // Registra a mensagem do erro no console

    });
});

// Adiciona um ouvinte de evento ao botão "btn-submit-crianca"
document
  .getElementById("btn-submit-crianca")
  .addEventListener("click", function (user) {
    // Obtendo os valores dos campos
    const email = Form.email(); // Obtém o email
    const senha = Form.senha(); // Obtém a senha
    const nome = Form.nome(); // Obtém o nome
    const data = Form.data(); // Obtém a data
    const nome_crianca = Form.nome_crianca(); // Obtém o nome da criança
    const data_crianca = Form.data_crianca(); // Obtém a data da criança
    console.log(nome_crianca); // Registra o nome da criança no console
    console.log(data_crianca); // Registra a data da criança no console

    // Envia os dados para a coleção "users" no Firestore
    db.collection("users")
      .doc(user.uid) // Usa o UID do usuário autenticado como documento
      .set({
        nome_adulto: nome, // Define o nome do adulto
        data_adulto: data, // Define a data do adulto
        nome_crianca: nome_crianca, // Define o nome da criança
        data_crianca: data_crianca, // Define a data da criança
      })
      .then(() => {
        console.log("dados enviados"); // Mensagem de sucesso no console
      })
      .catch((error) => {
        console.error("dados nao enviados"); // Mensagem de erro no console
      });
  });

function disableContinuar() {
  Form.botao_continuar().disabled = !isFormContinuarValid()
}

function isFormContinuarValid() {

  const nome = Form.nome();
  if (!nome) {
    Form.botao_continuar().disabled = true
    return false
  }

  const email = Form.email();
  if (!email || !validarEmail()) {
    Form.botao_continuar().disabled = true
    return false 
  }
  const senha = Form.senha();
  if (!senha || senha.length <= 5) {
    Form.botao_continuar().disabled = true
    return false
  }
  const data = Form.data();
  if (!data) {
    Form.botao_continuar().disabled = true
    return false
  }

  Form.botao_continuar().disabled = false
  return true
}


function validarEmail() {
  return /\S+@\S+\.\S+/.test(Form.email());
}
