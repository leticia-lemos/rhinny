document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os elementos
    const modal = document.getElementById("user-modal");
    const userIcon = document.getElementById("user-icon");
    const closeButton = document.querySelector(".close-button");
  
    // Abre o modal quando o ícone do usuário é clicado
    userIcon.addEventListener("click", function () {
      modal.style.display = "block";
    });
  
    // Fecha o modal quando o botão de fechar é clicado
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    // Fecha o modal se o usuário clicar fora do conteúdo do modal
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  