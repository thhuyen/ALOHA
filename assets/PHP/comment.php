<?php
    include './connectdb.php';
    $score = $_POST['rate'];
    $text = $_POST['text-review'];
    if (isset($_COOKIE['name'])) {
        $name = $_COOKIE['name'];
        mysqli_query($conn, "INSERT INTO `comment`(`Id`, `UserName`, `Score`, `Text`) VALUES ('0','$name','$score','$text')");
    }
    header("Location: ../../home.html");    
?>