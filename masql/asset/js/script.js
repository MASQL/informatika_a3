document.addEventListener('DOMContentLoaded', () => {
    const serverForm = document.getElementById('server-form');
    const popup = document.getElementById('popup-container');
    const closeBtn = document.querySelector('.close-btn');
    const popupMessage = document.getElementById('popup-message');

    const showPopup = (message) => {
        popupMessage.textContent = message;
        popup.style.display = 'flex';
    };

    const hidePopup = () => {
        popup.style.display = 'none';
    };

    serverForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah form reload halaman

        const formData = new FormData(serverForm); // Mengambil semua data dari form

        // Mengirim data ke server (simpan_data.php)
        fetch('simpan_data.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Mengubah respons server menjadi JSON
        .then(data => {
            // Tampilkan pesan yang dikirim dari PHP
            showPopup(data.message); 

            // Jika statusnya sukses, kosongkan formulir
            if (data.status === 'sukses') {
                serverForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Pesan ini hanya akan muncul jika file PHP benar-benar tidak bisa diakses
            showPopup('Tidak dapat terhubung ke server. Pastikan XAMPP berjalan.');
        });
    });

    closeBtn.addEventListener('click', hidePopup);
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            hidePopup();
        }
    });
});