document.addEventListener("DOMContentLoaded", function () {
    fetch("/Rizzotronic/backend/app/services/aboutUs/getInfoPage.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text(); // Cambiar a .text() temporalmente para depuración
        })
        .then(text => {
            try {
                const data = JSON.parse(text); // Intentar parsear la respuesta
                if (data.success) {
                    const aboutUs = data.data;
                    const imgPath = "/Rizzotronic/frontend/src/imgAboutUs/";

                    // Insertar las imágenes del local
                    document.getElementById('local-img-1').src = imgPath + aboutUs.local_img_1;
                    document.getElementById('local-img-2').src = imgPath + aboutUs.local_img_2;

                    // Insertar el texto del local
                    document.getElementById('txt-local').textContent = aboutUs.txt_local;

                    // Insertar las imágenes del equipo
                    document.getElementById('team-img-1').src = imgPath + aboutUs.team_img_1;
                    document.getElementById('team-img-2').src = imgPath + aboutUs.team_img_2;
                    document.getElementById('team-img-3').src = imgPath + aboutUs.team_img_3;

                    // Insertar el texto del equipo
                    document.getElementById('txt-team').textContent = aboutUs.txt_team;

                    // Insertar la misión y visión
                    document.getElementById('mision').textContent = aboutUs.mision;
                    document.getElementById('vision').textContent = aboutUs.vision;

                    // Insertar el texto opcional si existe
                    if (aboutUs.txt_opcional) {
                        document.getElementById('txt-opcional').textContent = aboutUs.txt_opcional;
                    }
                } else {
                    console.error('Error al obtener la información de la página:', data.message);
                    alert('Error al obtener la información de la página: ' + data.message);
                }
            } catch (error) {
                console.error('Error al parsear JSON:', error, text); // Mostrar el error y el texto recibido
                alert('Hubo un error al cargar la información de la página. Por favor, inténtelo de nuevo más tarde.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cargar la información de la página. Por favor, inténtelo de nuevo más tarde.');
        });
});