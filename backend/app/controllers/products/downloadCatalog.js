document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('descargarCatalogo').addEventListener('click', function() {
        window.location.href = '/Rizzotronic/backend/app/services/downloadCatalog.php';
    });
});