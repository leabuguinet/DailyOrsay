<?php

include('data.php');
include('index.php');
include('config.php');

$sculptureOfTheDay = callAPI("https://api.art.rmngp.fr:443/v1/works/{$idSculptureOfTheDay}", $APIKEY);


?>