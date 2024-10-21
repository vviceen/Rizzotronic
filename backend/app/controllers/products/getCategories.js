document.addEventListener("DOMContentLoaded", function () {
    fetch("/Rizzotronic/backend/app/services/getProducts.php")
        .then(response => response.json())
        .then(data => {
            if (data.products) {
                const categories = new Set();
                data.products.forEach(product => {
                    if (product.etiqueta) {
                        categories.add(product.etiqueta);
                    }
                });

                const categorySelect = document.getElementById("categorySelect");
                categories.forEach(category => {
                    const option = document.createElement("option");
                    option.value = category;
                    option.textContent = category;
                    categorySelect.appendChild(option);
                });
            } else {
                console.error("Error al obtener los productos:", data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});