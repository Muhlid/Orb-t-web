document.addEventListener('DOMContentLoaded', () => {

    // 1. ŞALTERLERİ (TOGGLE) CANLANDIRMA VE BİLDİRİM GÖSTERME
    const toggles = document.querySelectorAll('.toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const moduleName = this.closest('.module-card') 
                ? this.closest('.module-card').querySelector('h3').innerText 
                : 'Module';
            
            if (this.checked) {
                showNotification(`${moduleName} successfully enabled!`, 'success');
            } else {
                showNotification(`${moduleName} disabled.`, 'warning');
            }
        });
    });

    // 2. AYARLAR SAYFASINDAKİ "KAYDET" BUTONUNU CANLANDIRMA
    const configForm = document.querySelector('.config-card form');
    if (configForm) {
        configForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Sayfanın yenilenmesini engelle
            
            const btnSave = this.querySelector('.btn-save');
            const originalText = btnSave.innerText;
            
            // Yükleniyor efekti
            btnSave.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            btnSave.style.opacity = '0.7';
            btnSave.disabled = true;

            // 1.5 saniye sonra kaydedildi varsay
            setTimeout(() => {
                btnSave.innerHTML = originalText;
                btnSave.style.opacity = '1';
                btnSave.disabled = false;
                showNotification('Settings saved successfully!', 'success');
                
                // İsteğe bağlı: 2 saniye sonra ana panele geri dön
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 1500);
        });
    }

    // 3. CANLI BİLDİRİM (TOAST NOTIFICATION) SİSTEMİ
    function showNotification(message, type) {
        // Varsa eski bildirimi sil
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Yeni bildirim oluştur
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        
        const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-triangle-exclamation"></i>';
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Animasyonla ekrana getir
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // 3 saniye sonra ekrandan sil
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});


