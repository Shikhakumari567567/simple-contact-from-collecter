const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("statusMessage");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const contact = {
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    message: formData.get("message").trim()
  };

  statusMessage.textContent = "";
  statusMessage.className = "";

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const response = await fetch("/submit-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send message.");
    }

    statusMessage.textContent = result.message;
    statusMessage.className = "success";

    contactForm.reset();
  } catch (error) {
    statusMessage.textContent =
      error.message || "Something went wrong. Please try again.";

    statusMessage.className = "error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
