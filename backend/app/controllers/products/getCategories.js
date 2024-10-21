document.addEventListener("DOMContentLoaded", function () {
  fetch("/Rizzotronic/backend/app/services/getFilters.php")
    .then(response => response.json())
    .then(data => {
      if (data.marcas && data.etiquetas) {
        const categorySelect = document.getElementById("etiqueta");
        data.etiquetas.forEach(category => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        });

        const brandSelect = document.getElementById("marca");
        data.marcas.forEach(brand => {
          const option = document.createElement("option");
          option.value = brand;
          option.textContent = brand;
          brandSelect.appendChild(option);
        });
      } else {
        console.error("Error al obtener las marcas y etiquetas:", data.error);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
});