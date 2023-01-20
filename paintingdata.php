<?php

include('data.php');
include('index.php');
include('config.php');

$paintingOfTheDay = callAPI("https://api.art.rmngp.fr:443/v1/works/{$idPaintingOfTheDay}", $APIKEY);


?>