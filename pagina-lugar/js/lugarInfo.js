console.log(localStorage.getItem("lugarInfo"));

const lugarInfos = JSON.parse(localStorage.getItem("lugarInfo"));

var img = document.getElementById("praca-boulevard");
img.src = lugarInfos.photo;

var nomeLugar = document.getElementsByClassName("titulo-local")[0];

function pegarUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("uid");
}

const url = pegarUrl();

const db = firebase.firestore();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        console.log(uid);
        db.collection('users').doc(uid).get().then((doc) => {
            var Usuario = doc.data();
            var UsuarioUid = doc.id;
            localStorage.setItem('idUsuario', UsuarioUid);
            localStorage.setItem('nomeUsuario', Usuario.nome_adulto);
        });
    }
});

var id = localStorage.getItem('idUsuario');
console.log(id);

async function adicionarComentario() {
    var postId = pegarUrl();
    const comentarioRef = db.collection("lugares").doc(postId).collection("comentarios");

    const comentario = document.getElementById('comentarioValue').value;
    const titulo = document.getElementById('comentarioTituloValue').value;

    await comentarioRef.add({
        text: comentario,
        author: localStorage.getItem('nomeUsuario'),
        stars: 0, // Inicializa com 0 estrelas
        profilePicture: '', // Caminho da foto de perfil
        data: obterDataAtual(),
        titulo: titulo,
        usuarioID: id,
    }).then(() => {
        console.log('Comentário adicionado com sucesso');
        mostrarComentario(); // Atualiza a lista de comentários após adicionar
    }).catch((error) => {
        console.log(error);
    });
}

async function mostrarComentario() {
    db.collection('lugares').doc(url).collection('comentarios').get().then((snapshot) => {
        const campoComentarios = document.querySelector(".campo-outros-comentarios");
        campoComentarios.innerHTML = ''; // Limpa os comentários existentes

        snapshot.forEach((doc) => {
            exibirComentarioNaTela(doc.data(), doc.id);
        });
    });
}

// Função para exibir o comentário na tela
function exibirComentarioNaTela(Comentario, key) {
    var campoComentarios = document.querySelector(".campo-outros-comentarios");
    const comentarioDiv = document.createElement('div');

    comentarioDiv.classList.add('grupo-outros-comentarios');

    // Arredonda a nota para determinar quantas estrelas mostrar
    const estrelasArredondadas = Math.round(Comentario.stars);

    // Preenche as estrelas com base no valor de 'stars'
    let estrelasHTML = '';
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
            <div id="mediaAvaliacoes">${estrelasArredondadas}</div> <!-- Mostra a nota arredondada -->
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
    
    const avaliacaoRef = db.collection("lugares").doc(postId).collection('comentarios').doc(key);

    // Atualiza a avaliação do comentário
    await avaliacaoRef.update({
        stars: nota, // Armazena apenas o campo 'stars'
    }).then(() => {
        console.log('Avaliação salva com sucesso!');
        
        // Após salvar a avaliação, calcula e salva a média
        calcularMedia(postId);
        
    }).catch((error) => {
        console.log('Erro ao salvar avaliação:', error);
    });
}

// Função para calcular e salvar a média das avaliações
async function calcularMedia(postId) {
    const comentariosRef = db.collection("lugares").doc(postId).collection("comentarios");
    
    const snapshot = await comentariosRef.get();
    
    let totalEstrelas = 0;
    let totalAvaliacoes = snapshot.size;

    snapshot.forEach(doc => {
        totalEstrelas += doc.data().stars || 0; // Adiciona as estrelas de cada comentário
    });

    const media = totalAvaliacoes > 0 ? Math.round(totalEstrelas / totalAvaliacoes) : 0; // Arredonda para um inteiro

    console.log(`Média das avaliações: ${media} estrelas`);

    // Atualiza o documento do lugar com a média
    await db.collection("lugares").doc(postId).update({
        notaMedia: media // Salva a média no documento do lugar
    }).then(async () => {
        console.log('Média salva com sucesso!');
        
        // Atualiza cada comentário com a nova média arredondada
        await snapshot.forEach(async (doc) => {
            await comentariosRef.doc(doc.id).update({
                stars: media // Armazena a média arredondada no campo 'stars' do comentário
            });
        });

        // Atualiza os comentários para mostrar a nova média se necessário
        mostrarComentario();
        
    }).catch((error) => {
        console.log('Erro ao salvar média:', error);
    });
}