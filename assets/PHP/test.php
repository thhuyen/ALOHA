<?php
    include './connectdb.php';
    
    $arr = array();
    $typerom_rows =  $conn->query("select * from roomtype");
    
    while($get_data_roomtype = $typerom_rows->fetch_assoc()) {
       // array_push($arr,$get_data_roomtype["RoomTypeName"]);
       array_push($arr, (object)[
        'name' => $get_data_roomtype["RoomTypeName"],
        'price' => $get_data_roomtype["RoomTypePrice"],
        ]);
    }
    //print_r($arr);
    $output = array_map(function ($object) {
         return $object->name . ': '. $object->price; 
        }, $arr);
    // echo implode(', ', $output); // dòng này là conver array to string thui chứ k gì
    // echo "\n";
    // echo (gettype($arr[0])); // yecasi output là tui đổi v để cho về string nhưng mà quên :v hehe
   

?>