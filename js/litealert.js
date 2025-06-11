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



    box.innerHTML =`
                    <div class="message-header">
                    <div>
                        <span class="circle" style="background-color: #F15F5D;"></span>
                        <span class="circle" style="background-color: #FEBE2E;"></span>
                        <span class="circle" style="background-color: #4DB748;"></span>
                    </div>
                    <div>
                        <i class="fa-solid fa-xmark fa-2x alert-cancel-icon"></i>
                    </div>
                </div>
                <div class="message-main">
                    <div id="alertIcon">${icon}</div>
                    <h3>${title}</h3>
                </div>
                <div class="message-body">
                  ${text}
                  ${input ? '<input id="alertInput" type="text" />' : ''}
                  <div class="alert-buttons">
                    <!-- <button class="alert-confirm">OK</button> -->
                    ${showCancel ? '<button class="alert-cancel">Cancel</button>' : ''}
                  </div>
                </div>
    `;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const okBtn = box.querySelector(".alert-confirm");
    const cancelBtn = box.querySelector(".alert-cancel");
    const cancelIcon = box.querySelector(".alert-cancel-icon");


  if(okBtn){
        okBtn.addEventListener("click", () => {
        const inputValue = input ? box.querySelector("#alertInput").value : null;
        close();
      });
  }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        close();
      });
    }
    if (cancelIcon) {
      cancelIcon.addEventListener("click", () => {
        close();
      });
    }

    function close() {
      document.body.removeChild(overlay);
    }
}
