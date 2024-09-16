<?php
// getProduct.php

include('../../connection/connection.php');

$carrito = json_decode(file_get_contents('php://input'), true);

$productos = [];

foreach ($carrito as $item) {
  $productoId = $item['id'];
  $cantidad = $item['cantidad'];

  $sql = "SELECT id, nombre, imagen, precio_real, precio_promocionado FROM productos WHERE id = :productoId";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':productoId', $productoId, PDO::PARAM_INT);
  $stmt->execute();

  if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row['cantidad'] = $cantidad;
      $productos[] = $row;
    }
  }
}

header('Content-Type: application/json');
echo json_encode($productos);