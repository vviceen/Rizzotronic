const btnMyAccount = document.getElementById("btnMyAccount");

btnMyAccount.addEventListener("click", () => {

  // Solicitar los datos de la sesión al archivo PHP
  fetch("/Rizzotronic/backend/app/services/sessionData.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.username) {
        alert(data.rol);
        switch (data.rol) {
          case '2':
            window.location.href = "/Rizzotronic/frontend/src/views/customer.html";
            break;
          case '3':
            window.location.href = "/Rizzotronic/frontend/src/views/sellerView.html";
            break;
          case '4':
            window.location.href ="/Rizzotronic/frontend/src/views/adminView.html";
            break;
          default:
            window.location.href ="/Rizzotronic/frontend/src/views/default.html";
            break;
        }
      } 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

