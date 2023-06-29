const burgerButton = document.querySelector(".header__burger");
const burgerMenu = document.querySelector(".burger");
const burgerOverlay = document.querySelector(".burger__overlay");
const burgerClose = document.querySelector(".burger__button-close");
const burgerLinks = burgerMenu.getElementsByClassName("nav__link");
console.log(burgerLinks);

const showBurger = () => {
  burgerMenu.classList.add("burger--active");
};

const closeBurger = () => {
  burgerMenu.classList.remove("burger--active");
};

burgerButton.addEventListener("click", showBurger);

burgerOverlay.addEventListener("click", closeBurger);

burgerClose.addEventListener("click", closeBurger);

for (link of burgerLinks) {
  link.addEventListener("click", closeBurger);
}

const contactsForm = document.forms.contacts;

const setError = (element, message) => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");
  const input = inputBox.querySelector("input");
  const textarea = inputBox.querySelector("textarea");

  errorDisplay.innerText = message;
  input
    ? input.classList.add("form__input--invalid")
    : textarea.classList.add("form__input--invalid");
};

const clearError = (element) => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");
  const input = inputBox.querySelector("input");
  const textarea = inputBox.querySelector("textarea");

  errorDisplay.innerText = "";
  input
    ? input.classList.remove("form__input--invalid")
    : textarea.classList.remove("form__input--invalid");
};

const validateInput = (element) => {
  const value = element.value;
  const emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (value === "") {
    setError(element, "Поле не может быть пустым");
    return;
  }

  if (element.name === "userName") {
    if (value.length < 2) {
      setError(element, "Имя слишком короткое");
    } else if (value.length > 25) {
      setError(element, "Введите менее 25 символов");
    }
  }

  if (element.name === "userEmail") {
    if (!emailRegExp.test(value)) {
      setError(element, "Введите корректный email");
    }
  }

  if (element.name === "message") {
    if (value.length > 700) {
      setError(element, "Введите менее 700 символов");
    }
  }
};

for (field of contactsForm) {
  if (field.type !== "submit" && field.type !== "checkbox") {
    const formElement = contactsForm.elements[field.name];

    formElement.addEventListener("blur", () => validateInput(formElement));

    formElement.addEventListener("focus", () => {
      clearError(formElement);
    });
  }
}

contactsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  for (field of contactsForm) {
    if (field.type !== "submit" && field.type !== "checkbox") {
      const formElement = contactsForm.elements[field.name];
      validateInput(formElement);
    }
  }

  let isValidForm = true;
  const validationsErrors = document.getElementsByClassName("error");
  for (let error of validationsErrors) {
    console.log(error);
    if (error.innerText !== "") isValidForm = false;
  }

  const values = {};

  for (let field of contactsForm) {
    const { name } = field;
    if (name) {
      const { value } = field;
      values[name] = value;
    }
  }

  if (isValidForm) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const successMessage = document.querySelector(".success");
        successMessage.classList.toggle("hidden");

        setTimeout(() => {
          successMessage.classList.toggle("hidden");
        }, 3000);

        e.target.reset();
      });
  }
});
