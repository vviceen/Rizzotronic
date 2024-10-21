//dropdown para el filter
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("dropdown");
    const content = document.getElementById("content");

    dropdown.addEventListener("click", () => {
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        dropdown.textContent = "↑";
      } else {
        content.classList.add("hidden");
        dropdown.textContent = "↓";
      }
    });
  });