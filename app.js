// app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menü Linkleri İçin Yumuşak Kaydırma (Smooth Scroll)
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .hero-btns a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. SSS (FAQ) Açılır Kapanır (Akordeon) Sistemi
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            // Tıklanan öğe zaten açık mı diye kontrol et
            const isActive = item.classList.contains('active');
            
            // Önce tüm SSS pencerelerini kapat (böylece aynı anda sadece 1 tane açık kalır)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Eğer tıkladığımız öğe az önce kapalıysa, şimdi aç
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});
