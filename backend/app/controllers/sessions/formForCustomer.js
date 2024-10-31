document.addEventListener("DOMContentLoaded", function () {
    const userRol = localStorage.getItem("userRol");
    console.log(localStorage.getItem('userRol'), typeof(localStorage.getItem('userRol')));

    if (userRol === "3") {
        console.log("formForCustomer.js - Usuario es cliente");
        document.getElementById('containerReclamoForm').style.display = 'block';
    } else {
        console.log("formForCustomer.js - Usuario no es cliente");
        document.getElementById('containerReclamoForm').style.display = 'none';
    }

    document.getElementById('reclamoForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = localStorage.getItem('userEmail');
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!email || !mensaje) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const data = {
            email: email,
            mensaje: mensaje,
        };

        fetch('/Rizzotronic/backend/app/services/reclamo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Reclamo enviado exitosamente.');
                document.getElementById('reclamoForm').reset();
            } else {
                alert('Error al enviar el reclamo: ' + result.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el reclamo: ' + error.message);
        });
    });
});