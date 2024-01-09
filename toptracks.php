<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="tracks.js"></script>
    <?php include 'menubar.php'; ?>
</head>
<body>
    
    <h1 id='user-name'></h1>
    <ul id="time-frame">
        <li><a href="#" data-timeframe="short_term">4 WEEKS</a></li>
        <li><a href="#" data-timeframe="medium_term">6 MONTHS</a></li>
        <li><a href="#" data-timeframe="long_term">ALL TIME</a></li>
    </ul>
    <div id="albumCovers"></div>
    <div id='track-list'></div>

</body>