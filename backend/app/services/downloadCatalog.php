<?php
require '../../../vendor/autoload.php';

use Dompdf\Dompdf;

include '../../app/connection/connection.php';

// Obtener los productos de la base de datos
$stmt = $conn->prepare("SELECT nombre, imagen, precio_real, precio_promocionado, informacion FROM productos");
$stmt->execute();

// Crear una instancia de Dompdf
$dompdf  = new Dompdf();

// Generar el contenido HTML del catálogo
$html = '<h1>Catálogo de Productos</h1>';
$html .= '<table border="1" cellpadding="10" cellspacing="0" width="100%">';
$html .= '<tr><th>Imagen</th><th>Nombre</th><th>Precio Real</th><th>Precio Promocionado</th><th>Descripción</th></tr>';

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $imagePath = realpath(__DIR__ . '/../../../frontend/src/imgProduct/' . $row['imagen']);
    $imageData = base64_encode(file_get_contents($imagePath));
    $imageSrc = 'data:image/' . pathinfo($imagePath, PATHINFO_EXTENSION) . ';base64,' . $imageData;

    $html .= '<tr>';
    $html .= '<td><img src="' . $imageSrc . '" width="100"></td>';
    $html .= '<td>' . htmlspecialchars($row['nombre']) . '</td>';
    $html .= '<td>$' . number_format($row['precio_real'], 2) . '</td>';
    $html .= '<td>' . ($row['precio_promocionado'] ? '$' . number_format($row['precio_promocionado'], 2) : 'N/A') . '</td>';
    $html .= '<td>' . htmlspecialchars($row['informacion']) . '</td>';
    $html .= '</tr>';
}

$html .= '</table>';

// Cargar el contenido HTML en Dompdf
$dompdf->loadHtml($html);

// (Opcional) Configurar el tamaño del papel y la orientación
$dompdf->setPaper('A4', 'landscape');

// Renderizar el HTML como PDF
$dompdf->render();

// Salida del PDF generado al navegador
$dompdf->stream();
?>