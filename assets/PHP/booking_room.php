<?php
    include './connectdb.php';

    $name = $_POST['fullname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    $date = date('y-m-d h:i:s');
    $quantity_room = $_POST['number-room'];
    $room_type = $_POST['type-room-register'];
    $checkin_date = $_POST['checkin'];
    $checkout_date = $_POST['checkout'];
    $number = $_POST['number-room'];
    $customer_rows = mysqli_query($conn, "SELECT * FROM CUSTOMER WHERE CustomerPhone = '".$phone."'"); 
    
    if (isset($_POST['submit_room'])){

        // lưu dữ liệu xuống table Customer           
        // chưa có trong database
        if ($customer_rows->num_rows == 0) {
            mysqli_query($conn, "INSERT INTO `customer`(`IdCustomer`, `CustomerName`, `CustomerPhone`, `CustomerEmail`, `AmountOfBooking`, `CustomerType`) 
            VALUES ('0','$name','$phone','$email', 1 , 0)");
        }
        // đã tồn tại
        else {
            $row = $customer_rows->fetch_assoc(); 
            if($row["AmountOfBooking"] >= 4) {
                mysqli_query($conn, "UPDATE customer SET CustomerType = 1 WHERE CustomerPhone = '".$phone."'");
            }
            mysqli_query($conn, "UPDATE customer SET AmountOfBooking = AmountOfBooking + 1 WHERE CustomerPhone = '".$phone."'");
        }

        // Lưu dữ liệu xuống table notification
        $id_customer_row = mysqli_query($conn,"SELECT * FROM customer WHERE CustomerPhone = '".$phone."'");
        $row1 = $id_customer_row->fetch_assoc()["IdCustomer"]; // lấy ra IdCustomer để insert khóa ngoại cho dữ liệu của bảng noti
        //mysqli_query($conn, "INSERT INTO `notification`(`Id`, `IdCustomer`, `Date`, `Status`) VALUES ('0','$row1', '$date',0)");
        mysqli_query($conn,"INSERT INTO `notification`(`Id`, `IdCustomer`, `QuantityRoom`, `RoomType`, `Date`, `Status`) VALUES ('0','$row1','$quantity_room','$room_type','$date',0)");

        // Lưu dữ liệu xuống table invoice_room
        $roomtype_rows = mysqli_query($conn, "SELECT * FROM roomtype WHERE RoomTypeName = '".$room_type."'"); 
        $roomtype_price = $roomtype_rows->fetch_assoc()["RoomTypePrice"];
        
        $total = $roomtype_price * $number;
        mysqli_query($conn, "INSERT INTO `invoice_room`(`IdInvoiceRoom`, `IdCustomer`, `InvoiceRoomDate`, `InvoiceRoomTotal`) 
                                            VALUES (0,'$row1',null,'$total')");

        // Lưu dữ liệu xuống table invoice_room_detail
        $last_idinvoiceroom = mysqli_insert_id($conn); 
        $temp = -999;

        for ($i = 0; $i < $quantity_room; $i++) {
            $temp_name = (string)$temp;
            mysqli_query($conn,"INSERT INTO `invoice_room_detail`(`IdInvoiceRoomDetail`,`IdInvoiceRoom`, `RoomName`, `RoomTypeName`, `RoomPrice`, `ReservationDate`, `CheckinDate`, `CheckoutDate`) 
                                                    VALUES ('0','$last_idinvoiceroom','$temp_name','$room_type','$roomtype_price','$date', '$checkin_date','$checkout_date')");
            $temp = $temp + 1;
        }
        
    };

   header("Location: ../../home.html"); 
?>



