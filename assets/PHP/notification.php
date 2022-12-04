<?php
    
    $get_news = mysqli_query($conn, "SELECT * FROM notification WHERE Status = 0 LIMIT 5");
    $get_names = mysqli_query($conn, "SELECT * FROM customer c, notification n
                                WHERE  c.IdCustomer = n.IdCustomer");
    $count_news = $get_news->num_rows;
?>