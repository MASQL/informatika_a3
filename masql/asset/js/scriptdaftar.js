document.addEventListener('DOMContentLoaded', () => {

    const fileInput = document.getElementById('excel-file');
    const tableBody = document.getElementById('table-body');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            displayDataInTable(jsonData);
        };
        reader.readAsArrayBuffer(file);
    });

    function displayDataInTable(data) {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align:center;">Tidak ada data untuk ditampilkan.</td>`;
            tableBody.appendChild(row);
            return;
        }

        data.forEach(mahasiswa => {
            const row = document.createElement('tr');
            // FIX: Menyesuaikan dengan nama kolom dari file Excel baru
            // dan menambahkan kolom Alamat
            row.innerHTML = `
                <td>${mahasiswa['Nama Lengkap'] || ''}</td>
                <td>${mahasiswa['NPM'] || ''}</td>
                <td>${mahasiswa['Alamat'] || ''}</td>
                <td>${mahasiswa['Jurusan'] || ''}</td>
                <td>${mahasiswa['Jalur Masuk'] || ''}</td>
                <td>${mahasiswa['Tanggal Dicatat'] || ''}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});