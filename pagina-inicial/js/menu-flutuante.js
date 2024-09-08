// Menu flutuante ajustável em relação ao rodapé
window.addEventListener("scroll", function () {
  const footer = document.querySelector("footer");
  const menu = document.querySelector(".menu-flutuante");

  // Posição atual do scroll
  const scrollPosition = window.scrollY;
  // Altura do viewport
  const windowHeight = window.innerHeight;
  // Posição do rodapé em relação ao topo da página
  const footerOffsetTop = footer.offsetTop;
  // Altura do menu flutuante
  const menuHeight = menu.offsetHeight;

  // Calcula a posição máxima que o menu pode alcançar antes de tocar o rodapé
  const maxScrollTop = footerOffsetTop - menuHeight - 20; // Subtraímos a altura do menu e um espaçamento

  // Verifica se a posição do scroll ultrapassou o ponto máximo
  if (scrollPosition >= maxScrollTop) {
    // Se o scroll ultrapassou o ponto máximo, fixamos o menu antes do rodapé
    menu.style.position = "absolute";
    menu.style.top = `${maxScrollTop}px`;
  } else {
    // Caso contrário, o menu segue fixo na posição original
    menu.style.position = "fixed";
    menu.style.top = "7em"; // Ajuste este valor para o espaçamento desejado
  }
});

// Filtros e palavras-chave dinâmicos no menu flutuante
document.addEventListener("DOMContentLoaded", function () {
  // Botão de pesquisa e campo de busca
  const searchButton = document.getElementById("search-menu");
  const searchInput = document.getElementById("pesquisa-menu");
  const palavrasChavesContainer = document.querySelector(
    ".palavras-chaves-container"
  );

  // Palavras-chave mock (pode ser substituído por uma API ou lógica real)
  let palavrasChaveAtuais = ["Praça", "Barueri", "Parque"];

  // Exibe as palavras-chave no container
  function renderizarPalavrasChaves() {
    palavrasChavesContainer.innerHTML = ""; // Limpa o container
    palavrasChaveAtuais.forEach((palavra) => {
      const div = document.createElement("div");
      div.classList.add("palavra-chave");
      div.innerHTML = `${palavra} <button class="remove-btn"><img src="./img/close.svg" alt=""></button>`;
      palavrasChavesContainer.appendChild(div);

      // Adiciona evento de remoção
      div.querySelector(".remove-btn").addEventListener("click", function () {
        removerPalavraChave(palavra);
      });
    });
  }

  // Função para adicionar uma nova palavra-chave
  function adicionarPalavraChave(palavra) {
    if (palavra && !palavrasChaveAtuais.includes(palavra)) {
      palavrasChaveAtuais.push(palavra);
      renderizarPalavrasChaves();
    }
  }

  // Função para remover uma palavra-chave
  function removerPalavraChave(palavra) {
    palavrasChaveAtuais = palavrasChaveAtuais.filter((p) => p !== palavra);
    renderizarPalavrasChaves();
  }

  // Lógica de pesquisa ao clicar no botão de busca
  searchButton.addEventListener("click", function () {
    const novaPalavra = searchInput.value.trim();
    adicionarPalavraChave(novaPalavra);
    searchInput.value = ""; // Limpa o campo de busca
  });

  // Renderiza as palavras-chave inicialmente
  renderizarPalavrasChaves();

  // Lógica para dropdowns de filtros
  const filtrosHeaders = document.querySelectorAll(".filtro-header");

  filtrosHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const opcoes = header.nextElementSibling;
      const icon = header.querySelector("box-icon");

      if (opcoes.style.display === "none" || !opcoes.style.display) {
        opcoes.style.display = "block";
        icon.setAttribute("name", "chevron-up");
      } else {
        opcoes.style.display = "none";
        icon.setAttribute("name", "chevron-down");
      }
    });
  });
});
