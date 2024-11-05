document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('descargarCatalogo').addEventListener('click', function() {
        Swal.fire({
            title: 'Catálogo',
            text: 'Gracias por descargar nuestro catálogo.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
                window.location.href = '/Rizzotronic/backend/app/services/downloadCatalog.php';
            }
        });
    });
});