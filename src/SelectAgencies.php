<?php
$networkId = $_GET [ 'networkId' ];

include 'd536289c-54e7-46fa-9020-625a3cd5239c/d536289c-54e7-46fa-9020-625a3cd5239c.php';

mysqli_report ( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );

$mysqli = new mysqli ( 'localhost', $networkId, $ids [ $networkId ] , $networkId );

$result = $mysqli->query (
    'select agency_id as agencyId, agency_name as agencyName from agency order by agency_name;'
);

$rows = $result->fetch_all ( MYSQLI_ASSOC );
echo json_encode ( $rows );
?>