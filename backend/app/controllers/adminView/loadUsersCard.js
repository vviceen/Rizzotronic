import { updateUser } from './updateUser.js';
import { deleteUser } from './deleteUser.js';

window.updateUser = updateUser;
window.deleteUser = deleteUser;

document.addEventListener("DOMContentLoaded", function () {
  if(localStorage.getItem('userRol') != 1){
    window.location.href = "/Rizzotronic/frontend/public/index.html";
  }

  const filterAdmin = document.getElementById("filter-admin");
  const filterVendedor = document.getElementById("filter-vendedor");
  const filterCliente = document.getElementById("filter-cliente");

  const fetchAndDisplayUsers = () => {
    const roles = [];
    if (filterAdmin.checked) roles.push(filterAdmin.value);
    if (filterVendedor.checked) roles.push(filterVendedor.value);
    if (filterCliente.checked) roles.push(filterCliente.value);

    fetch("/Rizzotronic/backend/app/services/adminView/getUsers.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roles }),
    })
      .then((response) => response.json())
      .then((data) => {
        const userList = document.getElementById("users-list");
        userList.innerHTML = ''; // Limpiar contenido previo

        if (data.success) {
          data.users.forEach((user) => {
            // Definir el color según el rol del usuario
            let cardColor;
            switch (user.rol_id) {
              case '1': // Admin
                cardColor = "bg-admin";
                break;
              case '2': // Vendedor
                cardColor = "bg-vendedor";
                break;
              case '3': // Cliente
                cardColor = "bg-cliente";
                break;
              default:
                cardColor = "bg-neutral";
                break;
            }

            const userCard = `
              <div class="card ${cardColor} my-4" data-user-id="${user.id}">
                <div class="card-body">
                  <h2 class="card-title">${user.nombre}</h2>
                  <p class="card-text-email">Email: ${user.email}</p>
                  <p class="card-text-rol">Rol ID: ${user.rol_id}</p>
                  <button class="btn bg-neutral-300" onclick="updateUser(${user.id})">Editar</button>
                  <button class="btn btn-accent" onclick="deleteUser(${user.id})">Eliminar</button>
                </div>
              </div>
            `;
            userList.innerHTML += userCard;
          });
        } else {
          userList.innerHTML = '<p>No se encontraron usuarios.</p>';
        }
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
  };

  // Escuchar cambios en los checkboxes
  filterAdmin.addEventListener("change", fetchAndDisplayUsers);
  filterVendedor.addEventListener("change", fetchAndDisplayUsers);
  filterCliente.addEventListener("change", fetchAndDisplayUsers);

  // Cargar usuarios inicialmente
  fetchAndDisplayUsers();
});