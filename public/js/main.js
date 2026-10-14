// MINICORE MVC - JavaScript del cliente
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveNav();
});

// Resalta el enlace activo según la URL
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || (href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        }
    });
}
