document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateContactForm()) {
                alert('Thank you for your message!');
                contactForm.reset();
            }
        });
    }
});

function validateContactForm() {
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

    const contactName = document.getElementById('contactName');
    clearError('contactName');
    if (contactName.value.trim() === '') {
        showError('contactName', 'Your Name is required.');
    }

    const contactEmail = document.getElementById('contactEmail');
    clearError('contactEmail');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactEmail.value.trim() === '') {
        showError('contactEmail', 'Your Email is required.');
    } else if (!emailPattern.test(contactEmail.value.trim())) {
        showError('contactEmail', 'Please enter a valid email address.');
    }

    const subject = document.getElementById('subject');
    clearError('subject');
    if (subject.value.trim() === '') {
        showError('subject', 'Subject is required.');
    }

    const message = document.getElementById('message');
    clearError('message');
    if (message.value.trim() === '') {
        showError('message', 'Message is required.');
    }

    return isValid;
}