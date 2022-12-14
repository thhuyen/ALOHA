<?php
    include './connectdb.php';
    
    $id = $_POST['guest-code-upd'];
    $mail = $_POST['guest-mail-upd'];
    $name = $_POST['guest-name-upd'];
    $time = $_POST['guest-time-upd'];
    $type = $_POST['guest-type-upd'];

    if ($type === "Không thân thiết") {
        $type = 0;
    }
    else { $type = 1; }
    if (isset($_POST['update-customer'])) {
        $upd_customer = mysqli_query($conn, "UPDATE `customer` SET `CustomerName`='$name',`CustomerEmail`='$mail',`AmountOfBooking`='$time',`CustomerType`='$type'
                                     WHERE '".$id."' = `IdCustomer`");
    }
    Header("Location: ../../admin-customer.html#update-tab");

?>
