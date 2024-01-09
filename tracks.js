$(document).ready(function () {
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

   
    let _token; 
    let cookies = document.cookie.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let [name, value] = cookie.split('=');

        if (name === 'token') {
            _token = value;
            break;
        }
    }
    

    if (_token) {
        
        console.log('Token is available');

        
        const fetchAndUpdateData = (timeFrame) => {
            
            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + _token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                $('#user-name').text(`${data.display_name}'s Top Tracks`);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            
            fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeFrame}`, {
                headers: {
                    'Authorization': 'Bearer ' + _token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let imagesHTML = '<div style="display: flex; flex-direction: row; justify-content: space-around; ">';

                for (let i = 0; i < Math.min(data.items.length, 5); i++) {
                    const tracks = data.items[i];

    
                    if (tracks.album.images && tracks.album.images[0]) {
                        imagesHTML += `
                            <div style="text-align: center; margin: 0 10px;">
                                <img src="${tracks.album.images[0].url}" alt="${tracks.name}" style="width: 150px; height: 150px;">
                                <p>${tracks.name}</p>
                            </div>
                        `;
                    }
                }

                document.getElementById('albumCovers').innerHTML = imagesHTML;

                let tableHTML = `
                    <table>
                        <thead>
                            <tr>
                                <td>Rank</td>
                                <td>Track</td>
                                <td>Artist</td>
                            </tr>
                        </thead>
                        <tbody>
                `;

                for (let i = 0; i < data.items.length; i++) {
                    const track = data.items[i];
                    const artistNames = track.artists.map(artist => artist.name).join(', ');
                    tableHTML += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${track.name}</td>
                            <td>${artistNames}</td>
                        </tr>
                    `;
                }

                tableHTML += '</tbody></table>';
                document.getElementById('track-list').innerHTML = tableHTML;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };

        // Initial fetch with default time frame
        fetchAndUpdateData('short_term');

        // Event listener for time frame selection change
        $('#time-frame a').on('click', function (event) {
            event.preventDefault();
            const selectedTimeFrame = $(this).data('timeframe');
            fetchAndUpdateData(selectedTimeFrame);
        });

    } else {
        console.log('Token is not available');
    }
});