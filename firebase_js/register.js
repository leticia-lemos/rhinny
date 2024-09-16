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


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
     setTimeout(() => {
       window.location.href = "../../pagina-inicial/pagina-inicial.html";
     }, 3000);
  }
});
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
      window.location.href = "../../pagina-inicial/pagina-inicial.html";
    })
    .catch((error) => {
      // Se ocorrer um erro durante a criação do usuário
       // Obtém a mensagem do erro
      alert(showError(error)) // Registra a mensagem do erro no console

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
  console.log(isFormContinuarValid())
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
  return true
}


function validarEmail() {
  return /\S+@\S+\.\S+/.test(Form.email());
}

function onChangeNome(){
    document.getElementById('erro-nome-obrigatorio').style.display = !Form.nome() ? 'block':'none'  
}

function onChangeEmail(){
  document.getElementById("erro-email-obrigatorio").style.display = !Form.email() ? 'block':'none'
  document.getElementById("erro-email-invalido").style.display = validarEmail() ? 'none':'block'

}

function onChangeSenha(){
  document.getElementById('erro-senha-obrigatoria').style.display = !Form.senha() ? 'block': 'none'
}

function onChangeData(){
  document.getElementById('erro-data-obrigatoria').style.display = !Form.data() ? 'block': 'none'
}

function showError(error) {
  switch (error.code) {
      case 'auth/invalid-email':
          return 'O endereço de e-mail está mal formatado.';
      case 'auth/user-disabled':
          return 'Esta conta foi desativada.';
      case 'auth/user-not-found':
          return 'Não há registro de usuário correspondente a este e-mail.';
      case 'auth/wrong-password':
          return 'A senha fornecida está incorreta.';
      case 'auth/email-already-in-use':
          return 'Este e-mail já está em uso por outra conta.';
      case 'auth/operation-not-allowed':
          return 'O método de autenticação não está habilitado.';
      case 'auth/too-many-requests':
          return 'Muitas solicitações foram feitas. Tente novamente mais tarde.';
      case 'auth/account-exists-with-different-credential':
          return 'A conta já existe com um provedor diferente. Tente fazer login com esse provedor.';
      case 'auth/invalid-credential':
          return 'As credenciais fornecidas são inválidas.';
      case 'auth/network-request-failed':
          return 'Falha na conexão com a rede. Verifique sua conexão e tente novamente.';
      default:
          return 'Ocorreu um erro desconhecido. Tente novamente.';
  }
}