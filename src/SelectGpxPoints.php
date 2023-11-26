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
    'select shapes.shape_pt_lat as lat, shapes.shape_pt_lon as lon '
    .
    'from shapes where shapes.shape_pk = '
    . 
    $shapePk
    . 
    ' order by shapes.shape_pk, shapes.shape_pt_sequence;' 
);
$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );

echo ',"stops":';

$rows = $result->fetch_all ( MYSQLI_ASSOC );

$result = $mysqli->query (
    'select stop_times.stop_sequence as sequence, stops.stop_id as id, stops.stop_name as name, '
    . 
    'stops.stop_lat as lat ,stops.stop_lon as lon '
    . 
    'from stop_times inner join stops on stops.stop_pk = stop_times.stop_pk '
    . 
    'where stop_times.trip_pk = ( select trips.trip_pk from trips where trips.shape_pk = '
    . 
    $shapePk 
    .
    ' limit 1 ) order by stop_times.stop_sequence;'
);
$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );

echo '}';
?>