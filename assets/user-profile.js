// Initialize profile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up auth event listener
    window.addEventListener('auth:updated', updateProfileDisplay);
    updateProfileDisplay();
});

// Update the profile display based on auth state
function updateProfileDisplay() {
    const user = window.SLGAuth.getAuthUser();
    const navUserItem = document.getElementById('navUserItem');
    const navUserBadge = document.getElementById('navUserBadge');
    const navAuthLink = document.getElementById('navAuthLink');

    if (user) {
        // Update navigation for logged-in user
        if (navUserItem) {
            navUserItem.classList.remove('d-none');
            navUserBadge.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span class="ms-1">${user.username || user.email || 'User'}</span>
            `;
            navUserBadge.addEventListener('click', displayUserProfile);
        }
        if (navAuthLink) {
            navAuthLink.textContent = 'Logout';
            navAuthLink.href = '#';
            navAuthLink.onclick = (e) => {
                e.preventDefault();
                window.SLGAuth.logout();
            };
        }
    } else {
        // Update navigation for logged-out user
        if (navUserItem) navUserItem.classList.add('d-none');
        if (navAuthLink) {
            navAuthLink.textContent = 'Login';
            navAuthLink.href = 'login.html';
            navAuthLink.onclick = null;
        }
    }
}

// Display user profile modal
function displayUserProfile(e) {
    if (e) e.preventDefault();
    
    const user = window.SLGAuth.getAuthUser();
    if (!user) return;

    const modalHTML = `
        <div class="modal fade" id="userProfileModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-user-circle"></i> My Profile
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="user-info">
                            <div class="info-item mb-3">
                                <label class="text-muted">Username</label>
                                <p class="profile-value">${user.username || 'N/A'}</p>
                            </div>
                            <div class="info-item mb-3">
                                <label class="text-muted">Email</label>
                                <p class="profile-value">${user.email || 'N/A'}</p>
                            </div>
                            <div class="info-item mb-3">
                                <label class="text-muted">Account Status</label>
                                <p class="profile-value">
                                    <span class="status-badge active">Active</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" onclick="window.SLGAuth.logout()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('userProfileModal');
    if (existingModal) existingModal.remove();

    // Add new modal and show it
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('userProfileModal'));
    modal.show();
}