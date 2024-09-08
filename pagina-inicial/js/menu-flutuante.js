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
