<?php

error_reporting ( 0 );

$networkId = $_GET [ 'networkId' ];
$agencyPk = $_GET [ 'agencyPk' ];

if ( ! ctype_digit ( $agencyPk ) ) {
    echo '{"error":"unknown"}';
    return;
}

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report ( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

$result = $mysqli->query ( 'select * from routes_for_agency where agencyPk=' . $agencyPk );
$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows, JSON_NUMERIC_CHECK );
?>