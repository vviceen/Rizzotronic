// // Función para cargar un componente
// function loadComponent(className, componentPath) {
//   fetch(componentPath)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `Error al cargar ${componentPath}: ${response.status} ${response.statusText}`
//         );
//       }
//       return response.text();
//     })
//     .then((data) => {
//       const elements = document.querySelectorAll(`.${className}`);
//       elements.forEach((element) => {
//         element.innerHTML = data;
//       });
//     })
//     .catch((error) =>
//       console.error(`Error al cargar el componente: ${error.message}`)
//     );
// }

// // Cargar los componentes después de que el DOM se haya cargado completamente
// document.addEventListener("DOMContentLoaded", () => {
//   loadComponent("navbar", "/frontend/src/components/navbar.html");
//   loadComponent("footer", "/frontend/src/components/footer.html");
//   loadComponent("carrousel", "/frontend/src/components/carrousel.html");
//   loadComponent("card", "/frontend/src/components/card.html");
// });
