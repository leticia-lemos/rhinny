const accessibilityBtn = document.getElementById('accessibility-btn');
const accessibilityMenu = document.getElementById('accessibility-menu');
const body = document.body;
let isLargeFont = false;
let isSerifFont = false;
let isBoldFont = false;
let isHighContrast = false;
let isLineSpacing = false;
let isLetterSpacing = false;
let isSaturationReduced = false;
let isZoomed = false;
let isReadingMask = false;
let isReadingMode = false;

// Toggle do menu dropdown
accessibilityBtn.addEventListener('click', () => {
  accessibilityMenu.classList.toggle('show');
});

// Contraste de cores
document.getElementById('contrast-btn').addEventListener('click', () => {
  isHighContrast = !isHighContrast;
  body.classList.toggle('high-contrast');
});

// Alterar tamanho da fonte
document.getElementById('toggle-font-size').addEventListener('click', () => {
  isLargeFont = !isLargeFont;
  body.classList.toggle('font-size-large', isLargeFont);
});

// Alternar estilo da fonte (Serif, Negrito)
document.getElementById('toggle-font-style').addEventListener('click', () => {
  if (!isSerifFont && !isBoldFont) {
    body.classList.add('font-serif');
    isSerifFont = true;
  } else if (isSerifFont && !isBoldFont) {
    body.classList.add('font-bold');
    isBoldFont = true;
  } else {
    body.classList.remove('font-serif', 'font-bold');
    isSerifFont = isBoldFont = false;
  }
});

// Alterar espaço entre linhas
document.getElementById('toggle-line-spacing').addEventListener('click', () => {
  isLineSpacing = !isLineSpacing;
  body.classList.toggle('line-spacing-large', isLineSpacing);
});

// Alterar espaço entre letras
document.getElementById('toggle-letter-spacing').addEventListener('click', () => {
  isLetterSpacing = !isLetterSpacing;
  body.classList.toggle('letter-spacing-large', isLetterSpacing);
});

// Alterar saturação
document.getElementById('toggle-saturation').addEventListener('click', () => {
  isSaturationReduced = !isSaturationReduced;
  body.classList.toggle('reduced-saturation', isSaturationReduced);
});

// Modo de leitura
document.getElementById('toggle-reading-mode').addEventListener('click', () => {
  isReadingMode = !isReadingMode;
  body.classList.toggle('reading-mode', isReadingMode);
});

// Máscara de leitura
document.getElementById('toggle-reading-mask').addEventListener('click', () => {
  isReadingMask = !isReadingMask;
  body.classList.toggle('reading-mask', isReadingMask);
});

// Lupa de Conteúdo
document.getElementById('toggle-zoom').addEventListener('click', () => {
  isZoomed = !isZoomed;
  body.classList.toggle('zoomed', isZoomed);
});

// Resetar configurações
document.getElementById('reset-settings').addEventListener('click', () => {
  isLargeFont = isSerifFont = isBoldFont = isHighContrast = isLineSpacing = isLetterSpacing = isSaturationReduced = isZoomed = isReadingMask = isReadingMode = false;
  body.classList.remove(
    'font-size-large', 'font-serif', 'font-bold', 'high-contrast', 
    'line-spacing-large', 'letter-spacing-large', 'reduced-saturation', 
    'zoomed', 'reading-mask', 'reading-mode'
  );
});
  