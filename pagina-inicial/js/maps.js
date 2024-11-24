let map;

function initMap(lat, long) {
  const userLocation = { lat: lat, lng: long };
  console.log(userLocation); // Coordenadas do usuário
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: userLocation,
  });

  const request = {
    location: userLocation,
    radius: "2000", // Raio em metros para buscar lugares de lazer
    types: ["park", "shopping_mall", "amusement_park", "zoo"], // Tipos de lugares de lazer
  };

  document.getElementById("campo-locais").innerHTML = "";
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        getPlaceDetails(results[i]);
        console.log(results[i])
      }
    } else {
      console.error("Erro ao buscar lugares de lazer:", status);
    }
  });
}

function getPlaceDetails(place) {
  const service = new google.maps.places.PlacesService(map);
  service.getDetails({ placeId: place.place_id }, (details, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      criarTabelaMapa(details);
    } else {
      console.error("Erro ao obter detalhes do lugar:", status);
    }
  });
}

function criarTabelaMapa(lugar) {
  // Cria um novo elemento <section>
  var lugarSection = document.createElement("section");
  lugarSection.classList.add("card");

  // Adiciona o conteúdo HTML ao lugar
  lugarSection.innerHTML = `
    <div class="grupo-locais" data-name="${lugar.name}" data-address="${lugar.formatted_address || ''}" data-phone="${lugar.formatted_phone_number || ''}">
            <img src="${lugar.photos && lugar.photos.length > 0 ? lugar.photos[0].getUrl({ width: 500, height: 150 }) : './img/default-image.svg'}" class="img-lugar" alt="${lugar.name}" />
            <div class="text-locais">
              <p class="titulo-locais">${lugar.name}</p>
              <div class="estrelas">
                <box-icon name="star" type="solid" color="#fcc803"></box-icon>
                <box-icon name="star" type="solid" color="#fcc803"></box-icon>
                <box-icon name="star" type="solid" color="#fcc803"></box-icon>
                <box-icon name='star' color='#fcc803'></box-icon>
                <box-icon name='star' color='#fcc803'></box-icon>
              </div>
            </div>
          </div>
`;

  // Adiciona um evento de clique para redirecionar
  lugarSection.addEventListener("click", () => {
    const address = lugar.formatted_address || "Endereço não disponível";
    const phone = lugar.formatted_phone_number || "Telefone não disponível";
    
    // Armazena informações no localStorage
    localStorage.setItem("lugarInfo", JSON.stringify({
      name: lugar.name,
      address: address,
      phone: phone,
      photo: lugar.photos && lugar.photos.length > 0 ? lugar.photos[0].getUrl({ width: 500, height: 150 }) : './img/default-image.svg',

    }));

    // Redireciona para a página de detalhes
    window.location.href = "../../pagina-lugar/pagina-lugar.html?uid="+lugar.place_id;
  });

  // Adiciona o lugar ao contêiner com o ID 'campo-locais'
  document.getElementById("campo-locais").appendChild(lugarSection);
}
// Função para obter geolocalização do usuário
function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        initMap(lat, long); // Inicializa o mapa com a localização do usuário
      },
      () => {
        handleLocationError(true);
      }
    );
  } else {
    // Geolocalização não suportada pelo navegador.
    handleLocationError(false);
  }
}

// Função para tratar erros de geolocalização
function handleLocationError(browserHasGeolocation) {
  console.error(
    browserHasGeolocation
      ? "Erro: O serviço de geolocalização falhou."
      : "Erro: Seu navegador não suporta geolocalização."
  );
}

// Chama a função de geolocalização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", getGeolocation);

// Código para buscar endereço pelo CEP permanece inalterado
document.getElementById("cep").addEventListener("blur", function () {
  pesquisacep(this.value);
});

// Funções para manipulação de CEP...

function limpa_formulário_cep() {
   document.getElementById("rua").value = "";
   document.getElementById("bairro").value = "";
}

// Callback para manipulação do retorno do CEP...

function pesquisacep(valor) {
   var cep = valor.replace(/\D/g, "");
   if (cep != "") {
       var validacep = /^[0-9]{8}$/;
       if (validacep.test(cep)) {
           document.getElementById("rua").value = "...";
           document.getElementById("bairro").value = "...";
           var script = document.createElement("script");
           script.src =
               "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";
           document.body.appendChild(script);
       } else {
           limpa_formulário_cep();
           alert("Formato de CEP inválido.");
       }
   } else {
       limpa_formulário_cep();
   }
}