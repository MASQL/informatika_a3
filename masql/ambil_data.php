<?php
include 'koneksi.php';
header('Content-Type: application/json');

$query = "SELECT * FROM tbl_pendaftaran ORDER BY id DESC";
$result = mysqli_query($koneksi, $query);

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
mysqli_close($koneksi);
?>