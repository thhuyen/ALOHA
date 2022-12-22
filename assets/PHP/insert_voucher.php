<?php
    include './connectdb.php';

    $code = $_POST['code-voucher'];
    $percent = $_POST['percent'];
    $status = $_POST['radio-active'];
    $note = $_POST['voucher-note'];

    if($status === "1") {
        $date = date("Y/m/d");
        mysqli_query($conn, "INSERT INTO `voucher`(`VoucherCode`, `Status`, `Percent`, `ActiveDate`, `VoucherNote`) 
                        VALUES ('$code','$status','$percent','$date','$note')");
    }
    else {
        mysqli_query($conn, "INSERT INTO `voucher`(`VoucherCode`, `Status`, `Percent`, `ActiveDate`, `VoucherNote`) 
                        VALUES ('$code','$status','$percent',null,'$note')");
    }
    
   header("Location: ../../admin-voucher.html");    
?>