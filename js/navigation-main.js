
let href = window.location.href;
let menuItems = document.querySelectorAll('.menu-item');
let submenuItems = document.querySelectorAll('.submenu-item');
let pageNavigation = document.getElementById('page-navigation');
let navBar = document.getElementById('site-navigation');
let navButton = document.getElementById('toggle-nav');
let searchButton = document.getElementById('toggle-search');
let searchCloseInner = document.getElementById('close-search-icon-inner');
let menuButtons = document.querySelectorAll('.menu-item-has-children .menu-item-link');
let searchInput = document.getElementById('searchInput');
for (let i = 0; i < submenuItems.length; i++) {
    const submenuItem = submenuItems[i];
    if (href.includes(submenuItem.dataset.url)) {
        submenuItem.classList.add('active-submenu-item');
    }
}
for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    const activeChildren = menuItem.querySelectorAll('.active-submenu-item');
    if (href.includes(menuItem.dataset.url) || activeChildren.length > 0) {
        menuItem.classList.add('active-menu-item');
    }
}
navButton.addEventListener("click", function () {
    navBar.classList.toggle("open");
    for (let i = 0; i < menuButtons.length; i++) {
        const menuButton = menuButtons[i];
        menuButton.classList.remove("open-sub-menu");
    }
});
searchButton.addEventListener("click", function () {
    pageNavigation.classList.toggle("open-search");
    if (pageNavigation.classList.contains("open-search")) {
        if (searchInput) {
            searchInput.focus();
        }
    }
});
searchCloseInner.addEventListener("click", function () {
    pageNavigation.classList.remove("open-search");
});
document.addEventListener('click', function (event) {
    const pageNavigation = document.querySelector('#page-navigation');

    if (!pageNavigation.contains(event.target)) {
        pageNavigation.classList.remove('open-search');
    }
});
for (let i = 0; i < menuButtons.length; i++) {
    const menuButton = menuButtons[i];
    menuButton.addEventListener("click", function () {
        menuButton.classList.toggle("open-sub-menu");
    });
}
