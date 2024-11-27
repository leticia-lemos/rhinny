function pegarUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("uid");
}

const url = pegarUrl();


document.getElementById("favoritar").addEventListener("click", () => {
  var nomeLugar = localStorage.getItem('nomeLugar')
  var photoLugar = localStorage.getItem('img')
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      const favoritoRef = db.collection("users").doc(uid).collection('favoritos');

      favoritoRef
        .add({
          photos: photoLugar,
          name: nomeLugar,
          id: url,
        })
        .then(() => {
          console.log("Favoritado");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

firebase.firestore().collection('lugares').doc(url).get().then((snapshot) => {

    var img = document.getElementById("praca-boulevard");
    img.src = snapshot.data().photos;
    localStorage.setItem('img', snapshot.data().photos)
    
    var nomeLugar = document.getElementsByClassName("titulo-local")[0];
    nomeLugar.innerHTML = snapshot.data().name
    localStorage.setItem('nomeLugar', snapshot.data().name)

    localStorage.setItem('id', snapshot.data().id)
    
})

const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        var Usuario = doc.data();
        var UsuarioUid = doc.id;
        localStorage.setItem("idUsuario", UsuarioUid);
        localStorage.setItem("nomeUsuario", Usuario.nome_adulto);
      });
  }
});

var id = localStorage.getItem("idUsuario");
console.log(id);

async function adicionarComentario() {
  var postId = pegarUrl();
  const comentarioRef = db
    .collection("lugares")
    .doc(postId)
    .collection("comentarios");

  const comentario = document.getElementById("comentarioValue").value;
  const titulo = document.getElementById("comentarioTituloValue").value;

  await comentarioRef
    .add({
      text: comentario,
      author: localStorage.getItem("nomeUsuario"),
      stars: 0, // Inicializa com 0 estrelas
      profilePicture: "", // Caminho da foto de perfil
      data: obterDataAtual(),
      titulo: titulo,
      usuarioID: id,
    })
    .then(() => {
      console.log("Comentário adicionado com sucesso");
      mostrarComentario(); // Atualiza a lista de comentários após adicionar
    })
    .catch((error) => {
      console.log(error);
    });

    var sinalizacao = document.getElementsByClassName("Sinalização")[0];
    var audio = document.getElementsByClassName("audio")[0];
    var equipamento = document.getElementsByClassName("equipamento")[0];
    
    // Verifica se os elementos existem e obtém seus valores
    var sinalizacaoValue = sinalizacao ? sinalizacao.value : null; // Supondo que seja um input
    var audioValue = audio ? audio.value : null; // Supondo que seja um input
    var equipamentoValue = equipamento ? equipamento.value : null; // Supondo que seja um input
    
    // Referência ao documento no Firestore
    var acessibilidadeRef = db.collection("lugares").doc(postId);
    
    // Adiciona ou atualiza os dados no documento
    acessibilidadeRef.set({
      sinalizacao:sinalizacaoValue,
      audio:audioValue,
      equipamento:equipamentoValue,
      photos:lugarInfos.photo,
      name:lugarInfos.name,
      id:lugarInfos.place_id,
    })
    .then(() => {
      console.log("Dados adicionados com sucesso");
    })
    .catch((error) => {
      console.error("Erro ao adicionar dados:", error);
    });
}

async function mostrarComentario() {
  db.collection("lugares")
    .doc(url)
    .collection("comentarios")
    .get()
    .then((snapshot) => {
      const campoComentarios = document.querySelector(
        ".campo-outros-comentarios"
      );
      campoComentarios.innerHTML = ""; // Limpa os comentários existentes

      snapshot.forEach((doc) => {
        exibirComentarioNaTela(doc.data(), doc.id);
      });
    });
}

// Função para exibir o comentário na tela
function exibirComentarioNaTela(Comentario, key) {
  var campoComentarios = document.querySelector(".campo-outros-comentarios");
  const comentarioDiv = document.createElement("div");

  comentarioDiv.classList.add("grupo-outros-comentarios");

  // Arredonda a nota para determinar quantas estrelas mostrar
  const estrelasArredondadas = Math.round(Comentario.stars);

  // Preenche as estrelas com base no valor de 'stars'
  let estrelasHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= estrelasArredondadas) {
      estrelasHTML += `<span class="estrela" onclick="salvarAvaliacao('${i}','${key}')" style="color: #fcc803;">⭐</span>`; // Estrela preenchida
    } else {
      estrelasHTML += `<span class="estrela" onclick="salvarAvaliacao('${i}','${key}')" style="opacity:0.5;">⭐</span>`; // Estrela vazia
    }
  }

  comentarioDiv.innerHTML = `
        <div class="avaliacao">
            ${estrelasHTML}
            <div id="mediaAvaliacoes">${Comentario.stars}</div>
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
    `;

  campoComentarios.appendChild(comentarioDiv);
}

// Função para obter a data atual do sistema
function obterDataAtual() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1; // Mês (0-11)
  const ano = dataAtual.getFullYear();

  return `${dia}-${mes}-${ano}`;
}

// Chama a função e armazena o resultado
mostrarComentario(url, id);

async function salvarAvaliacao(nota, key) {
  var postId = pegarUrl();

  const avaliacaoRef = db
    .collection("lugares")
    .doc(postId)
    .collection("comentarios")
    .doc(key);

  // Atualiza a avaliação do comentário
  await avaliacaoRef
    .update({
      stars: nota, // Armazena apenas o campo 'stars'
    })
    .then(() => {
      console.log("Avaliação salva com sucesso!");

      // Após salvar a avaliação, calcula e salva a média
      calcularMedia(postId);
    })
    .catch((error) => {
      console.log("Erro ao salvar avaliação:", error);
    });
}

// Função para calcular e salvar a média das avaliações
async function calcularMedia(postId) {
  const comentariosRef = db
    .collection("lugares")
    .doc(postId)
    .collection("comentarios");

  const snapshot = await comentariosRef.get();

  let totalEstrelas = 0;
  let totalAvaliacoes = snapshot.size;

  snapshot.forEach((doc) => {
    totalEstrelas += doc.data().stars || 0; // Adiciona as estrelas de cada comentário
  });

  const media =
    totalAvaliacoes > 0 ? (totalEstrelas / totalAvaliacoes).toFixed(1) : 0;

  console.log(`Média das avaliações: ${media} estrelas`);

  // Atualiza o documento do lugar com a média
  await db
    .collection("lugares")
    .doc(postId)
    .update({
      notaMedia: media, // Salva a média no documento do lugar
    })
    .then(() => {
      console.log("Média salva com sucesso!");

      // Atualiza os comentários para mostrar a nova média se necessário
      mostrarComentario();
    })
    .catch((error) => {
      console.log("Erro ao salvar média:", error);
    });
}

async function initMap() {
  // Obtém os detalhes do lugar usando o place_id
  const placeDetails = await getPlaceDetails(url);
  if (!placeDetails) {
      console.error('Não foi possível obter os detalhes do lugar.');
      return;
  }

  const position = {
      lat: placeDetails.geometry.location.lat(),
      lng: placeDetails.geometry.location.lng()
  };

  // Cria o mapa centrado na posição do lugar
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: position
  });

  // Adiciona um marcador no local
  const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: placeDetails.name // Título do marcador
  });
}

async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyAvvanoz7U50-4faMR7NRMsBcc0CfOnCZY`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Erro ao buscar detalhes do lugar: ' + response.statusText);
      }
      const data = await response.json();
      return data.result; // Retorna os detalhes do lugar
  } catch (error) {
      console.error(error);
      return null; // Retorna null em caso de erro
  }
}