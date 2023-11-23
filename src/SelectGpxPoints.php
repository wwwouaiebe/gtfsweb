<?php

error_reporting ( 0 );

$networkId = $_GET [ 'networkId' ];
$shapePk = $_GET [ 'shapePk' ];

if ( ! ctype_digit ( $shapePk ) ) {
    echo '{"error":"unknown"}';
    return;
}

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report ( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

$result = $mysqli->query (
    "select lat, lon from lat_lon_for_shape where shapePk="
    . 
    $shapePk 
    . 
    ";"
);

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );
?>