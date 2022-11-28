<?php
    include './connectdb.php';

    $name = $_POST['fullname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $date = date('y-m-d h:i:s');
    $quantity_room = $_POST['number-room'];
    $room_type = $_POST['type-room-register'];
    $customer_rows = mysqli_query($conn, "SELECT * FROM CUSTOMER WHERE CustomerPhone = '".$phone."'"); 
    if (isset($_POST['submit_room'])){
        // lưu dữ liệu xuống table Customer           
        // chưa có trong database
        if ($customer_rows->num_rows == 0) {
            $insert_customer =$conn->query("INSERT INTO `customer`(`IdCustomer`, `CustomerName`, `CustomerPhone`, `CustomerEmail`, `AmountOfBooking`, `CustomerType`) 
            VALUES ('0','$name','$phone','$email', 1 , 0)");
        }
        // đã tồn tại
        else {
            $row = $customer_rows->fetch_assoc(); 
            if($row["AmountOfBooking"] >= 4) {
                $update_customer_type = $conn->query("UPDATE customer SET CustomerType = 1 WHERE CustomerPhone = '".$phone."'");
            }
            $update_customer_amount =  $conn->query("UPDATE customer SET AmountOfBooking = AmountOfBooking + 1 WHERE CustomerPhone = '".$phone."'");
        }
        // Lưu dữ liệu xuống table notification
        $id_customer_row = $conn->query("SELECT * FROM customer WHERE CustomerPhone = '".$phone."'");
        $row1 = $id_customer_row->fetch_assoc()["IdCustomer"]; // lấy ra IdCustomer để insert khóa ngoại cho dữ liệu của bảng noti
        $insert_noti =$conn->query("INSERT INTO `notification`(`Id`, `IdCustomer`, `Date`, `Status`) VALUES ('0','$row1', '$date',0)");
        // Lưu dữ liệu xuống table invoice_room
        $insert_invoice_room = $conn->query("INSERT INTO `invoice_room`(`IdInvoiceRoom`, `IdCustomer`, `InvoiceRoomDate`, `InvoiceRoomTotal`, `IsCanceled`) 
                                            VALUES (0,'$row1',null,null,0)");
        // Lưu dữ liệu xuống table invoice_room_detail
        $last_idinvoiceroom = mysqli_insert_id($conn); 
        $insert_invoiceroom_detail = $conn->query("INSERT INTO `invoice_room_detail`(`IdInvoiceRoom`, `RoomName`, `RoomPrice`) 
                                                    VALUES ('$last_idinvoiceroom','999',null)");
    };

   header("Location: ../../home.html");    
?>



