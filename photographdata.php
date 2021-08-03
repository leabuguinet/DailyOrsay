<?php

include('data.php');
include('index.php');

$photographOfTheDay = [callAPI("https://api.art.rmngp.fr:443/v1/works/{$idPhotographOfTheDay}", false)];


?>