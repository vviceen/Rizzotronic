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
    $stmt = $conn->prepare("SELECT nombre, imagen, informacion, precio_real, etiqueta FROM productos where stock != 0 ORDER BY etiqueta");
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

// Función para convertir la imagen a base64
function getImageBase64($imagePath) {
    if (file_exists($imagePath)) {
        $imageData = file_get_contents($imagePath);
        return 'data:image/jpeg;base64,' . base64_encode($imageData);
    }
    return '';
}

// En tu bucle de productos, obtén la imagen en base64
foreach ($productos as $producto) {
    $imagePath = 'C:/xampp/htdocs/Rizzotronic/frontend/src/imgProduct/' . $producto['imagen'];
    $imageBase64 = getImageBase64($imagePath);

    // Asegúrate de verificar si la imagen existe antes de agregarla
    $html .= '<tr>';
    $html .= '<td>' . htmlspecialchars($producto['etiqueta']) . '</td>';
    if ($imageBase64) {
        $html .= '<td><img src="' . $imageBase64 . '" width="60" height="60"></td>';
    } else {
        $html .= '<td>No Image</td>';
    }
    $html .= '<td>' . htmlspecialchars($producto['nombre']) . '</td>';
    $html .= '<td>' . htmlspecialchars($producto['informacion']) . '</td>';
    $html .= '<td>' . htmlspecialchars($producto['precio_real']) . '</td>';
    $html .= '</tr>';
}


$html .= '</tbody>';
$html .= '</table>';

// Cargar el contenido HTML en Dompdf
$dompdf->loadHtml($html);

// (Opcional) Configurar el tamaño del papel y la orientación
$dompdf->setPaper('A4', 'landscape');

// Renderizar el PDF
$dompdf->render();

// Forzar la descarga del PDF
$dompdf->stream('catalogo_productos.pdf', ['Attachment' => 1]);
?>