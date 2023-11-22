<?php
$networkId = $_GET [ 'networkId' ];
$shapeId = $_GET [ 'shapeId' ];

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report ( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

$result = $mysqli->query (
    "SELECT shape_pt_lat, shape_pt_lon from shapes where shapes.shape_id = '"
    . 
    $shapeId 
    . 
    "' order by shape_pt_sequence;"
);

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );
?>