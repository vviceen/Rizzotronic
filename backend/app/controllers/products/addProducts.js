document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('userRol') != '2') {
    window.location.href = "/Rizzotronic/frontend/public/index.html";
  } else {
    document.getElementById("body").style.display = "block";

    const addProductForm = document.getElementById("addProductForm");

    if (addProductForm) {
      addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch("/Rizzotronic/backend/app/services/addProduct.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((text) => {
            console.log('Respuesta del servidor:', text); // Imprime la respuesta
            try {
              const data = JSON.parse(text); // Intenta parsear la respuesta
              if (data.success) {
                alert("Producto agregado exitosamente");
                // Limpiar el formulario
                document.getElementById('addProductForm').reset();
              } else {
                alert("Error al agregar el producto: " + data.message);
              }
            } catch (error) {
              console.error('Error al parsear JSON:', error, text); // Mostrar el error y el texto recibido
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    } else {
      console.error("Formulario no encontrado");
    }
  }
});