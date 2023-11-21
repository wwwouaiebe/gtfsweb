<?php
$idtec = null;
$idstib = null;
$pswtec = null;
$pswstib = null;
$network = $_GET["network"];
$route = $_GET["route"];
$startDate = $_GET["startDate"];
$endDate = $_GET["endDate"];

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if ( 'Delijn' == $network ) {
    $mysqli = new mysqli("localhost", $iddelijn, $pswdelijn , "gtfs_delijn");
}
elseif ( 'Stib' == $network ) {
    $mysqli = new mysqli("localhost",  $idstib, $pswstib, "gtfs_stib");
}
elseif ( 'Tec' == $network ) {
    $mysqli = new mysqli("localhost", $idtec, $pswtec , "gtfs_tec");
}
else {
    return;
}

if ( 'Delijn' == $network ) {
    $result = $mysqli->query( 
        "SELECT distinct '' as min_start_date, '' as max_end_date, `trips`.`shape_id` FROM `trips` where `trips`.`route_id` = '" 
        . 
        $route
        . 
        "';"
    );
}
else {
    $result = $mysqli->query( 
        "select min(start_date) as min_start_date, max(end_date) as max_end_date, shape_id from ("
        . 
        "SELECT distinct `calendar`.`start_date`, `calendar`.`end_date`, `trips`.`shape_id` FROM `trips` join `calendar` on `trips`.`service_id` = `calendar`.`service_id`"
        . 
        " where `trips`.`route_id` = '" 
        . 
        $route
        . 
        "' and `calendar`.`start_date` <= '"
        .
        $startDate
        .
        "' and `calendar`.`end_date` >= '"
        . 
        $endDate
        . 
        "') t group by shape_id order by min_start_date, max_end_date;"
    );
}
/*
$result = $mysqli->query( 
   "SELECT distinct `trips`.`shape_id` FROM `trips` join `calendar` on `trips`.`service_id` = `calendar`.`service_id` where `trips`.`route_id` = '"
   .
   $route
   .
   "' and `calendar`.`start_date` <= '"
   .
   $startDate
   .
   "' and `calendar`.`end_date` >= '"
   .
   $endDate
    .
   "';"
);
*/

$rows = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($rows);
?>