<?php
$network = $_GET["network"];
$agency = $_GET["agency"];
include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if ( 'Tec' == $network ) {
    $mysqli = new mysqli("localhost", $idtec, $pswtec , "gtfs_tec");
    $result = $mysqli->query("select `route_short_name`, `route_long_name`,`routes`.`route_type`,`routes`.`route_id` FROM `routes` WHERE `routes`.`agency_id` = '" . $agency . "' order by LPAD (`routes`.`route_short_name`, 10, ' ')");
}
elseif ( 'Stib' == $network ) {
    $mysqli = new mysqli("localhost", $idstib, $pswstib, "gtfs_stib");
    $result = $mysqli->query("select `route_short_name`, `route_long_name`,`routes`.`route_type`,`routes`.`route_id` FROM `routes` order by LPAD (`routes`.`route_short_name`, 10, ' ')");
}
else {
    return;
}
$rows = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($rows);
?>