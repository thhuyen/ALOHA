
<?php
    include './connectdb.php';
    mysqli_set_charset($conn,'utf8'); // Truy xuất tiếng việt
    

        $name = $_POST['fullname'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $date = date('y-m-d h:i:s');
        if (isset($_POST['submit_room'])){
            $customer_rows = mysqli_query($conn, "SELECT * FROM CUSTOMER WHERE CustomerPhone = '".$phone."'");            
            // chưa có trong database
            if ($customer_rows->num_rows == 0) {
                $insert_customer =$conn->query("INSERT INTO `customer`(`IdCustomer`, `CustomerName`, `CustomerPhone`, `CustomerEmail`, `AmountOfBooking`, `CustomerType`) 
                VALUES ('0','$name','$phone','$email', 1 , 0)");
            }
            // đã tồn tại
            else {
                $row = $customer_rows->fetch_assoc(); 
                if($row["AmountOfBooking"] >= 5) {
                    $update_customer_type = $conn->query("UPDATE customer SET CustomerType = 1 WHERE CustomerPhone = '".$phone."'");
                }
                $update_customer_amount =  $conn->query("UPDATE customer SET AmountOfBooking = AmountOfBooking + 1 WHERE CustomerPhone = '".$phone."'");
            }
            // Lưu dữ liệu xuống table Customer
            $id_customer_row = $conn->query("SELECT * FROM customer WHERE CustomerPhone = '".$phone."'");
            $row1 = $id_customer_row->fetch_assoc()["IdCustomer"]; // lấy ra IdCustomer để insert khóa ngoại cho dữ liệu của bảng noti
            $insert_noti =$conn->query("INSERT INTO `notification`(`Id`, `IdCustomer`, `Date`, `Status`) VALUES ('0','$row1', '$date',0)");
            $insert_invoice_room = $conn->query("INSERT INTO `invoice_room`(`IdInvoiceRoom`, `IdCustomer`, `InvoiceRoomDate`, `InvoiceRoomTotal`, `IsCanceled`) 
                                                VALUES (0,'$row1',null,null,0)");

            // Set dữ liệu cho form thanh toán (tổng cộng - set mức giá get từ database RoomType) 
            $room_type_register = $_POST['type-room-register'];
            $quantity_room = $_POST['number-room'];
            $get_data_roomtype = (mysqli_query($conn, "SELECT * FROM roomtype where '".$room_type_register."' = RoomTypeName "))->fetch_assoc();
            $room_type_name = $get_data_roomtype["RoomTypeName"];  
            $room_type_price = $get_data_roomtype["RoomTypePrice"];   
       
            $total = 0;         
            if (strcmp($room_type_name,$room_type_register) == 0) {
                $total = $room_type_price * $quantity_room;
            }    
            
        };

    // header("Location: ../../home.html");    
?>
<?php
setcookie("TotalRoom1","$total");
// if (isset($_COOKIE['TotalRoom'])) {
//     unset($_COOKIE['TotalRoom']); 
//     setcookie('TotalRoom', null, -1, '/'); 
//     return true;
// } else {
//     return false;
// }

?>


