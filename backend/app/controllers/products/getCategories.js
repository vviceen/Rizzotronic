document.addEventListener("DOMContentLoaded", function () {
    fetch("/Rizzotronic/backend/app/services/getFilters.php")
        .then(response => response.json())
        .then(data => {
            if (data.marca && data.etiqueta) {
                const labelSelect = document.getElementById("etiqueta");
                const brandSelect = document.getElementById("marca");

                if (labelSelect && brandSelect) {
                    if (labelSelect.options && brandSelect.options) {
                        data.etiqueta.forEach(category => {
                            if (!Array.from(labelSelect.options).some(option => option.value === category)) {
                                const option = document.createElement("option");
                                option.value = category;
                                option.textContent = category;
                                labelSelect.appendChild(option);
                            }
                        });

                        data.marca.forEach(brand => {
                            if (!Array.from(brandSelect.options).some(option => option.value === brand)) {
                                const option = document.createElement("option");
                                option.value = brand;
                                option.textContent = brand;
                                brandSelect.appendChild(option);
                            }
                        });
                    } else {
                        console.error("Los elementos select no tienen opciones.");
                    }
                } else {
                    console.error("No se encontraron los elementos select con los IDs 'etiqueta' y 'marca'.");
                }
            } else {
                console.error("Error al obtener las marcas y etiquetas:", data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});