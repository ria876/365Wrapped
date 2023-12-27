<?php 
echo '<style>
body { margin: 0; }
.header { display: flex;
    flex-direction: row;
    background-color: black; color: white;
    width: 100%; 
    height: 80px;
    align-items: center;

}
.header-image { width: 50px; height: 50px; margin-right: 10px; }
</style>';
echo '<header class="header">';
echo '<img class="header-image" src="Spotify_Icon_RGB_White.png">';
echo '<h2>365Wrapped</h2>';
echo '</header>';
?>