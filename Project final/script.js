// Navigation functionality
function navigateTo(page) {
    // Update active nav link
    document.querySelectorAll('.navbar-link, .navbar-link-mobile').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelectorAll(`[onclick="navigateTo('${page}')"]`).forEach(link => {
        link.classList.add('active');
    });
    //Slider



    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    document.getElementById('mobileMenu').classList.remove('open');
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('open');
}

// FAQ functionality
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqAnswer = faqItems[index].querySelector('.faq-answer');
    const faqArrow = faqItems[index].querySelector('.faq-arrow');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach((answer, i) => {
        if (i !== index) {
            answer.style.display = 'none';
            document.querySelectorAll('.faq-arrow')[i].classList.remove('open');
        }
    });
    
    // Toggle current FAQ
    if (faqAnswer.style.display === 'block') {
        faqAnswer.style.display = 'none';
        faqArrow.classList.remove('open');
    } else {
        faqAnswer.style.display = 'block';
        faqArrow.classList.add('open');
    }
}

// Initialize first FAQ as open
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize FAQ if we're on the how-ai-works page
    if (document.querySelector('.faq-item')) {
        toggleFAQ(0);
    }
});