<?php


$directory_images = glob($dir.'*.jpg');

$images = array();


foreach ($directory_images as $key => $image){
	$images[$key]['frame'] = $key;
	$images[$key]['data'] = 'data:image/gif;base64,'.base64_encode(file_get_contents($image));
}

$json_file = json_encode($images);
file_put_contents('imageset.json', $json_file);

?>

<html>
	<head>
		<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type="text/javascript">



		$(document).ready(function() {
			console.log('start');

			var ajaxUrl = 'imageset.json';


			$.ajax({
			    url: ajaxUrl,
			    contentType: 'application/json; charset=utf-8',
			    success: frameInit,
			    error: ajaxError
			});

			function frameInit(data) {



				$(window).scroll(function(event) {
					var st = $(window).scrollTop();
					console.log(st);

					for(var x in data) {
						if(st == x && st < data.length && st >= 0){

							$('body').css('background-image', 'url('+data[x].data+')');

						}


					}

				});
			}

			function ajaxError() {
				console.log('ajax failed');
			}





		});
		</script>
	</head>

	<body style="background-size:cover;">
	</body>
</html>