console.log(localStorage.getItem("lugarInfo"));

const lugarInfos = JSON.parse(localStorage.getItem("lugarInfo"));

var img = document.getElementById("praca-boulevard");

img.src = lugarInfos.photo;

var nomeLugar = document.getElementsByClassName("titulo-local")[0];

function pegarUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("uid");
}
const url = pegarUrl()
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK1Y4DAftt63mVx3tngghMWXYDfg5zzTo",
  authDomain: "rhinny-319e6.firebaseapp.com",
  projectId: "rhinny-319e6",
  storageBucket: "rhinny-319e6.firebasestorage.app",
  messagingSenderId: "860506842460",
  appId: "1:860506842460:web:e3176d1e88d16664590d99",
  measurementId: "G-KKE67JZ0M6",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log(uid)
      db.collection('users').doc(uid).get().then((doc) => {
        var Usuario = doc.data()
        var UsuarioUid = doc.id
        localStorage.setItem('idUsuario', UsuarioUid)
        localStorage.setItem('nomeUsuario',Usuario.nome_adulto)
        
      })
    }   
    
  })

  var id = localStorage.getItem('idUsuario')
  console.log(id)

async function adicionarComentario() {
  
  var postId = pegarUrl()
  const comentarioRef = db
    .collection("lugares")
    .doc(postId)
    .collection("comentarios");
const comentario = document.getElementById('comentarioValue').value
const titulo = document.getElementById('comentarioTituloValue').value
  await comentarioRef.add({
    text: comentario,
    author: localStorage.getItem('nomeUsuario'),
    stars: '', // Deve ser um número entre 1 e 5
    profilePicture: '', // Caminho da foto de perfil
    data:obterDataAtual(),
    titulo:titulo,
  }).then(() => {
    console.log('foi')
  }).catch((error) => {
    console.log(error)
  });
}

async function mostrarComentario() {

    db.collection('lugares').doc(url).collection('comentarios').get().then((snapshot) => {
        snapshot.forEach((doc) => {
        exibirComentarioNaTela(doc.data())

        })
        mostrarMediaAvaliacoes()
    })
   
}

// Função para exibir o comentário na tela
function exibirComentarioNaTela(Comentario) {
    var campoComentarios = document.querySelector(".campo-outros-comentarios")
    const comentario = document.createElement('div')
    comentario.classList.add('grupo-outros-comentarios')

    comentario.innerHTML = `
    <div class="avaliacao">
            <span class="estrela" onclick="salvarAvaliacao(1)" data-value="1">⭐</span>
            <span class="estrela" onclick="salvarAvaliacao(2)" data-value="2">⭐</span>
            <span class="estrela" onclick="salvarAvaliacao(3)" data-value="3">⭐</span>
            <span class="estrela" onclick="salvarAvaliacao(4)" data-value="4">⭐</span>
            <span class="estrela" onclick="salvarAvaliacao(5)" data-value="5">⭐</span>
            <div id="mediaAvaliacoes">${Comentario.notaMedia}</div>
        </div>
          <h2 class="titulo-comentario">${Comentario.titulo}</h2>
          <p class="p-comentario">${Comentario.text}</p>
          <div class="usuario-comentario">
            <img src="./img/user1.svg" alt="Foto de perfil">
            <div class="usuario-data">
              <p class="nome-user">${Comentario.author}</p>
              <p class="data">${Comentario.data}</p>
            </div>
          </div>
        </div>
    `
campoComentarios.appendChild(comentario)
}

// Chamada da função com os IDs específicos
// Função para obter a data atual do sistema
function obterDataAtual() {
    // Cria um novo objeto Date
    const dataAtual = new Date();

    // Obtém o dia, mês e ano
    const dia = dataAtual.getDate(); // Dia do mês
    const mes = dataAtual.getMonth() + 1; // Mês (0-11, então adicionamos 1)
    const ano = dataAtual.getFullYear(); // Ano

    // Retorna a data formatada como uma string
    return `${dia}-${mes}-${ano}`;
}

// Chama a função e armazena o resultado
const dataFormatada = obterDataAtual();
mostrarComentario(url, id); 

function salvarAvaliacao(nota) {
    var postId = pegarUrl();
    console.log(postId)
    console.log(id)

    const avaliacaoRef = db.collection("lugares").doc(postId).collection('comentarios').doc(id);
     avaliacaoRef.update({
        stars: nota, // Armazena apenas o campo 'stars'
    }).then(() => {
        console.log('Avaliação salva com sucesso!');
    }).catch((error) => {
        console.log('Erro ao salvar avaliação:', error);
    });
}
// Função para calcular e mostrar a média das avaliações
async function mostrarMediaAvaliacoes() {
    var postId = pegarUrl();
    const avaliacaoRef = db.collection("lugares").doc(postId).collection("avaliacoes");

    const snapshot = await avaliacaoRef.get();
    let totalEstrelas = 0;
    let totalAvaliacoes = snapshot.size;

    snapshot.forEach(doc => {
        totalEstrelas += doc.data().stars;
    });

    const media = totalAvaliacoes > 0 ? (totalEstrelas / totalAvaliacoes).toFixed(1) : 0;

    // Exibe a média arredondada
    console.log(`Média das avaliações: ${media} estrelas`);
    
    // Aqui você pode exibir a média na interface do usuário
    document.getElementById('mediaAvaliacoes').innerText = `Média: ${media} estrelas`;

    // Mostrar as estrelas preenchidas de acordo com a média
    
}