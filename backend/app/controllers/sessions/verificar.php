<?php

include "../conexion.php";


//con los datos username y password se verifica en la BD si realmente su Rol es el correcto


if (!empty($_POST["username"]) and !empty($_POST["password"])) {
    echo "<br>";
    echo "Username: " . $_POST["username"] . "<br>Password: " . $_POST["password"] . "<br>";

    echo "<br>";
    //le paso $con porque sino se pone loquito, para q sea global
    if (userExist($con, $_POST["username"], $_POST["password"])) {
        //si es verdadero, significa que el usuario esta registrado - session start
        echo "user exist = true, session start";
        if (getRol($con, $_POST["username"]) == "vendedor") {
            header("Location: ../sellerView.php");
        } 
        elseif(getRol($con, $_POST["username"]) == "admin") {
            header("Location: ../adminView.php");
        }
        else{
            header("Location: ../index.html");
        }
    } else {
        echo "Usted no se encuentra registrado.";
    }
}

function getRol($con, $username)
{
    // Preparar la consulta para evitar inyección SQL
    $stmt = $con->prepare("SELECT `rol` FROM `usuario` WHERE `username` = ?");
    $stmt->execute([$username]);

    // Obtener el resultado
    if ($reg = $stmt->fetch()) {
        // Si hay resultados, devolver el rol
        return $reg['rol'];
    } else {
        // Si no hay resultados, devolver un mensaje de error
        return "Error: usuario no registrado";
    }
}

function userExist($con, $username, $password)
{
    $stmt = $con->prepare("SELECT * FROM usuario WHERE username = ? AND password = ?");
    $stmt->execute([$username, $password]);
    if ($reg = $stmt->fetch()) {
        //si hay resultados
        echo "usuario registrado";
        echo "<br>";

        return true;
    } else {
        //no hay resultados
        echo "usuario NO registrado";
        echo "<br>";

        return false;
    }
}


function register($username, $password)
{

    //    $res = $con->prepare("INSERT INTO usuario (username,password) VALUES (?,?)");
    //  $res->execute([$_POST["username"], $_POST["password"]]);
}
