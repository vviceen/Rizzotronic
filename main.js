// Función para cargar un componente
function loadComponent(className, componentPath) {
  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach(element => {
        element.innerHTML = data;
      });
    })
    .catch(error => console.error('Error al cargar el componente:', error));
}

  // Cargar los componentes después de que el DOM se haya cargado completamente
  document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar', 'componentes/navbar.html');
    loadComponent('footer', 'componentes/footer.html');
    loadComponent('carrousel', 'componentes/carrousel.html');
    loadComponent('card', 'componentes/card.html');

  });
  