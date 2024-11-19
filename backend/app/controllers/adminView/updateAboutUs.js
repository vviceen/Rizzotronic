document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('aboutUsForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        console.log('Enviando datos del formulario:', formData);

        fetch('/Rizzotronic/backend/app/services/adminView/editPageAboutUs.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log('Respuesta del servidor:', response);
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data);
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Información actualizada correctamente.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    console.error('Error al actualizar la información:', data.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al actualizar la información: ' + data.message,
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al actualizar la información. Por favor, inténtelo de nuevo más tarde.',
                    confirmButtonText: 'OK'
                });
            });
    });
});