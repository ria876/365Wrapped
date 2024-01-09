<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles.css">
    <script>
        $(document).ready(function() {
            $(".hamburger").click(function() {
                var menu = $(".menu");
                if (menu.css('left') === '-250px') {
                    menu.css('left', '0');
                } else {
                    menu.css('left', '-250px');
                }
            });
        });

        function logout(){
            _token = null;
            window.location.href = "index.php";
        }
    </script>
</head>

<body>
<i class="fa fa-bars hamburger"></i>
    <div class="menu">
        <div><a href="home.php"><i class="fa fa-home" aria-hidden="true"></i>Home</a></div>
        <div><a href="toptracks.php"><i class="fa fa-music" aria-hidden="true"></i>Top Tracks</a></div>
        <div><a href="friends.php"><i class="fa fa-users" aria-hidden="true"></i>Friends</a></div>
        <hr />
        <div><a onclick="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a></div> 
    </div>
</body>
</html>