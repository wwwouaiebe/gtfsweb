<?php

error_reporting ( 0 );

$networkId = $_GET [ 'networkId' ];

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report ( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

$result = $mysqli->query (
    'select agencies_pk.agency_pk as agencyPk, agency.agency_id as agencyId, agency_name as agencyName from agencies_pk join agency on agencies_pk.agency_id = agency.agency_id order by agency.agency_name;'
);

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows, JSON_NUMERIC_CHECK );
?>