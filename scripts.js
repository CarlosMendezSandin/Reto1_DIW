document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Menú Móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menuMovil = document.getElementById('menu-movil');

    if (menuToggle && menuMovil) {
        menuToggle.addEventListener('click', () => {
            // Alternar 'activo' para mostrar/ocultar con CSS
            menuMovil.classList.toggle('activo');
            
            // Alternar el icono del menú abrir/cerra
            const iconoMenu = menuToggle.querySelector('.icono-menu');
            if (menuMovil.classList.contains('activo')) {
                iconoMenu.textContent = 'close';
                menuToggle.setAttribute('aria-label', 'Cerrar menú móvil');
            } else {
                iconoMenu.textContent = 'menu';
                menuToggle.setAttribute('aria-label', 'Abrir menú móvil');
            }
        });

        // Ocultar menú si se hace clic fuera
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = menuMovil.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (menuMovil.classList.contains('activo') && !isClickInsideMenu && !isClickOnToggle) {
                menuMovil.classList.remove('activo');
                menuToggle.querySelector('.icono-menu').textContent = 'menu';
                menuToggle.setAttribute('aria-label', 'Abrir menú móvil');
            }
        });
    }


    // 2. Lógica del Modo Oscuro
    const modoOscuroToggle = document.getElementById('modo-oscuro-toggle');
    const body = document.body;
    const CLASE_MODO_OSCURO = 'modo-oscuro';
    const KEY_MODO = 'devoraleite-modo-oscuro';

    // Función para aplicar el modo
    const aplicarModo = (esOscuro) => {
        if (esOscuro) {
            body.classList.add(CLASE_MODO_OSCURO);
            localStorage.setItem(KEY_MODO, 'oscuro');
        } else {
            body.classList.remove(CLASE_MODO_OSCURO);
            localStorage.setItem(KEY_MODO, 'claro');
        }
    };

    // LocalStorage o preferencia del sistema
    const modoGuardado = localStorage.getItem(KEY_MODO);
    const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (modoGuardado) {
        // Preferencia guardada
        aplicarModo(modoGuardado === 'oscuro');
    } else {
        // Usar la preferencia del sistema por defecto
        aplicarModo(prefiereOscuro);
    }

    // Listener para el botón de toggle
    if (modoOscuroToggle) {
        modoOscuroToggle.addEventListener('click', () => {
            // Alternar entre los modos
            const modoActual = body.classList.contains(CLASE_MODO_OSCURO);
            aplicarModo(!modoActual);
        });
    }
});