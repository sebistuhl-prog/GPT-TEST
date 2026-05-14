const welcomeButton = document.querySelector("#welcomeButton");

if (welcomeButton) {
  welcomeButton.addEventListener("click", () => {
    welcomeButton.textContent = "Danke f\u00fcrs Klicken!";
    welcomeButton.classList.add("is-active");
  });
}
