<?php
$html_files = glob("../html-pages/*.html");
$response = [];

foreach ($html_files as $file)
    array_push($response, basename($file));

echo json_encode($response);