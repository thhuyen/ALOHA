<?php
    include './connectdb.php';
    $date = date('y-m-d h:i:s');
    $quantity_room = $_POST['number-room'];
    $room_type = $_POST['type-room-register'];
    $customer_rows = mysqli_query($conn, "SELECT * FROM CUSTOMER WHERE CustomerPhone = '".$phone."'"); 
    if (isset($_POST['submit_room'])){
    $id_customer = $customer_rows->fetch_assoc()["IdCustomer"]; // lấy ra IdCustomer để insert khóa ngoại cho dữ liệu của bảng noti
    $insert_noti =$conn->query("INSERT INTO `notification`(`Id`, `IdCustomer`, `Date`, `Status`) VALUES ('0','$id_customer', '$date',0)");
    $insert_invoice_room = $conn->query("INSERT INTO `invoice_room`(`IdInvoiceRoom`, `IdCustomer`, `InvoiceRoomDate`, `InvoiceRoomTotal`, `IsCanceled`) 
                                        VALUES (0,'$id_customer',null,null,0)");
    // Lưu dữ liệu xuống table invoice_room_detail
    $invoice_row = mysqli_query($conn, "SELECT * FROM invoice_room");
    $room_price = mysqli_query($conn, "SELECT * FROM roomtype rt, room r WHERE rt.RoomTypeName = r.RoomTypeName AND r.RoomTypeName = '".$room_type."'")->fetch_assoc()["RoomTypePrice"];
    $insert_invoiceroom_detail = $conn->query("INSERT INTO `invoice_room_detail`(`IdInvoiceRoom`, `RoomName`, `RoomQuantity`, `RoomPrice`); 
                                               VALUES ('',null,'$quantity_room','[value-4]')");
    }
   

?>