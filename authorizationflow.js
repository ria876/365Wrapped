
function loginWithSpotify() {
    var client_id = '9b6fee8f906243fe91b3c2d479ebf59f'; 
    var redirect_uri = 'http://localhost/365Wrapped/home.php'; 
    var scopes = 'user-read-recently-played app-remote-control user-top-read playlist-read-private '; 

    var url = 'https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + encodeURIComponent(client_id) +
        '&scope=' + encodeURIComponent(scopes) +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);


    window.location = url;
}
