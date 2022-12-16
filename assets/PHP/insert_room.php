<?php
    include './connectdb.php';

    $name = $_POST['room-name'];
    $type = $_POST['room-type'];
    $status = $_POST['radio-status-add'];
    $note = $_POST['room-note'];
    
    $insert_room = mysqli_query($conn,"INSERT INTO `room`(`RoomName`, `RoomTypeName`, `Status`, `RoomNote`) 
                                    VALUES ('$name','$type','$status','$note')");
    
   header("Location: ../../admin-room.html");    

?>