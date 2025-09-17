// Flash message auto-hide functionality
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(function(message) {
        setTimeout(function() {
            message.style.opacity = '0';
            setTimeout(function() {
                message.style.display = 'none';
            }, 300);
        }, 5000);
    });

    // Form validation enhancements
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Processing...';
                
                // Re-enable button after 3 seconds in case of errors
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = submitButton.getAttribute('data-original-text') || 'Submit';
                }, 3000);
            }
        });
    });

    // Store original button text
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(function(button) {
        button.setAttribute('data-original-text', button.textContent);
    });

    // Amount input formatting
    const amountInputs = document.querySelectorAll('input[name="amount"]');
    amountInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            const value = parseFloat(this.value);
            if (!isNaN(value)) {
                this.value = value.toFixed(2);
            }
        });
    });

    // Category color preview
    const categorySelects = document.querySelectorAll('select[name="category"]');
    categorySelects.forEach(function(select) {
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const category = selectedOption.value;
            
            // Remove existing category classes
            this.className = this.className.replace(/category-\w+/g, '');
            
            // Add new category class
            if (category) {
                this.classList.add('category-' + category);
            }
        });
        
        // Set initial category class
        if (select.value) {
            select.classList.add('category-' + select.value);
        }
    });

    // Confirm delete actions
    const deleteButtons = document.querySelectorAll('button[type="submit"]');
    deleteButtons.forEach(function(button) {
        if (button.textContent.trim() === 'Delete') {
            button.addEventListener('click', function(e) {
                if (!confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
                    e.preventDefault();
                }
            });
        }
    });

    // Mobile navigation toggle (if needed in future)
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading state to navigation links
    const navLinksElements = document.querySelectorAll('.nav-link');
    navLinksElements.forEach(function(link) {
        link.addEventListener('click', function() {
            // Don't add loading state to logout link
            if (!this.classList.contains('logout')) {
                this.style.opacity = '0.6';
                this.style.pointerEvents = 'none';
            }
        });
    });

    // Form field focus enhancement
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Real-time form validation feedback
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(this.value);
            
            if (this.value && !isValid) {
                this.style.borderColor = 'var(--danger-color)';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // Password strength indicator (basic)
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(function(input) {
        if (input.name === 'password') {
            input.addEventListener('input', function() {
                const strength = getPasswordStrength(this.value);
                updatePasswordStrengthIndicator(this, strength);
            });
        }
    });

    function getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    }

    function updatePasswordStrengthIndicator(input, strength) {
        let color = 'var(--danger-color)';
        if (strength >= 3) color = 'var(--warning-color)';
        if (strength >= 4) color = 'var(--success-color)';
        
        input.style.borderColor = input.value ? color : '';
    }
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for potential future use
window.ExpenseTracker = {
    formatCurrency,
    formatDate
};
