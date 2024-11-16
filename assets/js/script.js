$(document).ready(function () {
  customDropdown();
});
function customDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown-custom");

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom__btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom__menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom__item");
    const textDropdown = dropdown.querySelector(".dropdown-custom__text");

    // Toggle dropdown menu on button click
    btnDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
      closeAllDropdowns();
    });

    // Handle item selection and text swapping
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        const tmpText = textDropdown.textContent;
        const tmpImg = textDropdown.querySelector("img");
        const itemImg = item.querySelector("img");

        // Swap text and/or image
        if (itemImg) {
          const newHtml = item.innerHTML;
          textDropdown.innerHTML = newHtml;

          item.innerHTML = `${
            tmpImg ? `<img src="${tmpImg.src}" />` : ""
          } <span>${tmpText}</span>`;
        } else {
          textDropdown.textContent = item.textContent;
          item.textContent = tmpText;
        }

        closeAllDropdowns();
      });
    });

    // Function to close all dropdowns except the current one
    function closeAllDropdowns(exception) {
      document.querySelectorAll(".dropdown-custom__btn").forEach((btn) => {
        btn.classList.remove("--active");
      });

      dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(".dropdown-custom__menu");
        const btn = dropdown.querySelector(".dropdown-custom__btn");

        if (!exception || dropdown !== exception) {
          menu.classList.remove("dropdown--active");
          btn.classList.remove("--active");
        }
      });
    }
  });
}
