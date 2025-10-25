// Global form submission handler
async function submitForm(e) {
  e.preventDefault();
  
  // Get the form
  const form = e.target;
  
  // Show loading state
  const submitBtn = form.querySelector(".btn-submit-order");
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(form);
  const gameId = document.getElementById("gameId").value.trim();
  const username = document.getElementById("username").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const packageName = document.getElementById("packageName").value;
  const packagePrice = document.getElementById("packagePrice").value;
  const orderId = document.getElementById("orderId").value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

  // Store data in sessionStorage
  sessionStorage.setItem(
    "orderData",
    JSON.stringify({
      gameId,
      username,
      phoneNumber,
      email,
      packageName,
      packagePrice,
      orderId,
      paymentMethod,
      // The game name will be set in each game's page
      game: document.getElementById("gameName").value || "Unknown Game"
    })
  );

  try {
    const response = await fetch('https://formsubmit.co/ajax/cbuilderit@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.href = './index.html';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Order & Continue to WhatsApp';
    submitBtn.disabled = false;
    alert('There was an error submitting your order. Please try again.');
  }
}
