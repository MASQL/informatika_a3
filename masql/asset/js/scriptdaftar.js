// Menunggu seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    const fileInput = document.getElementById('excel-file');
    const tableBody = document.getElementById('table-body');

    // Menjalankan fungsi ketika pengguna memilih sebuah file
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (!file) {
            return; // Tidak melakukan apa-apa jika tidak ada file yang dipilih
        }

        const reader = new FileReader();

        // Fungsi yang dijalankan setelah file berhasil dibaca
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            // Membaca data file excel menggunakan library SheetJS
            const workbook = XLSX.read(data, { type: 'array' });

            // Mengambil nama sheet pertama
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Mengubah data sheet menjadi format JSON (array of objects)
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Memanggil fungsi untuk menampilkan data ke tabel
            displayDataInTable(jsonData);
        };

        // Membaca file sebagai ArrayBuffer
        reader.readAsArrayBuffer(file);
    });

    // Fungsi untuk memasukkan data JSON ke dalam tabel HTML
    function displayDataInTable(data) {
        // Kosongkan isi tabel terlebih dahulu
        tableBody.innerHTML = '';

        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5" style="text-align:center;">Tidak ada data untuk ditampilkan.</td>`;
            tableBody.appendChild(row);
            return;
        }

        // Looping untuk setiap baris data
        data.forEach(mahasiswa => {
            const row = document.createElement('tr');

            // PENTING: Key di bawah ini ('Nama Server', 'Alamat IP', dll.)
            // harus sama persis dengan key yang dibuat oleh script.js di halaman formulir.
            // Meskipun labelnya sudah kita ganti menjadi "Nama Mahasiswa", "NIM", dll.,
            // nama kolom di dalam data Excel masih mengikuti ID asli dari formulir.
            row.innerHTML = `
                <td>${mahasiswa['Nama Server']}</td>
                <td>${mahasiswa['Alamat IP']}</td>
                <td>${mahasiswa['Sistem Operasi']}</td>
                <td>${mahasiswa['Status']}</td>
                <td>${mahasiswa['Tanggal Dicatat']}</td>
            `;

            tableBody.appendChild(row);
        });
    }
});