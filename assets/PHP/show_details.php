<?php
    include './connectdb.php';
    if (isset($_POST['btn-detail'])) {
        //echo '<script>alert(123)</script>';
        $get_details = mysqli_query($conn, "SELECT * FROM invoice_room_detail ORDER BY IdInvoiceRoom DESC");
        if (isset($_COOKIE['IdInvoice'])) {
            $id2 = $_COOKIE['IdInvoice'];
            while ($row = $get_details->fetch_assoc()) {
                if ($id2 ===  $row["IdInvoiceRoom"]) {
                    setcookie("IdInvoice", $row['IdInvoiceRoom']);
                    setcookie("RoomName1", $row['RoomName']);
                    setcookie("CustomerName", $row['CustomerName']);
                    setcookie("CustomerPhone", $row['CustomerPhone']);
                    setcookie("CustomerEmail", $row['CustomerEmail']);
                    setcookie("ReservationDate", $row['ReservationDate']);
                    setcookie("CheckinDate", $row['CheckinDate']);
                    setcookie("CheckoutDate", $row['CheckoutDate']);        
                    setcookie("RoomPrice", $row['RoomPrice']);        
                    break;
                }
            }
        }
    }
    
?>