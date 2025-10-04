document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Toggle (Interactive Element 1) ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    /**
     * Toggles the mobile navigation menu open/closed using the 'open' class
     */
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when a link is clicked (important for smooth navigation)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
    }


    // --- 2. Product Filtering Logic (Interactive Element 2) ---
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const productCards = document.querySelectorAll('.product-card');

            // --- Button Highlighting Logic ---
            filterButtons.forEach(btn => {
                // Remove primary color classes
                btn.classList.remove('bg-[--primary-color]', 'text-white');
                // Add default gray classes
                btn.classList.add('bg-gray-300', 'text-gray-700');
            });
            // Apply primary color to the active button
            this.classList.add('bg-[--primary-color]', 'text-white');
            this.classList.remove('bg-gray-300', 'text-gray-700');

            // --- Product Filtering Logic ---
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Hide card first with a class for smooth CSS transition
                card.classList.add('product-hidden');

                setTimeout(() => {
                    // Decide if the card should be visible
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block'; // Ensure it's in the flow
                        // Remove hidden class after a slight delay to trigger transition
                        requestAnimationFrame(() => {
                            card.classList.remove('product-hidden');
                        });
                    } else {
                        // Keep hidden, but apply 'display: none' finally to remove from flow
                        card.style.display = 'none';
                    }
                }, 300); // Wait for CSS transition to complete (0.3s)
            });
        });
    });

    // Ensure the "All" filter is active on initial load
    document.querySelector('.filter-btn[data-filter="all"]').click();


    // --- 3. Contact Form Validation (Interactive Element 4) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop default form submission

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation check
        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Error: Please fill in all required fields.';
            formMessage.className = 'mt-4 text-center text-sm font-medium block text-red-600';
            formMessage.style.display = 'block';
            return;
        }

        // Display sending message
        formMessage.textContent = 'Sending inquiry...';
        formMessage.className = 'mt-4 text-center text-sm font-medium block text-[--primary-color]';
        formMessage.style.display = 'block';

        // Simulate API submission delay
        setTimeout(() => {
            // Success response logic
            formMessage.textContent = 'Thank you, ' + name + '! Your inquiry has been sent to Mulat Pharma.';
            formMessage.className = 'mt-4 text-center text-sm font-medium block text-[--secondary-color]';
            contactForm.reset();
        }, 1500);
    });

}); // End DOMContentLoaded

// --- Global Functions (Accessible via inline onclick) ---

/**
 * Toggles the Services Accordion (Interactive Element 3)
 * @param {number} id - The ID suffix of the accordion content to toggle (e.g., 1 or 2).
 */
window.toggleAccordion = function(id) {
    const content = document.getElementById('content-' + id);
    const header = content.previousElementSibling;
    const arrow = header.querySelector('.arrow-icon');
    
    // Close all other open accordions
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item.id !== 'content-' + id && item.classList.contains('open')) {
            item.classList.remove('open');
            item.previousElementSibling.querySelector('.arrow-icon').classList.remove('rotate-180');
        }
    });

    // Toggle the selected accordion
    content.classList.toggle('open');
    arrow.classList.toggle('rotate-180');
}