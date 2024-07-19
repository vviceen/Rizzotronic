document.addEventListener("DOMContentLoaded", () => {
  const nombreUser = document.getElementById("nombreUser");
  const infoUser = document.getElementById("infoUser");

  // Solicitar los datos de la sesión al archivo PHP
  fetch("/Rizzotronic/backend/app/services/sessionData.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.username) {
        nombreUser.textContent = `Bienvenido, ${data.username}`;
        infoUser.textContent = `Tu eres un ${data.rol}. Tu email es: ${data.email}`;

        switch (data.rol) {
          case "cliente":
            RenderView("/Rizzotronic/frontend/src/views/customer.html");
            break;
          case "vendedor":
            RenderView("/Rizzotronic/frontend/src/views/sellerView.html");
            break;
          case "admin":
            RenderView("/Rizzotronic/frontend/src/views/adminView.html");
            break;
          default:
            RenderView("default.html");
            break;
        }
      } else {
        nombreUser.textContent = "debes iniciar sesion";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      nombreUser.textContent = "Error al cargar la información de la sesión";
    });
});


function RenderView(url) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      });
  }