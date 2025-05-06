// 3.4 JavaScript file must be external and use addEventListener() to handle events

// Function to load HTML content into an element
async function includeHTML(filePath, targetElementId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            console.error(`Failed to fetch ${filePath}. Status: ${response.status}.`);
            throw new Error(`Could not load ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;
        } else {
            console.error(`Target element with ID '${targetElementId}' not found.`);
        }
    } catch (error) {
        console.error(`Error in includeHTML function:`, error);
    }
}

// Initialize the page by including header and footer
async function initializePage() {
    await includeHTML('../includes/header.html', 'header-placeholder');
    await includeHTML('../includes/footer.html', 'footer-placeholder');

    // Highlight active navigation link
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#header-placeholder nav a');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.split('/').pop() === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } catch (e) {
        console.error("Error setting active navigation link:", e);
    }
}

// Use addEventListener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage().catch(error => {
        console.error("Error during page initialization:", error);
    });
});