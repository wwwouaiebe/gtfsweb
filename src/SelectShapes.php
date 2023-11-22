<?php
$idtec = null;
$idstib = null;
$pswtec = null;
$pswstib = null;

$networkId = $_GET [ "networkId" ];
$routeId = $_GET [ "routeId" ];
$startDate = $_GET [ "startDate" ];
$endDate = $_GET [ "endDate" ];

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if ( 'Delijn' == $networkId ) {
    $mysqli = new mysqli ( 'localhost', $iddelijn, $pswdelijn , 'gtfs_delijn' );
}
elseif ( 'Stib' == $networkId ) {
    $mysqli = new mysqli ( 'localhost',  $idstib, $pswstib, 'gtfs_stib' );
}
elseif ( 'Tec' == $networkId ) {
    $mysqli = new mysqli( 'localhost', $idtec, $pswtec , 'gtfs_tec' );
}
else {
    return;
}

if ( 'Delijn' == $networkId ) {
    $result = $mysqli->query ( 
        "select distinct '' as minStartDate, '' as maxEndDate, trips.shape_id as shapeId from trips where trips.route_id = '" 
        . 
        $routeId
        . 
        "';"
    );
}
else {
    $result = $mysqli->query( 
        "select min(start_date) as minStartDate, max(end_date) as maxEndDate, shape_id as shapeId from ("
        . 
        "select distinct calendar.start_date, calendar.end_date, trips.shape_id FROM trips join calendar on trips.service_id = calendar.service_id"
        . 
        " where trips.route_id = '" 
        . 
        $routeId
        . 
        "' and calendar.start_date <= '"
        .
        $startDate
        .
        "' and calendar.end_date >= '"
        . 
        $endDate
        . 
        "') t group by shapeId order by minStartDate, maxEndDate;"
    );
}

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );
?>