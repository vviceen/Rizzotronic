

window.saveUser = saveUser;
window.cancelEdit = cancelEdit;

export function saveUser(userId) {
    // Obtener los nuevos valores de los inputs
    const nombre = document.getElementById(`edit-nombre-${userId}`).value;
    const email = document.getElementById(`edit-email-${userId}`).value;
    const rol_id = document.getElementById(`edit-rol_id-${userId}`).value;
  
    // Crear el objeto de datos a enviar al servidor
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('rol_id', rol_id);
  
    // Enviar los datos al servidor para guardar los cambios
    fetch('/Rizzotronic/backend/app/services/adminView/updateUsers.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          location.reload(); // Recargar la página para mostrar los cambios actualizados
          console.log("Usuario actualizado");  
        } else {
          alert('Error al actualizar el usuario: ' + data.debug);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  export function cancelEdit(userId) {
    // Recargar la página para cancelar la edición
    location.reload();
  }
  


// editUser.js
export function updateUser(userId) {
    // Obtener la tarjeta del usuario por ID
    const userCard = document.querySelector(`.card[data-user-id='${userId}']`);
    
    if (!userCard) {
      console.error(`User card with ID ${userId} not found.`);
      return;
    }
  
    // Obtener los valores actuales de la tarjeta
    const nombreElement = userCard.querySelector('.card-title');
    const emailElement = userCard.querySelector('.card-text-email');
    const rolElement = userCard.querySelector('.card-text-rol');
  
    const nombre = nombreElement ? nombreElement.textContent : '';
    const email = emailElement ? emailElement.textContent.replace('Email: ', '') : '';
    const rol_id = rolElement ? rolElement.textContent.replace('Rol ID: ', '') : '';
  
    // Reemplazar el contenido de la tarjeta con inputs
    userCard.innerHTML = `
      <div class="card-body">
        <p class="text-lg font-semibold">Nombre</p>
        <input type="text" class="form-control mb-2 bg-neutral-200 p-2 rounded-md" id="edit-nombre-${userId}" value="${nombre}">
        <p class="text-lg font-semibold">Email</p>
        <input type="text" class="form-control mb-2 bg-neutral-200 p-2 rounded-md" id="edit-email-${userId}" value="${email}">
        <p class="text-lg font-semibold">Rol</p>
        <input type="text" class="form-control mb-2 bg-neutral-200 p-2 rounded-md" id="edit-rol_id-${userId}" value="${rol_id}">
        <button class="btn btn-success" onclick="saveUser(${userId})">Guardar</button>
        <button class="btn btn-accent" onclick="cancelEdit(${userId})">Cancelar</button>
      </div>
    `;
  }
  
