<?php
require '../../../vendor/autoload.php';
include '../../app/connection/connection.php';
include '../../app/connection/checkPromotionExpiry.php';

use Dompdf\Dompdf;
use Dompdf\Options;

// Configurar Dompdf
$options = new Options();
$options->set('isRemoteEnabled', true);
$dompdf = new Dompdf($options);

// Obtener los productos de la base de datos
try {
    $stmt = $conn->prepare("SELECT nombre, imagen, informacion, precio_real, etiqueta FROM productos ORDER BY etiqueta");
    $stmt->execute();
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
    exit;
}

// Construir el contenido HTML del catálogo
$html = '<h1>Catálogo de Productos</h1>';
$html .= '<table border="1" cellpadding="10" cellspacing="0">';
$html .= '<thead>';
$html .= '<tr>';
$html .= '<th>Etiqueta</th>';
$html .= '<th>Imagen</th>';
$html .= '<th>Nombre</th>';
$html .= '<th>Información</th>';
$html .= '<th>Precio</th>';
$html .= '</tr>';
$html .= '</thead>';
$html .= '<tbody>';

foreach ($productos as $producto) {
    $imagePath = $_SERVER['DOCUMENT_ROOT'] . '/Rizzotronic/frontend/src/imgProduct/' . htmlspecialchars($producto['imagen']);
    if (file_exists($imagePath)) {
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageSrc = 'data:image/' . pathinfo($imagePath, PATHINFO_EXTENSION) . ';base64,' . $imageData;
    } else {
        $imageSrc = ''; // Ruta de imagen alternativa o mensaje de error
    }

    $html .= '<tr>';
    $html .= '<td>' . htmlspecialchars($producto['etiqueta']) . '</td>';
    $html .= '<td><img src="' . $imageSrc . '" width="80" height="80"></td>';
    $html .= '<td>' . htmlspecialchars($producto['nombre']) . '</td>';
    $html .= '<td>' . htmlspecialchars($producto['informacion']) . '</td>';
    $html .= '<td>' . htmlspecialchars($producto['precio_real']) . '</td>';
    $html .= '</tr>';
}

$html .= '</tbody>';
$html .= '</table>';

// Cargar el contenido HTML en Dompdf
$dompdf->loadHtml($html);

// Configurar el tamaño del papel y la orientación
$dompdf->setPaper('A4', 'portrait');

// Renderizar el PDF
$dompdf->render();

// Enviar el PDF al navegador para descarga
$dompdf->stream('catalogo.pdf', ['Attachment' => 1]);
?>