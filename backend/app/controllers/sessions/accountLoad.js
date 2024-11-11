document.addEventListener("DOMContentLoaded", () => {
  const userRol = localStorage.getItem('userRol');
  const navbar = document.getElementById("navbar");

  if (userRol == "1") { // Admin
    navbar.classList.add('admin');
  } else if (userRol == "2") { // Vendedor
    navbar.classList.add('vendedor');
  } else { // Cliente e invitado
    navbar.classList.add('cliente');
  }

  const btnMyAccount = document.getElementById("btnMyAccount");
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");

  // Verificar si el usuario ha iniciado sesión
  fetch("http://localhost/Rizzotronic/backend/app/services/sessionData.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.username) { // Si el usuario ha iniciado sesión
        if (btnMyAccount) btnMyAccount.style.display = "block"; // Mostrar el botón
        if (btnLogin) btnLogin.style.display = "none";
        if (btnRegister) btnRegister.style.display = "none";
      } else {
        if (btnLogin) btnLogin.style.display = "block";
        if (btnRegister) btnRegister.style.display = "block";
        if (btnMyAccount) btnMyAccount.style.display = "none"; // Asegurarse de que esté oculto si no está logueado
      }
    })
    .catch((error) => {
      console.error("Error al verificar la sesión:", error);
    });

  if (btnMyAccount) {
    btnMyAccount.addEventListener("click", () => {
      switch (userRol) {
        case "1":
          console.log("Redirigiendo a adminView.html");
          window.location.href = "/Rizzotronic/frontend/src/views/adminView.html";
          break;
        case "2":
          console.log("Redirigiendo a sellerView.html");
          window.location.href = "/Rizzotronic/frontend/src/views/sellerView.html";
          break;
        default:
          console.log("Redirigiendo a clientView.html");
          window.location.href = "/Rizzotronic/frontend/src/views/clientView.html";
          break;
      }
    });
  }
});