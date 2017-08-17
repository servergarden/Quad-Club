document.addEventListener("DOMContentLoaded", function(event) {

	var get_score_script = function() {

		var get_hit_and_set_image = function() {

			score.exchange('../components/com_gallery/assets/js/counts.txt', function() { // txt file

				if (exch_xmlhttp.readyState == 4) {
					if (exch_xmlhttp.status == 200) {

						var data_obj = JSON.parse(exch_xmlhttp.responseText).data.tf;

						var hit_src = '/images/years/' + data_obj.name + '/' + data_obj.image + '.jpg';

						console.log('oki, done ', hit_src); // output php echo for control

						document.getElementById('hit').innerHTML = '<span>Hit-Bild: ' + data_obj.hits + ' mal angesehen. <a href="/index.php/bildergalerien?' + data_obj.name + '&' + data_obj.image + '" target="_self" >Album der Party vom ' + folder_to_date(data_obj.name) + ' ansehen ... </a></span><img src="' + hit_src + '" />';

						//document.getElementById('hit').innerHTML = '<span>Hit-Bild: ' + data_obj.hits + ' mal angesehen. <a href="/index.php?Itemid=108" target="_self" >Album der Party vom ' + folder_to_date(data_obj.name) + ' ansehen ... </a></span><img src="' + hit_src + '" />';

					} else {
						alert('counts shit happens');
					}
				}
			});

		};

		if (!document.getElementById('score_scr')) {

			var s = document.createElement('script');

			s.setAttribute("id", "score_scr");

			s.setAttribute("type", "text/javascript");

			s.setAttribute("charset", "utf-8");

			s.onload = function() {

				get_hit_and_set_image();

			};

			s.onerror = function() {
				alert('score err');
			};

			s.src = '../components/com_gallery/assets/js/image_score.js';

			document.getElementsByTagName('head')[0].appendChild(s);

		} else {
			get_hit_and_set_image();
		}

	};

	get_score_script();

});