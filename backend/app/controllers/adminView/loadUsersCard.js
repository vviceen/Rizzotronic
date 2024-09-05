import { updateUser } from './updateUser.js';
import { deleteUser } from './deleteUser.js';

window.updateUser = updateUser;
window.deleteUser = deleteUser;

document.addEventListener("DOMContentLoaded", function () {

  //pendiente. verificar el rol que sea admin antes de mostrar algo

  fetch("/Rizzotronic/backend/app/services/adminView/getUsers.php")
    .then((response) => response.json())
    .then((data) => {
      const userList = document.getElementById("users-list");
      userList.innerHTML = ''; // Limpiar contenido previo

      if (data.success) {
        data.users.forEach((user) => {
          const userCard = `
            <div class="card max-w-sm rounded overflow-hidden shadow-lg my-4 bg-slate-950" data-user-id="${user.id}">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 card-title">${user.nombre}</div>
                <p class="text-gray-500 text-lg font-semibold">Email: ${user.email}</p>
                <p class="text-gray-500 text-lg font-semibold">Rol ID: ${user.rol_id}</p>
                <div class="mt-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onclick="updateUser(${user.id})">Editar</button>
                  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deleteUser(${user.id})">Eliminar</button>
                </div>
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
      console.error("Error:", error);
    });
});
