// Form handling functionality for Free Fire Indonesia
document.addEventListener("DOMContentLoaded", function () {
    // Initialize payment method toggle
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const ezcashDetails = document.getElementById('ezcashDetails');
    const bankDetails = document.getElementById('bankDetails');
    
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'ezcash') {
                ezcashDetails.style.display = 'block';
                bankDetails.style.display = 'none';
            } else {
                ezcashDetails.style.display = 'none';
                bankDetails.style.display = 'block';
            }
        });
    });

    // Initialize copy buttons
    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalHtml;
                }, 2000);
            });
        });
    });

    const orderModal = new bootstrap.Modal(document.getElementById("orderModal"));
    const orderForm = document.getElementById("orderForm");
    const packageCards = document.querySelectorAll(".package-card");

    // Handle package card clicks
    packageCards.forEach((card) => {
        const orderBtn = card.querySelector(".btn-order");
        orderBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const packageName = card.getAttribute("data-package");
            const packagePrice = card.getAttribute("data-price");

            document.getElementById("selectedPackageName").textContent = packageName;
            document.getElementById("selectedPackagePrice").textContent = "Rs." + packagePrice;
            document.getElementById("packageName").value = packageName;
            document.getElementById("packagePrice").value = packagePrice;

            // Generate Order ID and Date
            const orderId = "FFID" + Date.now().toString().slice(-8);
            const orderDate = new Date().toLocaleString();

            document.getElementById("orderId").value = orderId;
            document.getElementById("orderDate").value = orderDate;
            document.getElementById("emailSubject").value = 
                `Order ${orderId} - Free Fire (Indonesia) - ${packageName}`;

            orderModal.show();
        });
    });

    // Handle form submission
    orderForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector(".btn-submit-order");
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(this);
        const orderData = {
            game: "Free Fire Indonesia",
            gameId: formData.get("Game_ID"),
            username: formData.get("username"),
            phoneNumber: formData.get("Phone_Number"),
            email: formData.get("email"),
            packageName: formData.get("Package_Name"),
            packagePrice: formData.get("Package_Price"),
            orderId: formData.get("Order_ID"),
            paymentMethod: formData.get("paymentMethod")
        };

        // Store data in sessionStorage
        sessionStorage.setItem("orderData", JSON.stringify(orderData));

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
    });

    // Check for order data on page load
    const orderData = sessionStorage.getItem("orderData");
    if (orderData) {
        const data = JSON.parse(orderData);
        sessionStorage.removeItem("orderData");

        // Show success message
        showSuccessMessage("Order sent successfully! Check your email for confirmation.");

        // Create WhatsApp message
        const messageText =
            `🎮 *New Order - Free Fire (Indonesia)*\n\n` +
            `📋 *Order ID:* ${data.orderId}\n` +
            `📦 *Package:* ${data.packageName}\n` +
            `💰 *Price:* Rs.${data.packagePrice}\n\n` +
            `👤 *Customer Details:*\n` +
            `🎯 Game ID: ${data.gameId}\n` +
            `👨 Username: ${data.username}\n` +
            `📱 Phone: ${data.phoneNumber}\n` +
            `📧 Email: ${data.email}\n\n` +
            `✅ Email with payment slip sent\n\n` +
            `Please confirm and process this order. Thank you!`;

        const whatsappNumber = "94770840497";

        setTimeout(() => {
            showConfirmationModal(messageText, whatsappNumber);
        }, 1000);
    }
});

function showSuccessMessage(message) {
    const successDiv = document.createElement("div");
    successDiv.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white; padding: 20px 25px; border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 99999;
    `;
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-check-circle" style="font-size: 24px;"></i>
            <div>
                <strong style="display: block; margin-bottom: 5px;">Success!</strong>
                <span style="font-size: 14px;">${message}</span>
            </div>
        </div>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
}

function showConfirmationModal(messageText, whatsappNumber) {
    const modalHTML = `
        <div class="modal fade" id="confirmationModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="background: #0f1729; border: 2px solid rgba(147, 51, 234, 0.3);">
                    <div class="modal-header" style="border-bottom: 1px solid rgba(147, 51, 234, 0.2);">
                        <h5 class="modal-title" style="color: white;">
                            <i class="fas fa-check-circle" style="color: #10b981;"></i>
                            Continue to WhatsApp
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" style="filter: invert(1);"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; border-radius: 10px;">
                            <i class="fas fa-info-circle"></i> 
                            <strong>Next Steps:</strong>
                            <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                                <li>Copy the order message below</li>
                                <li>Click "Open WhatsApp" button</li>
                                <li>Paste and send the message</li>
                            </ol>
                        </div>

                        <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; margin: 20px 0;">
                            <h6 style="color: #a78bfa; margin-bottom: 10px;">Message Preview:</h6>
                            <textarea id="orderMessageText" readonly style="width: 100%; height: 200px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 0.9rem; resize: none;">${messageText}</textarea>
                        </div>

                        <div class="d-grid gap-2">
                            <button onclick="copyMessage()" class="btn" style="background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; padding: 12px; border: none; border-radius: 10px; font-weight: 600; font-size: 1rem;">
                                <i class="fas fa-copy"></i> Copy Message
                            </button>
                            <button onclick="openWhatsAppDirect('${whatsappNumber}')" class="btn" style="background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: white; padding: 12px; border: none; border-radius: 10px; font-weight: 600; font-size: 1rem;">
                                <i class="fab fa-whatsapp"></i> Open WhatsApp
                            </button>
                        </div>

                        <p style="color: #94a3b8; font-size: 0.85rem; text-align: center; margin-top: 15px;">
                            <i class="fas fa-phone"></i> WhatsApp: +${whatsappNumber}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const existingModal = document.getElementById("confirmationModal");
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmModal.show();

    setTimeout(() => copyMessage(), 500);
}

