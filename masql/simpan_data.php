<?php
// Memanggil file koneksi
include 'koneksi.php';

// Atur header untuk memberitahu browser bahwa ini adalah respons JSON
header('Content-Type: application/json');

// Inisialisasi array untuk respons
$response = [];

// Mengambil data dari form dengan aman
$nama = $_POST['nama_lengkap'] ?? '';
$npm = $_POST['npm'] ?? '';
$alamat = $_POST['alamat'] ?? '';
$jurusan = $_POST['jurusan'] ?? '';
$jalur = $_POST['jalur_masuk'] ?? '';

// Validasi sederhana
if (!empty($nama) && !empty($npm)) {
    // Query untuk menyimpan data ke database
    $query = "INSERT INTO tbl_pendaftaran (nama_lengkap, npm, alamat, jurusan, jalur_masuk) 
              VALUES ('$nama', '$npm', '$alamat', '$jurusan', '$jalur')";

    // Eksekusi query
    if (mysqli_query($koneksi, $query)) {
        $response['status'] = 'sukses';
        $response['message'] = 'Data Anda berhasil disimpan di database!';
    } else {
        $response['status'] = 'gagal';
        $response['message'] = 'Error: ' . mysqli_error($koneksi);
    }
} else {
    $response['status'] = 'gagal';
    $response['message'] = 'Data tidak lengkap. Nama dan NPM wajib diisi.';
}

// Menutup koneksi
mysqli_close($koneksi);

// Mengirim respons dalam format JSON dan menghentikan eksekusi skrip
echo json_encode($response);
exit();
?>