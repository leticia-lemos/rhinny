console.log(localStorage.getItem('lugarInfo'))
const lugarInfos = JSON.parse(localStorage.getItem('lugarInfo'))
var img = document.getElementById('praca-boulevard')
img.src = lugarInfos.photo
var nomeLugar = document.getElementsByClassName('titulo-local')[0]
nomeLugar.innerHTML = lugarInfos.name   
if (lugarInfos.accessibilityTypes && lugarInfos.accessibilityTypes.length > 0) {
    lugarInfos.accessibilityTypes.forEach(type => {

        console.log(type); // Adiciona o tipo à lista
    });
} else {
    console.log('tem nao chefia')
}

function pegarUrl(){
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("uid");
}
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAK1Y4DAftt63mVx3tngghMWXYDfg5zzTo",
    authDomain: "rhinny-319e6.firebaseapp.com",
    projectId: "rhinny-319e6",
    storageBucket: "rhinny-319e6.firebasestorage.app",
    messagingSenderId: "860506842460",
    appId: "1:860506842460:web:e3176d1e88d16664590d99",
    measurementId: "G-KKE67JZ0M6"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore()



function comentar(){
    var id = pegarUrl()
    db.collection('lugares').doc(id).set({
        nome:'ssllcc so pra ve',
    }).then(()=> {
        console.log('adicionou')
    }).catch((error) => {
        console.log(error
        )
    })
}