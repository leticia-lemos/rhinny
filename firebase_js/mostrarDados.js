
// let globalUserId = null;

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     globalUserId = user.uid;
//     console.log('usuario logado'+ globalUserId)
//   } else {
//     console.log("Nenhum usuário logado.");
//   }
// });

// function getUserData(globalUserId) {
//     const userRef = firebase.firestore().collection('users').doc(globalUserId); // Supondo que a coleção se chama 'users'
//     userRef.get().then((doc) => {
//         if (doc.exists) {
//             const userData = doc.data();
//             displayUserData(userData);
//         } else {
//             console.log("Nenhum documento encontrado!");
//         }
//     }).catch((error) => {
//         console.error("Erro ao obter documento:", error);
//     });
// }

// // Função para exibir dados do usuário na tela
// function displayUserData(data) {
//     console.log(data.uid)
// }
  