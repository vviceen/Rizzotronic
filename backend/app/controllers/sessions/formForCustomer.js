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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos.',
                confirmButtonText: 'OK'
            });
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
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Reclamo enviado correctamente.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        document.getElementById('reclamoForm').reset();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al enviar el reclamo: ' + data.message,
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al enviar el reclamo. Por favor, inténtelo de nuevo más tarde.',
                    confirmButtonText: 'OK'
                });
            });
    });
});