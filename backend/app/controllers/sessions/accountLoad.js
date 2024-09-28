document.addEventListener("DOMContentLoaded", () => {
  const btnMyAccount = document.getElementById("btnMyAccount");
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");

  // Verificar si el usuario ha iniciado sesión
  fetch("http://localhost/Rizzotronic/backend/app/services/sessionData.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.username) { // Si el usuario ha iniciado sesión
        btnMyAccount.style.display = "block"; // Mostrar el botón
        btnLogin.style.display = "none";
        btnRegister.style.display = "none";

      } else {
        btnLogin.style.display = "block";
        btnRegister.style.display = "block";
        btnMyAccount.style.display = "none"; // Asegurarse de que esté oculto si no está logueado
      }
    })
    .catch((error) => {
      console.error("Error al verificar la sesión:", error);
    });
});

btnMyAccount.addEventListener("click", () => {
  // Solicitar los datos de la sesión al archivo PHP
  fetch("http://localhost/Rizzotronic/backend/app/services/sessionData.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.username) {
        switch (data.rol) {

          /*
          1- admin
          2- vendedor
          3- cliente
          */

          case "1":
            window.location.href =
              "/Rizzotronic/frontend/src/views/adminView.html";
            break;
          case "2":
            window.location.href =
              "/Rizzotronic/frontend/src/views/sellerView.html";
            break;
          default:
            window.location.href =
              "/Rizzotronic/frontend/src/views/customer.html";
            break;
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
