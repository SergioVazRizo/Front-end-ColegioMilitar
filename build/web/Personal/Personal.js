// Cargar empleados en la tabla
async function loadEmpleados() {
    try {
        const response = await fetch(`${apiBaseUrl}/empleado`); // Cambiar a comillas invertidas
        const empleados = await response.json();
        const empleadosTable = document.getElementById('empleadosTable').querySelector('tbody');

        empleadosTable.innerHTML = '';
        empleados.forEach(empleado => {
            if (empleado.estatus === "Activo") { // Solo mostrar empleados activos
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${empleado.nombre}</td>
                    <td>${empleado.correo}</td>
                    <td>${empleado.telefono}</td>
                    <td>${empleado.curp}</td>
                    <td>${empleado.numeroEmpleado}</td>
                    <td>${empleado.tipoContrato}</td>
                    <td>${empleado.fechaIngreso}</td>
                    <td>${empleado.grupo}</td>
                    <td>${empleado.estatus}</td>
                    <td>${empleado.area}</td>
                    <td>
                        <button onclick="prepareEdit(${empleado.idEmpleado})">Modificar</button>
                        <button onclick="deactivateEmpleado(${empleado.idEmpleado})">Dar Baja</button>
                    </td>
                `;
                empleadosTable.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error al cargar los empleados:', error);
    }
}

// Preparar la edición de un empleado
async function prepareEdit(empleadoId) {
    empleadoIdToEdit = empleadoId;
    try {
        const response = await fetch(`${apiBaseUrl}/empleado/${empleadoId}`); // Cambiar a comillas invertidas
        const empleado = await response.json();

        // Rellenar el formulario con los datos del empleado
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('correo').value = empleado.correo;
        document.getElementById('telefono').value = empleado.telefono;
        document.getElementById('curp').value = empleado.curp;
        document.getElementById('numeroEmpleado').value = empleado.numeroEmpleado;
        document.getElementById('tipoContrato').value = empleado.tipoContrato;
        document.getElementById('fechaIngreso').value = empleado.fechaIngreso.split('T')[0]; // Formatear fecha
        document.getElementById('grupo').value = empleado.grupo;
        document.getElementById('estatus').value = empleado.estatus;
        document.getElementById('area').value = empleado.area;

        // Mostrar botones adecuados
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';
    } catch (error) {
        console.error('Error al obtener empleado:', error);
    }
}

// Registrar nuevo empleado
document.getElementById('registerButton').addEventListener('click', async function () {
    const empleadoData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        curp: document.getElementById('curp').value,
        numeroEmpleado: document.getElementById('numeroEmpleado').value,
        tipoContrato: document.getElementById('tipoContrato').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        grupo: document.getElementById('grupo').value,
        estatus: 'Activo', // Al registrar, se establece el estatus como "Activo"
        area: document.getElementById('area').value
    };

    try {
        await fetch(`${apiBaseUrl}/empleado`, { // Cambiar a comillas invertidas
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData),
        });

        loadEmpleados(); // Recargar la tabla
        document.getElementById('empleadoForm').reset(); // Reiniciar el formulario
    } catch (error) {
        console.error('Error al registrar empleado:', error);
    }
});

// Actualizar empleado
document.getElementById('updateButton').addEventListener('click', async function () {
    const empleadoData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        curp: document.getElementById('curp').value,
        numeroEmpleado: document.getElementById('numeroEmpleado').value,
        tipoContrato: document.getElementById('tipoContrato').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        grupo: document.getElementById('grupo').value,
        estatus: document.getElementById('estatus').value,
        area: document.getElementById('area').value
    };

    try {
        await fetch(`${apiBaseUrl}/empleado/${empleadoIdToEdit}`, { // Cambiar a comillas invertidas
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData),
        });

        loadEmpleados(); // Recargar la tabla
        document.getElementById('empleadoForm').reset(); // Reiniciar el formulario

        // Reiniciar el ID para evitar conflictos en futuras ediciones
        empleadoIdToEdit = null;

        // Mostrar botones adecuados
        document.getElementById('registerButton').style.display = 'inline-block';
        document.getElementById('updateButton').style.display = 'none';
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
    }
});

// Dar baja a empleado (cambiar estatus a inactivo)
async function deactivateEmpleado(empleadoId) {
    if (confirm('¿Estás seguro de que deseas dar de baja a este empleado?')) {
        try {
            await fetch(`${apiBaseUrl}/empleado/${empleadoId}`, { // Cambiar a comillas invertidas
                method: 'DELETE', // Cambia a DELETE para que coincida con la ruta de desactivación
            });
            loadEmpleados(); // Recargar la tabla
        } catch (error) {
            console.error('Error al dar de baja empleado:', error);
        }
    }
}

// Cargar empleados al iniciar
window.onload = loadEmpleados;
