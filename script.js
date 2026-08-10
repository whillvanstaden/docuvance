/* ==========================
   CV Packages Modal
========================== */

const viewPackages = document.getElementById("viewPackages");
const cvModal = document.getElementById("cvModal");
const closeModal = document.querySelector(".close-modal");

viewPackages.addEventListener("click", function (e) {

    e.preventDefault();

    cvModal.classList.add("show");

});

closeModal.addEventListener("click", function () {

    cvModal.classList.remove("show");

});

window.addEventListener("click", function (e) {

    if (e.target === cvModal) {

        cvModal.classList.remove("show");

    }

});
// =============================
// SERVICE SELECT
// =============================

const serviceSelect = document.getElementById("selected-service");
const totalPrice = document.getElementById("total-price");
const submitButton = document.getElementById("submit-button");

function updateOrderTotal() {

    const option = serviceSelect.options[serviceSelect.selectedIndex];
    const summaryService = document.getElementById("summary-service");

    const price = option.dataset.price;

    if (price) {

        totalPrice.textContent = `R${price}`;
        summaryService.textContent = option.text.split("—")[0].trim();
       submitButton.textContent = "Start My Request";

    } else if (serviceSelect.value !== "") {

        totalPrice.textContent = "Quotation Required";
        summaryService.textContent = option.text.split("—")[0].trim();
        submitButton.textContent = "Request a Quote";

    } else {

        totalPrice.textContent = "R0";
        summaryService.textContent = "Select a service";
      

    }

}

serviceSelect.addEventListener("change", updateOrderTotal);

updateOrderTotal();
// =============================
// ORDER NOW BUTTONS
// =============================

const orderButtons = document.querySelectorAll(".order-service");

orderButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        selectService(this.dataset.service);

    });

});
// =============================
// SELECT SERVICE
// =============================

function selectService(serviceName) {

    const option = [...serviceSelect.options].find(
        option => option.value === serviceName
    );

    if (!option) return;

    serviceSelect.value = serviceName;

    updateOrderTotal();

    const modal = document.getElementById("cvModal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

}
// =============================
// CV PACKAGE BUTTONS
// =============================

const packageButtons = document.querySelectorAll(".order-package");

packageButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        selectService(this.dataset.package);

    });

});
// =============================
// SUBMIT TO WHATSAPP
// =============================

const orderForm = document.querySelector(".order-form form");

orderForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("selected-service").value;
    const price = document.getElementById("total-price").textContent;
    const details = document.getElementById("details").value.trim();

    const message = `Hello DocuVance,

I would like to request the following service.

----------------------------
SERVICE
${service}

ESTIMATED PRICE
${price}

----------------------------
CLIENT DETAILS

Name: ${firstName} ${lastName}

Email: ${email}

Phone: ${phone}

----------------------------
PROJECT DETAILS

${details}

Please contact me regarding the next step.

Thank you.`;

    const whatsappNumber = "27603709033";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

});
