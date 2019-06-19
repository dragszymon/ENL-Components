// musisz podpiac jquery!

$(document).ready(function () {
    $('#hamburger-icon').click(function () {
        $(this).toggleClass('open');
    });
});

var menuMobileContainer = document.querySelector('.menu-mobile-container')
var hamburgerIcon = document.querySelector('#hamburger-icon')

menuMobileContainer.addEventListener('click', () => {
    menuMobileContainer.setAttribute("style", "display: none")
    hamburgerIcon.classList.toggle("open");
})
