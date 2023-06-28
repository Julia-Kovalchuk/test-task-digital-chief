const burgerButton = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".burger");
const burgerOverlay = document.querySelector(".burger__overlay");
const burgerClose = document.querySelector(".burger__button-close");

const showBurger = () => {
  burgerMenu.classList.add("burger--active");
};

const closeBurger = () => {
  burgerMenu.classList.remove("burger--active");
};

burgerButton.addEventListener("click", showBurger);

burgerOverlay.addEventListener("click", closeBurger);

burgerClose.addEventListener("click", closeBurger);
