document.addEventListener("DOMContentLoaded", () => {

  const userRol = localStorage.getItem('userRol');
  const navbar = document.getElementById("navbar");


  if (userRol == '1') { // Admin
    navbar.classList.add('admin');
  } else if (userRol == '2') { // Vendedor
    navbar.classList.add('vendedor');
  }else {// Cliente e invitado
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
      case "3":
        console.log("Redirigiendo a customer.html");
        window.location.href = "/Rizzotronic/frontend/src/views/customer.html";
        break;
      default:
        console.log("Redirigiendo a index.html");
        window.location.href = "/Rizzotronic/frontend/public/index.html";
        break;
    }
  });
});