<?php

    include('data.php');

    /* Function to call the API */

            /* https://weichie.com/blog/curl-api-calls-with-php/ */

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


    /* Get today's date */
  
    $date = date_create();
    if (!$date) {
        $e = date_get_last_errors();
        foreach ($e['errors'] as $error) {
            echo "$error\n";
        }
        exit(1);
    }
    
    $currentDate = date_format($date, 'Y-m-d');

    
    $hashedCurrentDate = crc32($currentDate); // hash the date 
   
    $dividedHashedDate = $hashedCurrentDate / 2147483647; // divide the hash by the maximum number of a hash number


    // Get the index position from the hash number * the length of the id's lists
    $indexPositionPainting = abs(round($dividedHashedDate * count($idListPaintings))); 
    $indexPositionSculpture = abs(round($dividedHashedDate * count($idListSculptures)));
    $indexPositionPhotograph = abs(round($dividedHashedDate * count($idListPhotographs)));

    // The index position gives the artwork of today, and we need to get its ID so we can fetch the corresponding data and send it back to our JS code.
    $idPaintingOfTheDay = $idListPaintings[$indexPositionPainting];
    $idSculptureOfTheDay = $idListSculptures[$indexPositionSculpture];
    $idPhotographOfTheDay = $idListPhotographs[$indexPositionPhotograph];
    

   
?>