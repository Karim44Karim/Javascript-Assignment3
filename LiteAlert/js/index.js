function customAlert(title="title", text="text", showCancel=false, input=false, type = "info") {
  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
};
  
  // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "alertOverlay";
    overlay.classList.add("show");
    overlay.style.display = "flex";

    // Create modal box
    const box = document.createElement("div");
    box.id = "alertBox";

    const icon = icons[type] || icons.info;

    box.innerHTML = `
      <div id="alertIcon">${icon}</div>
      <h2>${title}</h2>
      <p>${text}</p>
      ${input ? '<input id="alertInput" type="text" />' : ''}
      <div class="alert-buttons">
        <button class="alert-confirm">OK</button>
        ${showCancel ? '<button class="alert-cancel">Cancel</button>' : ''}
      </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const okBtn = box.querySelector(".alert-confirm");
    const cancelBtn = box.querySelector(".alert-cancel");

    okBtn.addEventListener("click", () => {
      const inputValue = input ? box.querySelector("#alertInput").value : null;
      close();
    });

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        close();
      });
    }

    function close() {
      document.body.removeChild(overlay);
    }
}
