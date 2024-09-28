document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    
    fetch("http://localhost:8081/api/login?nombreUsuario="+username+"&contra="+password)
        .then(response => response.json())
        .then(response => {
            if (response.mensaje === "Acceso permitido") {
                // Limpiar el localStorage y guardar los datos
                localStorage.clear();
                localStorage.setItem('rol', response.rol);
                localStorage.setItem('matricula', response.matricula);
                
               
                Swal.fire("Bienvenido", "Acceso permitido", "success").then(() => {
                    // Redirigir a la otra vista cuando el usuario presione OK
                    location.href = "http://localhost:8080/colegioMilitarFront/PrincipalPrueba.html";
                });
                
            } else {
                
                Swal.fire("Error", response.mensaje, "error");
                document.getElementById("error-message").innerText = response.mensaje;
            }
        })
        .catch(error => {
            console.error('Error al consumir la API:', error);
            Swal.fire("Error", "Hubo un problema al intentar iniciar sesión", "error");
            document.getElementById("error-message").innerText = "Hubo un error al iniciar sesión.";
        });
});
