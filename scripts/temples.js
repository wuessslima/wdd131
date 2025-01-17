document.querySelector('.menu-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('show') && !e.target.closest('nav')) {
        navLinks.classList.remove('show');
    }
});