function copyMessage() {
    const messageTextarea = document.getElementById("orderMessageText");
    if (!messageTextarea) return;

    messageTextarea.select();
    messageTextarea.setSelectionRange(0, 99999);

    try {
        document.execCommand("copy");
        const copyBtn = event.target.closest("button");
        if (copyBtn) {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)";
            }, 2000);
        }
    } catch (err) {
        alert("Please manually copy the message.");
    }
}

function openWhatsAppDirect(number) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappURL = isMobile 
        ? `https://api.whatsapp.com/send?phone=${number}`
        : `https://web.whatsapp.com/send?phone=${number}`;
    window.open(whatsappURL, "_blank");
}
function handleFormSubmission(e) {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = e.target.querySelector(".btn-submit-order");
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Get form data
  const formData = new FormData(e.target);
  const orderData = {
    game: document.getElementById("gameName").value,
    gameId: document.getElementById("gameId").value.trim(),
    username: document.getElementById("username").value.trim(),
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    email: document.getElementById("email").value.trim(),
    packageName: document.getElementById("packageName").value,
    packagePrice: document.getElementById("packagePrice").value,
    orderId: document.getElementById("orderId").value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
  };
  
  // Store data in sessionStorage
  sessionStorage.setItem("orderData", JSON.stringify(orderData));

  // Submit form using FormSubmit
  fetch('https://formsubmit.co/ajax/cbuilderit@gmail.com', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      window.location.href = './index.html';
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Order & Continue to WhatsApp';
    submitBtn.disabled = false;
    alert('There was an error submitting your order. Please try again.');
  });
}

// Package card handling functions
function handlePackageSelection(card) {
  const packageName = card.getAttribute("data-package");
  const packagePrice = card.getAttribute("data-price");
  const orderId = generateOrderId();
  const orderDate = new Date().toLocaleString();

  document.getElementById("selectedPackageName").textContent = packageName;
  document.getElementById("selectedPackagePrice").textContent = "Rs." + packagePrice;
  document.getElementById("packageName").value = packageName;
  document.getElementById("packagePrice").value = packagePrice;
  document.getElementById("orderId").value = orderId;
  document.getElementById("orderDate").value = orderDate;
  document.getElementById("emailSubject").value = `Order ${orderId} - ${document.getElementById("gameName").value} - ${packageName}`;
}

// Payment method toggle function
function togglePaymentMethod(method) {
  const ezcashDetails = document.getElementById('ezcashDetails');
  const bankDetails = document.getElementById('bankDetails');
  
  if (method === 'ezcash') {
    ezcashDetails.style.display = 'block';
    bankDetails.style.display = 'none';
  } else {
    ezcashDetails.style.display = 'none';
    bankDetails.style.display = 'block';
  }
}

// Copy text function
function copyText(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      button.innerHTML = originalHtml;
    }, 2000);
  }).catch(() => {
    button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed';
    setTimeout(() => {
      button.innerHTML = originalHtml;
    }, 2000);
  });
}

// Success message function
function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white; padding: 20px 25px; border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 99999;
  `;
  successDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <i class="fas fa-check-circle" style="font-size: 24px;"></i>
      <div>
        <strong style="display: block; margin-bottom: 5px;">Success!</strong>
        <span style="font-size: 14px;">${message}</span>
      </div>
    </div>
  `;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 5000);
}

// Generate unique order ID
function generateOrderId() {
  const prefix = document.getElementById("gameName").value === "PUBG Mobile" ? "PUBG" : "FF";
  return prefix + Date.now().toString().slice(-8);
}

