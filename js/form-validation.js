// 3.4 JavaScript file must be external and use addEventListener() to handle events
// 4.3 Test validation for information on the register page

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateRegistrationForm()) {
                alert('Registration successful!');
                registrationForm.reset();
            }
        });
    }
});

function validateRegistrationForm() {
    let isValid = true;

    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        if (inputElement) inputElement.style.borderColor = '#b21f2d';
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        isValid = false;
    }

    function clearError(inputId) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        if (inputElement) inputElement.style.borderColor = '#ddd';
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    const fullName = document.getElementById('fullName');
    clearError('fullName');
    if (fullName.value.trim() === '') {
        showError('fullName', 'Full Name is required.');
    }

    const email = document.getElementById('email');
    clearError('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        showError('email', 'Email is required.');
    } else if (!emailPattern.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
    }

    const password = document.getElementById('password');
    clearError('password');
    if (password.value === '') {
        showError('password', 'Password is required.');
    } else if (password.value.length < 8) {
        showError('password', 'Password must be at least 8 characters long.');
    }

    const confirmPassword = document.getElementById('confirmPassword');
    clearError('confirmPassword');
    if (confirmPassword.value === '') {
        showError('confirmPassword', 'Confirm Password is required.');
    } else if (confirmPassword.value !== password.value) {
        showError('confirmPassword', 'Passwords do not match.');
    }

    const terms = document.getElementById('terms');
    clearError('terms');
    if (!terms.checked) {
        showError('terms', 'You must agree to the terms and conditions.');
    }

    return isValid;
}