document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');

    // Fungsi untuk mengambil data dari server (ambil_data.php)
    async function loadDataFromServer() {
        try {
            const response = await fetch('ambil_data.php');
            if (!response.ok) {
                throw new Error(`Gagal menghubungi server: ${response.status}`);
            }
            const data = await response.json();
            displayDataInTable(data);
        } catch (error) {
            console.error("Terjadi kesalahan saat memuat data:", error);
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Gagal memuat data. Periksa koneksi atau lihat console.</td></tr>`;
        }
    }

    // Fungsi untuk menampilkan data yang diterima ke dalam tabel HTML
    function displayDataInTable(data) {
        tableBody.innerHTML = ''; // Kosongkan tabel sebelum diisi

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data mahasiswa yang terdaftar.</td></tr>`;
            return;
        }

        data.forEach(mahasiswa => {
            const row = document.createElement('tr');
            // Isi setiap sel dengan data dari database
            // Pastikan nama properti (e.g., mahasiswa.nama_lengkap) sama persis dengan kolom di database
            row.innerHTML = `
                <td>${mahasiswa.nama_lengkap}</td>
                <td>${mahasiswa.npm}</td>
                <td>${mahasiswa.alamat}</td>
                <td>${mahasiswa.jurusan}</td>
                <td>${mahasiswa.jalur_masuk}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Panggil fungsi untuk memuat data saat halaman selesai dimuat
    loadDataFromServer();
});