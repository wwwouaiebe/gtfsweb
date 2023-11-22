<?php
$networkId = $_GET [ 'networkId' ];
$agencyId = $_GET [ 'agencyId' ];

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report ( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

if ( 'gtfs_delijn' == $networkId ) {
    $result = $mysqli->query(
        "select route_short_name as routeShortName, route_long_name as routeLongName, route_id as routeId FROM routes WHERE routes.agency_id = '"
        . 
        $agencyId 
        . 
        "' order by LPAD ( route_short_name, 10, ' ' )"
    );
}
elseif ( 'gtfs_stib' == $networkId ) {
     $result = $mysqli->query(
        "select route_short_name as routeShortName, route_long_name as routeLongName, route_id as routeId FROM routes order by LPAD ( route_short_name , 10, ' ')"
    );
}
elseif ( 'gtfs_tec' == $networkId ) {
    $result = $mysqli->query(
        "select route_short_name as routeShortName, route_long_name as routeLongName, route_id as routeId FROM routes WHERE agency_id = '"
        . 
        $agencyId
        .
        "' order by LPAD ( route_short_name, 10, ' ')");
}
else {
    return;
}

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );
?>