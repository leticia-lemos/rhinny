firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    globalUserId = user.uid;
    console.log("usuario logado" + globalUserId);
    getUserData(globalUserId);
    mostrarDadosAuth(user);
  } else {
    console.log("Nenhum usuário logado.");
  }
});

function getUserData(globalUserId) {
  const userRef = firebase.firestore().collection("users").doc(globalUserId); // Supondo que a coleção se chama 'users'
  userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        mostrarDadosFirestore(userData);
      } else {
        console.log(globalUserId);
        console.log("Nenhum documento encontrado!");
      }
    })
    .catch((error) => {
      console.error("Erro ao obter documento:", error);
    });
}

// Função para exibir dados do usuário na tela

function mostrarDadosFirestore(userData) {
  document.getElementById("nome_usuario").innerHTML = userData.nome_adulto;
  document.getElementById("nome_crianca").innerHTML = userData.nome_crianca;
  document.getElementById("nome_adulto").innerHTML = userData.nome_adulto;
  document.getElementById("nome_trocar").placeholder = userData.nome_crianca;
  document.getElementById("nome_trocar").value = userData.nome_crianca;

}

function mostrarDadosAuth(user) {
  document.getElementById("email_trocar").placeholder = user.email;
  document.getElementById("email_trocar").value = user.email;
}

function apagandoUsuario() {
  const user = firebase.auth().currentUser;
  user
    .delete()
    .then(() => {
      alert("Conta deletada");
      logout();
    })
    .catch((error) => {
      alert("Ocorreu um erro" + error.code);
      // ...
    });

  const userRef = firebase.firestore().collection("users").doc(globalUserId);
  userRef
    .delete()
    .then(() => {})
    .catch((error) => {
      alert("Não apagou do banco");
    });
}

function mudarDados() {
  const userRef = firebase.firestore().collection("users").doc(globalUserId);
  const nome_mudanca = document.getElementById("nome_trocar").value;
  const senha = document.getElementById("password-trocar").value;
  userRef
    .update({
      nome_crianca: nome_mudanca,
    })
    .then(() => {
      alert("Dados do usuário modificados com sucesso");
    });

  if (senha) {
    var email =   document.getElementById("email_trocar").value
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Email de redefinição de senha enviado
        alert('Email para redefinição de senha enviado para' + email)
      })
      .catch((error) => {
        // Ocorreu um erro
        alert("Erro ao enviar email de redefinição de senha:", error);
      });
  }
}