// Initialize all event listeners
document.addEventListener("DOMContentLoaded", function () {
  const orderModal = new bootstrap.Modal(document.getElementById("orderModal"));
  const orderForm = document.getElementById("orderForm");
  const packageCards = document.querySelectorAll(".package-card");

  // Package card click handlers
  packageCards.forEach((card) => {
    const orderBtn = card.querySelector(".btn-order");
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handlePackageSelection(card);
      orderModal.show();
    });
  });

  // Payment method toggle handlers
  const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
  paymentMethodInputs.forEach(input => {
    input.addEventListener('change', () => togglePaymentMethod(input.value));
  });

  // Copy button handlers
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      copyText(button.getAttribute('data-copy'), button);
    });
  });

  // Form submission handler
  orderForm.addEventListener("submit", handleFormSubmission);

  // Check for order completion
  const orderData = sessionStorage.getItem("orderData");
  if (orderData) {
    const data = JSON.parse(orderData);
    sessionStorage.removeItem("orderData");
    showSuccessMessage("Order sent successfully! Check your email for confirmation.");
    showWhatsAppConfirmation(data);
  }
});

// WhatsApp confirmation modal
function showWhatsAppConfirmation(data) {
  const messageText =
    `🎮 *New Order - ${data.game}*\n\n` +
    `📋 *Order ID:* ${data.orderId}\n` +
    `📦 *Package:* ${data.packageName}\n` +
    `💰 *Price:* Rs.${data.packagePrice}\n` +
    `💳 *Payment Method:* ${data.paymentMethod === 'ezcash' ? 'eZcash' : 'Bank Transfer'}\n\n` +
    `👤 *Customer Details:*\n` +
    `🎯 Game ID: ${data.gameId}\n` +
    `👨 Username: ${data.username}\n` +
    `📱 Phone: ${data.phoneNumber}\n` +
    `📧 Email: ${data.email}\n\n` +
    `✅ Email with payment slip sent\n\n` +
    `Please confirm and process this order. Thank you!`;

  const whatsappNumber = "94770840497";

  setTimeout(() => {
    const modalHTML = `
      <div class="modal fade" id="confirmationModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="background: #0f1729; border: 2px solid rgba(147, 51, 234, 0.3);">
            <div class="modal-header" style="border-bottom: 1px solid rgba(147, 51, 234, 0.2);">
              <h5 class="modal-title" style="color: white;">
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                Continue to WhatsApp
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" style="filter: invert(1);"></button>
            </div>
            <div class="modal-body">
              <div class="alert" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; border-radius: 10px;">
                <i class="fas fa-info-circle"></i> 
                <strong>Next Steps:</strong>
                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Copy the order message below</li>
                  <li>Click "Open WhatsApp" button</li>
                  <li>Paste and send the message</li>
                </ol>
              </div>

              <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h6 style="color: #a78bfa; margin-bottom: 10px;">Message Preview:</h6>
                <textarea id="orderMessageText" readonly style="width: 100%; height: 200px; background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 0.9rem; resize: none;">${messageText}</textarea>
              </div>

              <div class="d-grid gap-2">
                <button onclick="copyMessage()" class="btn" style="background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%); color: white; padding: 12px; border: none; border-radius: 10px; font-weight: 600; font-size: 1rem;">
                  <i class="fas fa-copy"></i> Copy Message
                </button>
                <button onclick="openWhatsAppDirect('${whatsappNumber}')" class="btn" style="background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: white; padding: 12px; border: none; border-radius: 10px; font-weight: 600; font-size: 1rem;">
                  <i class="fab fa-whatsapp"></i> Open WhatsApp
                </button>
              </div>

              <p style="color: #94a3b8; font-size: 0.85rem; text-align: center; margin-top: 15px;">
                <i class="fas fa-phone"></i> WhatsApp: +${whatsappNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const existingModal = document.getElementById("confirmationModal");
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmModal.show();

    setTimeout(() => copyMessage(), 500);
  }, 1000);
}

// Copy message function
function copyMessage() {
  const messageTextarea = document.getElementById("orderMessageText");
  if (!messageTextarea) return;

  messageTextarea.select();
  messageTextarea.setSelectionRange(0, 99999);

  try {
    document.execCommand("copy");
    const copyBtn = event.target.closest("button");
    if (copyBtn) {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)";
      }, 2000);
    }
  } catch (err) {
    alert("Please manually copy the message.");
  }
}

// Open WhatsApp function
function openWhatsAppDirect(number) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const whatsappURL = isMobile
    ? `https://api.whatsapp.com/send?phone=${number}`
    : `https://web.whatsapp.com/send?phone=${number}`;
  window.open(whatsappURL, "_blank");
}