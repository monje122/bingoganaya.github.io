<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicación de Bingo</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Patrick+Hand:wght@400&display=swap">
</head>
<body>
    <nav>
        <button id="menuInicioBtn">Inicio</button>
    </nav>

    <section id="inicio">
        <div class="inicio-contenedor">
            <div class="inicio-imagen">
                <img src="https://store-images.s-microsoft.com/image/apps.34080.13510798887528624.ea88a7e6-557c-4ad5-99d7-c574f430c827.3c187ff1-754c-409a-9085-8e3aac2d97c5?mode=scale&q=90&h=1080&w=1920" alt="Imagen de Bingo">
            </div>
            <div class="inicio-info">
                <h3>Hola mi gente ganadora de BINGO GANA YAAA!</h3>
                <p>Aquí podrás escoger tus números de cartones de manera fácil y sencilla.</p>
                <p><strong>Paso 1:</strong> Dale clic en "Inscribirse" e ingresa tus datos.</p>
                <p><strong>Paso 2:</strong> Selecciona los números de cartones que desees comprar. Si te equivocas, puedes darle clic en la opción de "Desmarcar" para escoger otra vez. Habrá un cajetín con el monto total a pagar.</p>
                <p><strong>Paso 3:</strong> Una vez estés seguro, dale clic en "Enviar Solicitud" y allí te mandará a WhatsApp con un mensaje predeterminado de lo que escogiste. Automáticamente nos pondremos en contacto allí.</p>
                <p><strong>Paso 4:</strong> Realiza el pago para que yo te envíe los cartones que escogiste.</p>
                <button id="inscribirseBtn">Inscribirse</button>
                <button id="adminBtn">Administrador</button>
            </div>
        </div>
    </section>

    <section id="inscripcion" class="hidden">
        <h1 class="centrado">Inscripción</h1>
        <form id="registroForm">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>
            <label for="telefono">Número de Teléfono:</label>
            <input type="text" id="telefono" name="telefono" required>
            <button type="submit">Continuar</button>
        </form>
    </section>

    <section id="reservar" class="hidden">
        <h1>Seleccionar Números De Los Cartones Que Deseas</h1>
        <div id="indicadoresContainer">
            <div class="indicador disponible">Disponible</div>
            <div class="indicador ocupado">Ocupado</div>
        </div>
        <div id="numerosContainer"></div>
        <button id="enviarSolicitudBtn">Enviar Solicitud</button>
        <div id="accionesContainer">
            <div id="desmarcarBtn">Desmarcar</div>
            <div id="precioTotalContainer">
                <span id="precioTotal">0</span> BS
            </div>
        </div>
    </section>

    <section id="admin" class="hidden">
        <h1>Administración</h1>
        <form id="adminForm">
            <label for="adminPassword">Clave Administrador:</label>
            <input type="password" id="adminPassword" name="adminPassword" required>
            <button type="button" id="showPasswordBtn">Mostrar Clave</button>
            <button type="submit">Limpiar Selecciones</button>
        </form>
        <p id="ocupadasCount">Casillas Ocupadas: <span id="ocupadasCountValue">0</span></p>
    </section>

    <script src="app.js"></script>
</body>
</html>
