<?php
    include './connectdb.php';
    if (isset($_POST['btn-del'])) {
        if (($_COOKIE['roomname'])) {
            mysqli_query($conn, "DELETE FROM `room` WHERE RoomName = '".$_COOKIE['roomname']."'");
        }
    }
    Header("Location: ../../admin-room.html");
    
?>