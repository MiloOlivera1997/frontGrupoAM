// Selección de elementos del DOM
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('close-menu');
const languageToggle = document.getElementById('language-toggle');
const languageMenu = document.getElementById('language-menu');
const languageEs = document.getElementById('language-es');
const languageEn = document.getElementById('language-en');
let currentIndex = 0;

// Elementos con atributo `data-section` que necesitan ser cambiados
const textsToChange = document.querySelectorAll("[data-section]");

/**
 * Cambia el idioma de los textos en la página según el archivo JSON correspondiente.
 * 
 * @param {string} language - El idioma a cambiar (por ejemplo, "es" o "en").
 */
const changeLanguage = async (language) => {
    const requestjson = await fetch(`./json/${language}.json`); // Carga el archivo JSON con los textos
    const texts = await requestjson.json();

    // Itera a través de los elementos que necesitan cambiar el texto
    for (const element of textsToChange) {
        const section = element.dataset.section;
        const value = element.dataset.value;

        // Si el elemento tiene los datos correctos y existe el texto correspondiente, lo cambia
        if (!section || !value || !texts[section] || !texts[section][value]) continue;

        element.innerHTML = texts[section][value];
    }
};

// Función para abrir el menú de navegación
/**
 * Abre el menú de navegación cuando se hace clic en el botón del menú.
 */
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open'); // Cambia el estado de la clase "open"
});

// Función para cerrar el menú de navegación
/**
 * Cierra el menú de navegación cuando se hace clic en el botón de cerrar.
 */
closeMenu.addEventListener('click', () => {
    menu.classList.remove('open'); // Elimina la clase "open" para cerrar el menú
});

// Cierra el menú si se hace clic fuera de él
/**
 * Cierra el menú si el usuario hace clic fuera de él o en el botón del menú.
 * 
 * @param {Event} event - El evento de clic.
 */
document.addEventListener('click', function (event) {
    if (menu.classList.contains('open') &&
        !menu.contains(event.target) &&
        !menuToggle.contains(event.target)) {
        menu.classList.remove('open'); // Cierra el menú
    }
});

// Función para abrir y cerrar el menú de idiomas
/**
 * Abre o cierra el menú de idiomas cuando se hace clic en el botón de idioma.
 * 
 * @param {Event} event - El evento de clic.
 */
languageToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic se propague y cierre el menú de idiomas
    languageMenu.classList.toggle('open'); // Cambia el estado del menú de idiomas
});

// Función para cambiar el idioma cuando se selecciona una opción en el menú de idiomas
/**
 * Cambia el idioma de la página cuando se selecciona un idioma del menú.
 * 
 * @param {Event} e - El evento de clic.
 */
languageMenu.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language); // Cambia el idioma según el valor del elemento seleccionado
});

// Cambiar el texto del botón a "Español" cuando se selecciona Español
/**
 * Cambia el texto del botón de idioma a "ES" cuando se selecciona Español.
 */
languageEs.addEventListener('click', () => {
    languageToggle.textContent = 'ES'; // Cambia el texto del botón
    languageMenu.classList.remove('open'); // Cierra el menú de idiomas
});

// Cambiar el texto del botón a "Inglés" cuando se selecciona Inglés
/**
 * Cambia el texto del botón de idioma a "EN" cuando se selecciona Inglés.
 */
languageEn.addEventListener('click', () => {
    languageToggle.textContent = 'EN'; // Cambia el texto del botón
    languageMenu.classList.remove('open'); // Cierra el menú de idiomas
});

// Cierra el menú de idiomas si el usuario hace clic fuera de él
/**
 * Cierra el menú de idiomas si el usuario hace clic fuera de él o en el botón de idioma.
 * 
 * @param {Event} event - El evento de clic.
 */
document.addEventListener('click', (event) => {
    if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
        languageMenu.classList.remove('open'); // Cierra el menú de idiomas
    }
});

  