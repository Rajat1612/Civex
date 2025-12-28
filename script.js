/**
 * Civex Technical Services - JavaScript
 * Handles mobile menu toggle and form validation
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navList.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    }
});

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function validate_email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates Indian phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone is valid
 */
function validate_phone(phone) {
    // Indian phone number: 10 digits, optionally with country code +91
    const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Shows error message for a form field
 * @param {string} fieldId - ID of the form field
 * @param {string} message - Error message to display
 */
function show_error(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    const inputElement = document.getElementById(fieldId);
    if (inputElement) {
        inputElement.style.borderColor = '#e53e3e';
    }
}

/**
 * Clears error message for a form field
 * @param {string} fieldId - ID of the form field
 */
function clear_error(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    const inputElement = document.getElementById(fieldId);
    if (inputElement) {
        inputElement.style.borderColor = '';
    }
}

/**
 * Validates the contact form
 * @param {Event} event - Form submit event
 * @returns {boolean} - True if form is valid
 */
function validate_contact_form(event) {
    event.preventDefault();
    
    // Get form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');
    
    let isValid = true;
    
    // Clear previous errors
    clear_error('name');
    clear_error('email');
    clear_error('phone');
    clear_error('message');
    
    // Validate name
    if (!nameField || !nameField.value.trim()) {
        show_error('name', 'Name is required');
        isValid = false;
    } else if (nameField.value.trim().length < 2) {
        show_error('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!emailField || !emailField.value.trim()) {
        show_error('email', 'Email is required');
        isValid = false;
    } else if (!validate_email(emailField.value.trim())) {
        show_error('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!phoneField || !phoneField.value.trim()) {
        show_error('phone', 'Phone number is required');
        isValid = false;
    } else if (!validate_phone(phoneField.value.trim())) {
        show_error('phone', 'Please enter a valid Indian phone number (10 digits)');
        isValid = false;
    }
    
    // Validate message
    if (!messageField || !messageField.value.trim()) {
        show_error('message', 'Message is required');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        show_error('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        if (formSuccess) {
            formSuccess.style.display = 'block';
        }
        
        // Reset form
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
        
        // Scroll to success message
        if (formSuccess) {
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            if (formSuccess) {
                formSuccess.style.display = 'none';
            }
        }, 5000);
    }
    
    return isValid;
}

// Contact form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', validate_contact_form);
        
        // Real-time validation feedback (optional - clears errors on input)
        const formFields = ['name', 'email', 'phone', 'message'];
        formFields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function() {
                    clear_error(fieldId);
                });
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

