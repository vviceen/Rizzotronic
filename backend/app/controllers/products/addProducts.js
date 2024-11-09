document.addEventListener("DOMContentLoaded", function () {
  const addProductForm = document.getElementById("addProductForm");

  addProductForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const imagen = document.getElementById('imagen').files[0];
      const informacion = document.getElementById('informacion').value.trim();
      const precio_real = document.getElementById('precio_real').value.trim();
      const precio_promocionado = document.getElementById('precio_promocionado').value.trim();
      const vigencia_promocion = document.getElementById('vigencia_promocion').value.trim();
      const marca = document.getElementById('marca').value.trim();
      const cantidad = document.getElementById('cantidad').value.trim();
      const etiqueta = document.getElementById('etiqueta').value.trim();
      const promocionado = document.getElementById('promocionado').checked;
      const errorMessage = document.getElementById('errorMessage');

      if (!nombre || !imagen || !informacion || !precio_real || !marca || !cantidad || !etiqueta) {
          showError("Todos los campos son requeridos.");
          return;
      }

      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('imagen', imagen);
      formData.append('informacion', informacion);
      formData.append('precio_real', precio_real);
      formData.append('precio_promocionado', precio_promocionado);
      formData.append('vigencia_promocion', vigencia_promocion);
      formData.append('marca', marca);
      formData.append('cantidad', cantidad);
      formData.append('etiqueta', etiqueta);
      formData.append('promocionado', promocionado);

      console.log(formData);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      fetch('/Rizzotronic/backend/app/services/addProduct.php', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(result => {
          if (result.success) {
              alert("Producto agregado exitosamente");
              addProductForm.reset();
          } else {
              showError("Error al agregar el producto: " + result.message);
          }
      })
      .catch(error => {
          showError("Error: " + error);
      });
  });

  function showError(message) {
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) {
          errorMessage.textContent = message;
          errorMessage.style.display = 'block';
          setTimeout(() => {
              errorMessage.style.display = 'none';
          }, 4000);
      } else {
          console.error("Elemento errorMessage no encontrado");
      }
  }
});