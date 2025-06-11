// theme.js

document.addEventListener('DOMContentLoaded', () => {
  const root     = document.documentElement;
  const btnLight = document.getElementById('btn-light');
  const btnDark  = document.getElementById('btn-dark');

  // 1) Carga el tema guardado (o 'light' por defecto)
  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);

  // 2) Función para cambiar tema y persistirlo
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // 3) Listeners en los botones
  btnLight.addEventListener('click', () => setTheme('light'));
  btnDark.addEventListener('click', () => setTheme('dark'));

  // Permite alternar pulsando la tecla "t"
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't') {
      const current = root.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    }
  });
});
