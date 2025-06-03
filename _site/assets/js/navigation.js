document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.nav__menu-button');
    const navList = document.querySelector('.nav__list');

    if (menuButton && navList) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('nav__list--mobile-visible');
        });
    }
});
