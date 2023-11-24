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

echo '{"shapePoints":';
$result = $mysqli->query (
    'select lat, lon from lat_lon_for_shape where shapePk='
    . 
    $shapePk 
    . 
    ';'
);
$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );

echo ',"stops":';

$rows = $result->fetch_all ( MYSQLI_ASSOC );

$result = $mysqli->query (
    'select stop_times.stop_sequence as sequence, stops.stop_id as id, stops.stop_name as name, stops.stop_lat as lat ,stops.stop_lon as lon '
    .
    'from stop_times inner join stops on stops.stop_id = stop_times.stop_id '
    . 
    'where trip_id = ( select trip_id from trips where trips.shape_id = ( select shape_id from shapes_pk where shapes_pk.shape_pk = '
    . 
    $shapePk
    . 
    ') limit 1) '
    .
    'order by stop_times.stop_sequence;'
);
$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );
echo '}';
?>