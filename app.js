document.addEventListener('DOMContentLoaded', () => {
    const CLAVE_ADMINISTRACION = '159263487Aa@';
    const PRECIO_NUMERO = 38; // Precio por número
    let numerosSeleccionados = new Set(); // Números ocupados por todos los usuarios
    let numerosSeleccionadosUsuario = new Set(); // Números seleccionados por el usuario actual
    let usuarioId = null; // ID del usuario actual
    let nombreUsuario = ''; // Almacena el nombre del usuario actual

    function mostrarSeccion(id) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.toggle('hidden', section.id !== id);
        });
    }

    function generarNumeros() {
        const numerosContainer = document.getElementById('numerosContainer');
        numerosContainer.innerHTML = '';
        const numerosOcupados = cargarNumerosOcupados(); // Cargar los números ocupados
        
        for (let i = 1; i <= 999; i++) {
            const numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numero');
            numeroDiv.textContent = i;
            
            if (numerosOcupados.has(i)) {
                numeroDiv.classList.add('ocupado');
                numeroDiv.classList.remove('libre');
            } else {
                numeroDiv.classList.add('libre');
            }
            
            numeroDiv.addEventListener('click', () => {
                if (numeroDiv.classList.contains('ocupado') && !numerosSeleccionadosUsuario.has(i)) return; // No permite seleccionar números ocupados por otros
                
                numeroDiv.classList.toggle('libre');
                numeroDiv.classList.toggle('ocupado');
                if (numeroDiv.classList.contains('ocupado')) {
                    numerosSeleccionadosUsuario.add(i);
                    numerosSeleccionados.add(i);
                } else {
                    numerosSeleccionadosUsuario.delete(i);
                    numerosSeleccionados.delete(i);
                }
                actualizarPrecioTotal();
            });
            
            numerosContainer.appendChild(numeroDiv);
        }
        actualizarPrecioTotal();
    }

    function cargarNumerosOcupados() {
        // Recuperar números ocupados de localStorage
        const numerosOcupadosGuardados = JSON.parse(localStorage.getItem('numerosOcupados') || '[]');
        return new Set(numerosOcupadosGuardados);
    }

    function actualizarPrecioTotal() {
        const precioTotal = numerosSeleccionadosUsuario.size * PRECIO_NUMERO;
        document.getElementById('precioTotal').textContent = precioTotal;
    }

    document.getElementById('menuInicioBtn').addEventListener('click', () => mostrarSeccion('inicio'));

    document.getElementById('inscribirseBtn').addEventListener('click', () => {
        usuarioId = new Date().getTime(); // Simula un ID único para el usuario
        mostrarSeccion('inscripcion');
    });

    document.getElementById('adminBtn').addEventListener('click', () => mostrarSeccion('admin'));

    document.getElementById('registroForm').addEventListener('submit', (event) => {
        event.preventDefault();
        nombreUsuario = document.getElementById('name').value; // Guarda el nombre del usuario
        mostrarSeccion('reservar');
        generarNumeros(); // Generar números al inscribirse
        numerosSeleccionadosUsuario.clear(); // Asegura que el monto sea 0 para el nuevo usuario
        actualizarPrecioTotal();
    });

    document.getElementById('enviarSolicitudBtn').addEventListener('click', () => {
        if (numerosSeleccionadosUsuario.size === 0) {
            alert('No has seleccionado ningún número.');
            return;
        }
        const numerosOcupados = cargarNumerosOcupados();
        const numerosSeleccionadosArray = Array.from(numerosSeleccionadosUsuario);
        const montoTotal = numerosSeleccionadosArray.length * PRECIO_NUMERO;
        const mensaje = `Hola, mi nombre es ${nombreUsuario}. He seleccionado los siguientes números en la aplicación de Bingo: ${numerosSeleccionadosArray.join(', ')}. Total: ${montoTotal} BS`;
        window.open(`https://api.whatsapp.com/send?phone=584123714136&text=${encodeURIComponent(mensaje)}`, '_blank');
        
        // Actualizar el almacenamiento con los números ocupados por todos los usuarios
        const numerosOcupadosActualizados = new Set([...numerosOcupados, ...numerosSeleccionadosArray]);
        localStorage.setItem('numerosOcupados', JSON.stringify(Array.from(numerosOcupadosActualizados)));
        
        alert('Solicitud enviada.');
        actualizarNumeros();
    });

    document.getElementById('showPasswordBtn').addEventListener('click', () => {
        const adminPasswordInput = document.getElementById('adminPassword');
        adminPasswordInput.type = adminPasswordInput.type === 'password' ? 'text' : 'password';
        document.getElementById('showPasswordBtn').textContent = adminPasswordInput.type === 'password' ? 'Mostrar Clave' : 'Ocultar Clave';
    });

    document.getElementById('adminForm').addEventListener('submit', (event) => {
        event.preventDefault();
        if (document.getElementById('adminPassword').value === CLAVE_ADMINISTRACION) {
            localStorage.removeItem('numerosOcupados'); // Borra todas las selecciones
            alert('Selecciones limpiadas.');
            actualizarNumeros();
        } else {
            alert('Clave de administrador incorrecta.');
        }
    });

    document.getElementById('desmarcarBtn').addEventListener('click', () => {
        // Desmarca los números seleccionados por el usuario actual
        numerosSeleccionadosUsuario.forEach(numero => {
            const numeroDiv = document.querySelector(`.numero:nth-child(${numero})`);
            if (numeroDiv) {
                numeroDiv.classList.remove('ocupado');
                numeroDiv.classList.add('libre');
            }
        });
        numerosSeleccionadosUsuario.clear();
        actualizarPrecioTotal();
    });

    function actualizarNumeros() {
        const numerosOcupados = cargarNumerosOcupados();
        document.querySelectorAll('.numero').forEach((numeroDiv) => {
            const numero = parseInt(numeroDiv.textContent);
            numeroDiv.classList.toggle('libre', !numerosOcupados.has(numero));
            numeroDiv.classList.toggle('ocupado', numerosOcupados.has(numero));
        });
        actualizarPrecioTotal();
        actualizarConteoOcupadas();
    }

    function actualizarConteoOcupadas() {
        const ocupadasCountValue = document.getElementById('ocupadasCountValue');
        const ocupadasCount = document.querySelectorAll('.numero.ocupado').length;
        ocupadasCountValue.textContent = ocupadasCount;
    }

    // Inicialización
    mostrarSeccion('inicio');
    actualizarNumeros(); // Asegura que los números estén actualizados al cargar la página
});