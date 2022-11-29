<?php
    include './connectdb.php';
    
    
    $room_name = $_POST['room-name-update'];
    $room_type = $_POST['room-type-update'];
    $room_status = $_POST['radio-status'];
    $room_note = $_POST['room-note-update'];
    
    
    // switch($room_status) {
    //     case 'vacant': $room_status = 0;
    //     break;
    //     default: $room_status = 1;
    // }
    switch($room_type) {
        case 'big': $room_type = "Phòng bốn";
        break;
        case 'double': $room_type = "Phòng đôi";
        break;
        default: $room_type = "Phòng đơn"; 
    }
    if (isset($_REQUEST['radio-status'])) {
        echo $_POST['radio-status'];
        
    }
    if (isset($_POST['btn-save-update'])) {
        // $upd_room = mysqli_query($conn, "UPDATE `room` SET `RoomTypeName`='$room_type',`Status`='$room_status',`RoomNote`='$room_note'
        //                                  WHERE '".$room_name."' = `RoomName`");
    }
//     echo $room_name;
// echo '<br>';echo $room_type;
// echo $room_status;
// echo '<br>';echo $room_note;
    // Header("Location: ../../admin-room.html");

?>