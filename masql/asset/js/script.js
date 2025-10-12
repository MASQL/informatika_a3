document.addEventListener('DOMContentLoaded', () => {

    const serverForm = document.getElementById('server-form');
    const popup = document.getElementById('popup-container');
    const closeBtn = document.querySelector('.close-btn');

    const showPopup = (message) => {
        const popupMessage = document.getElementById('popup-message');
        if (message) {
            popupMessage.textContent = message;
        }
        popup.style.display = 'flex';
    };

    const hidePopup = () => {
        popup.style.display = 'none';
    };

    serverForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Mengambil data dari semua input, termasuk "Alamat" yang baru
        const serverData = {
            "Nama Lengkap": document.getElementById('server-name').value,
            "NPM": document.getElementById('ip-address').value,
            "Alamat": document.getElementById('alamat').value,
            "Jurusan": document.getElementById('os').value,
            "Jalur Masuk": document.getElementById('status').value,
            "Tanggal Dicatat": new Date().toLocaleString('id-ID')
        };

        exportToExcel([serverData]);
        showPopup('Data Anda berhasil diproses dan file Excel telah diunduh.');
        serverForm.reset();
    });

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Mahasiswa');

        // Mengatur lebar kolom agar otomatis
        const colWidths = Object.keys(data[0]).map(key => ({ wch: Math.max(key.length, 20) }));
        worksheet['!cols'] = colWidths;

        XLSX.writeFile(workbook, 'database_mahasiswa.xlsx');
    };

    closeBtn.addEventListener('click', hidePopup);

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            hidePopup();
        }
    });
});