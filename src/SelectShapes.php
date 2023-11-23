<?php

error_reporting ( 0 );

$networkId = $_GET [ "networkId" ];
$routePk = $_GET [ "routePk" ];
$startDate = $_GET [ "startDate" ];
$endDate = $_GET [ "endDate" ];

if ( ! ctype_digit ( $routePk ) ) {
    echo '{"error":"unknown"}';
    return;
}

if ( 1 !== preg_match ( '/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $startDate ) ) {
    echo '{"error":"unknown"}';
    return;
}

if ( 1 !== preg_match ( '/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $endDate ) ) {
    echo '{"error":"unknown"}';
    return;
}

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

$result = $mysqli->query ( 
    'select * from shapes_for_route where routePk='
    .
    $routePk 
    . 
    ' and minStartDate <= "'
    .
    $startDate
    .
    '" and maxEndDate >= "'
    . 
    $endDate
    . 
    '";'
);

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );


?>