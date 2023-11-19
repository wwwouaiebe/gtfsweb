<?php
$network = $_GET["network"];
$shapeId = $_GET["shapeId"];
include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if ( 'Tec' == $network ) {
    $mysqli = new mysqli("localhost", $idtec, $pswtec , "gtfs_tec");
}
elseif ( 'Stib' == $network ) {
    $mysqli = new mysqli("localhost", $idstib, $pswstib, "gtfs_stib");
}
else {
    return;
}
$result = $mysqli->query("SELECT `shapes`.`shape_pt_lat`, `shapes`.`shape_pt_lon` from `shapes` where `shapes`.`shape_id` = '" . $shapeId . "' order by `shapes`.`shape_pt_sequence`;");
$rows = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($rows);
?>