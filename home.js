$(document).ready(function() {
    console.log('Document is ready');
    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
    //window.location.hash = '';

    // Set token
    let _token = hash.access_token;

    if (_token) {
        // Logic when token is available
        console.log('Token is available');

        // Use the token to make requests to the Spotify API
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + _token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // This will log the user's Spotify profile data to the console
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        // Logic when token is not available
        console.log('Token is not available');
    }
});