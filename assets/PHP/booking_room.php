<?php
    include './connectdb.php';
    mysqli_set_charset($conn,'utf8'); // Truy xuất tiếng việt
    

        $name = $_POST['fullname'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $date = date('y-m-d h:i:s');
        if (isset($_POST['submit_room'])){
            $customer_rows = mysqli_query($conn, "SELECT * FROM CUSTOMER WHERE CustomerPhone = '".$phone."'");
            $insert_noti =$conn->query("INSERT INTO `notification`(`Id`, `Date`, `Status`) VALUES ('0','$date',0)");
            // chưa có trong database
            if ($customer_rows->num_rows == 0) {
                $insert_customer =$conn->query("INSERT INTO `customer`(`IdCustomer`, `CustomerName`, `CustomerPhone`, `CustomerEmail`, `AmountOfBooking`, `CustomerType`) 
                VALUES ('0','$name','$phone','$email', 1 , 0)");
            }
            // đã tồn tại
            else {
                $row = $customer_rows->fetch_assoc();
                if($row["AmountOfBooking"] >= 5) {
                    $update_customer_type = $conn->query("UPDATE customer SET CustomerType = 1 WHERE CustomerPhone = '".$phone."' OR CustomerEmail = '".$email."'");
                }
                $update_customer_amount =  $conn->query("UPDATE customer SET AmountOfBooking = AmountOfBooking + 1 WHERE CustomerPhone = '".$phone."' OR CustomerEmail = '".$email."'");
            }
        };

    header("Location: ../../home.html");    
?>



