<?php

    /* https://weichie.com/blog/curl-api-calls-with-php/ */
    include('data.php');

    function callAPI($url, $data){
        $curl = curl_init();
        
        if ($data)
        $url = sprintf("%s?%s", $url, http_build_query($data));
    
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            "APIKEY: 4ebda350062acbb93dea38fac8248fa99653d8a0a89b2f7b4347918690bbeee5",
        ));

        // EXECUTE:
        $result = curl_exec($curl);

        if(!$result){die("Connection Failure");}
        curl_close($curl);
        return $result;
    }

    

    
    //GET TODAY'S DATE
    $date = date_create();
    if (!$date) {
        $e = date_get_last_errors();
        foreach ($e['errors'] as $error) {
            echo "$error\n";
        }
        exit(1);
    }
    
    $currentDate = date_format($date, 'Y-m-d');

    $hashedCurrentDate = crc32($currentDate); 
   
    $dividedHashedDate = $hashedCurrentDate / 2147483647;

    $indexPositionPainting = abs(round($dividedHashedDate * count($idListPaintings))); 
    $indexPositionSculpture = abs(round($dividedHashedDate * count($idListSculptures)));
    $indexPositionPhotograph = abs(round($dividedHashedDate * count($idListPhotographs)));

    $idPaintingOfTheDay = $idListPaintings[$indexPositionPainting];
    $idSculptureOfTheDay = $idListSculptures[$indexPositionSculpture];
    $idPhotographOfTheDay = $idListPhotographs[$indexPositionPhotograph];
    

    $paintingOfTheDay = callAPI("https://api.art.rmngp.fr:443/v1/works/{$idPaintingOfTheDay}", false);
    $response = json_decode($paintingOfTheDay, true);

    $sculptureOfTheDay = callAPI("https://api.art.rmngp.fr:443/v1/works/{$idSculptureOfTheDay}", false);
    $response = json_decode($sculptureOfTheDay, true);

    $photographOfTheDay = callAPI("https://api.art.rmngp.fr:443/v1/works/{$idPhotographOfTheDay}", false);
    $response = json_decode($photographOfTheDay, true);

?>