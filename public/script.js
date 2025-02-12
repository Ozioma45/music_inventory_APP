document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (
        !confirm(
          "Are you sure you want to delete this item? This action cannot be undone."
        )
      ) {
        event.preventDefault();
      }
    });
  });
});
