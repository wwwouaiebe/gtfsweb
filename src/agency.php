<?php
$network = $_GET["network"];
include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if ( 'Tec' == $network ) {
    $mysqli = new mysqli("localhost", $idtec, $pswtec , "gtfs_tec");
}
elseif ( 'Stib' == $network ) {
    $mysqli = new mysqli("localhost",  $idstib, $pswstib, "gtfs_stib");
}
else {
    return;
}
$result = $mysqli->query("select `agency`.`agency_id`, `agency`.`agency_name` from `agency` order by `agency`.`agency_name`;");
$rows = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($rows);
?>