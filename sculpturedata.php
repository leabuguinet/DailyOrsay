<?php

include('data.php');
include('index.php');

$sculptureOfTheDay = [callAPI("https://api.art.rmngp.fr:443/v1/works/{$idSculptureOfTheDay}", false)];


?>