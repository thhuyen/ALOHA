<?php
    include './connectdb.php';

    $name = $_POST['room-name'];
    $type = $_POST['room-type'];
    $status = $_POST['radio-status-add'];
    $note = $_POST['room-note'];
    
    mysqli_query($conn,"INSERT INTO `room`(`RoomName`, `RoomTypeName`, `Status`, `RoomNote`) 
                                    VALUES ('$name','$type','$status','$note')");
    $quan = mysqli_query($conn, "SELECT RoomTypeName, COUNT(RoomTypeName) SL FROM room GROUP BY RoomTypeName;");
    while ($row = $quan->fetch_assoc()) {
        mysqli_query($conn, "UPDATE `roomtype` SET RoomQuantity = '".$row["SL"]."' WHERE '".$row["RoomTypeName"]."' = RoomTypeName ");
    }

   header("Location: ../../admin-room.html");    

?>