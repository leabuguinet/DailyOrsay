<?php

include('data.php');
include('index.php');

$paintingOfTheDay = [callAPI("https://api.art.rmngp.fr:443/v1/works/{$idPaintingOfTheDay}", false)];


?>