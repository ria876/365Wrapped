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

   
    let _token = hash.access_token;
    if (_token) {
        document.cookie = `token=${_token}; max-age=3600`;
        console.log('Token is available');
    } else {
        let cookies = document.cookie.split('; ');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let [name, value] = cookie.split('=');

            if (name === 'token') {
                _token = value;
                break;
            }
        }
    }
    if (_token) {
        
        
        const fetchAndUpdateData = (timeFrame) => {
            
            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + _token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                $('#user-name').text(`${data.display_name}'s Top Artists`);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            
            fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeFrame}`, {
                headers: {
                    'Authorization': 'Bearer ' + _token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let imagesHTML = '<div style="display: flex; flex-direction: row; justify-content: space-around; ">';

                for (let i = 0; i < Math.min(data.items.length, 5); i++) {
                    const artist = data.items[i];

    
                    if (artist.images && artist.images[0]) {
                        imagesHTML += `
                            <div style="text-align: center; margin: 0 10px;">
                                <img src="${artist.images[0].url}" alt="${artist.name}" style="width: 150px; height: 150px;">
                                <p>${artist.name}</p>
                            </div>
                        `;
                    }
                }

                document.getElementById('artistImages').innerHTML = imagesHTML;

                let tableHTML = `
                    <table>
                        <thead>
                            <tr>
                                <td>Rank</td>
                                <td>Artist</td>
                                <td>Genres</td>
                            </tr>
                        </thead>
                        <tbody>
                `;

                for (let i = 0; i < data.items.length; i++) {
                    const artist = data.items[i];
                    tableHTML += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${artist.name}</td>
                            <td>${artist.genres}</td>
                        </tr>
                    `;
                }

                tableHTML += '</tbody></table>';
                document.getElementById('artist-list').innerHTML = tableHTML;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };

        
        fetchAndUpdateData('short_term');

        
        $('#time-frame a').on('click', function (event) {
            event.preventDefault();
            const selectedTimeFrame = $(this).data('timeframe');
            fetchAndUpdateData(selectedTimeFrame);
        });

    }else{

        let cookies = document.cookie.split('; ');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let [name, value] = cookie.split('=');

            if (name === 'token') {
                _token = value;
                break;
            }
        }
    } 
    if (!_token) {
        console.log('Token is not available');
    }

});
