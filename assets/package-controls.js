document.addEventListener('DOMContentLoaded', function() {
  // Handle quantity controls
  document.querySelectorAll('.quantity-controls').forEach(control => {
    const minusBtn = control.querySelector('.minus');
    const plusBtn = control.querySelector('.plus');
    const quantitySpan = control.querySelector('.quantity');
    let quantity = 0;

    minusBtn.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        quantitySpan.textContent = quantity;
        updateOrderButton(control.closest('.package-card'), quantity);
      }
    });

    plusBtn.addEventListener('click', () => {
      quantity++;
      quantitySpan.textContent = quantity;
      updateOrderButton(control.closest('.package-card'), quantity);
    });
  });

  function updateOrderButton(card, quantity) {
    const orderBtn = card.querySelector('.btn-order');
    const basePrice = parseFloat(card.getAttribute('data-price'));
    const totalPrice = (basePrice * quantity).toFixed(2);
    
    if (quantity > 0) {
      orderBtn.innerHTML = `Order Now - LKR ${totalPrice}`;
      orderBtn.classList.add('active');
    } else {
      orderBtn.innerHTML = 'Order Now';
      orderBtn.classList.remove('active');
    }
  }
});
