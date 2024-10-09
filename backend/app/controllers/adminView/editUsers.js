// editUsers.js
document.addEventListener("DOMContentLoaded", () => {
  const editUsersArrow = document.getElementById("editUsersArrow");
  const editUsersContent = document.getElementById("EditUsersContent");

  editUsersArrow.addEventListener("click", () => {
    if (editUsersContent.classList.contains("hidden")) {
      editUsersContent.classList.remove("hidden");
      editUsersArrow.textContent = "↑";
    } else {
      editUsersContent.classList.add("hidden");
      editUsersArrow.textContent = "↓";
    }
  });
});