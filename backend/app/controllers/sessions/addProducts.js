document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const imagen = document.getElementById('imagen').files[0];
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
  
    // Validaciones del lado del cliente
    if (!allowedFormats.includes(imagen.type)) {
      alert('Solo se permiten archivos JPG, JPEG, PNG y GIF.');
      return;
    }
  
    if (imagen.size > 500000) { // 500 KB
      alert('El archivo es demasiado grande.');
      return;
    }
  
    // Enviar los datos al servidor si pasan las validaciones
    fetch('/Rizzotronic/backend/app/services/addProduct.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Producto agregado exitosamente');
        // Limpiar el formulario
        // document.getElementById('addProductForm').reset();
      } else {
        alert('Error al agregar el producto: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  