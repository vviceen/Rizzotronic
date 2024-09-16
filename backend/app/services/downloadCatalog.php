<?php
require('../../../fpdf/fpdf.php'); // Asegúrate de que la ruta a FPDF sea correcta
include('../../app/connection/connection.php'); // Incluye tu archivo de conexión

function utf8_to_iso8859_1($text) {
    return iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $text);
}

try {

    // Consulta para obtener todos los productos
    $sql = "SELECT nombre, imagen, precio_real, precio_promocionado, descripcion FROM productos";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Crear una instancia de FPDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);

    // Título del catálogo
    $pdf->Cell(0, 10, utf8_to_iso8859_1('Catálogo de Productos'), 0, 1, 'C');
    $pdf->Ln(10);

    // Contador de productos por página
    $productCount = 0;

    // Iterar sobre los productos y agregarlos al PDF
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($productCount == 2) {
            $pdf->AddPage();
            $productCount = 0;
        }

        $pdf->SetFont('Arial', 'B', 12);
        $pdf->Cell(0, 10, utf8_to_iso8859_1($row['nombre']), 0, 1);
        
        // Imagen del producto
        if (!empty($row['imagen'])) {
            $imagePath = '../../../frontend/src/imgProduct/' . $row['imagen'];
            if (file_exists($imagePath)) {
                $pdf->Image($imagePath, $pdf->GetX(), $pdf->GetY(), 50);
                $pdf->Ln(50);
            } else {
                $pdf->Cell(0, 10, utf8_to_iso8859_1('Imagen no disponible'), 0, 1);
            }
        }

        $pdf->SetFont('Arial', '', 12);
        $pdf->Cell(0, 10, utf8_to_iso8859_1('Precio Real: $') . $row['precio_real'], 0, 1);
        $pdf->Cell(0, 10, utf8_to_iso8859_1('Precio Promocionado: $') . $row['precio_promocionado'], 0, 1);
        $pdf->MultiCell(0, 10, utf8_to_iso8859_1('Descripción: ') . $row['descripcion']);
        $pdf->Ln(10);

        // Dibujar una línea de separación
        $pdf->Line(10, $pdf->GetY(), 200, $pdf->GetY());
        $pdf->Ln(10);

        $productCount++;
    }

    // Salida del PDF
    $pdf->Output('D', 'catalogo_productos.pdf');

} catch(PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
// Liberar recursos
$stmt = null;
$conn = null;
?>