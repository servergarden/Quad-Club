var adjustments_de = {

	dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	monthNamesMin: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
	years: []

};



var folder_to_date = function(f) {

	var d = f.split('_');

	return ((d.length == 2) ? adjustments_de.monthNames[parseInt(d[1]) - 1] : parseInt(d[2]) + '. ' + adjustments_de.monthNames[parseInt(d[1]) - 1]) + ' ' + d[0];

};

var score = {

	"exchange": function(url, cfunc, val) {

		exch_xmlhttp = new XMLHttpRequest();

		exch_xmlhttp.onreadystatechange = cfunc;

		if (url.search('update_counts') != -1) {

			exch_xmlhttp.open("POST", url, true);

			exch_xmlhttp.setRequestHeader("expires", "0");
			exch_xmlhttp.setRequestHeader("Content-type", "application/json");

			exch_xmlhttp.send(val);

		} else {

			exch_xmlhttp.open("GET", url, true);

			exch_xmlhttp.send();

		}

	},

	"set": function(f, i) {

		score.exchange('../components/com_gallery/assets/js/counts.txt?zuza' + Math.floor(Math.random() * (1000) + 1), function() { // txt file

			if (exch_xmlhttp.readyState == 4) {
				if (exch_xmlhttp.status == 200) {

					var data_obj = JSON.parse(exch_xmlhttp.responseText);

					//console.log('oki, done ', exch_xmlhttp.responseText, data_obj); // output php echo for control

					score.top_folder = data_obj.data.tf;
					score.folders = data_obj.data.f;

					if (!score.folders[f]) {
						score.folders[f] = {};
					}
					if (score.folders[f][i]) {

						/*  disable overcount */
						/*  (if an image is top, it can not climb higher, so other images have more chance to reach the top)  */
						if (f == score.top_folder.name && i == score.top_folder.image) {
							//console.log('not counted');
						} else {
							//console.log('counted up');
							score.folders[f][i] += 1;
						}
						/*  end disable overcount */

					} else {
						score.folders[f][i] = 1;
					}

					if (!score.folders[f].top) {
						score.folders[f].top = 0;
					}

					score.folders[f].top = score.folders[f][Object.keys(score.folders[f]).reduce(function(a, b) {
						return score.folders[f][a] > score.folders[f][b] ? a : b
					})];

					score.set_top_folder(f, i);

				} else {
					console.log('counts shit happens');
				}
			}
		});

	},
	"set_top_folder": function(f, i) {

		var f_max = 0;
		for (key in score.folders) {
			if (score.folders[key].top > f_max) {
				f_max = score.folders[key].top;
			}
		}


		if (f_max > score.top_folder.hits) {
			score.top_folder.hits = f_max;
			score.top_folder.image = i;
			score.top_folder.name = f;
		}

		var json = JSON.stringify({
			"data": {
				"tf": score.top_folder,
				"f": score.folders
			}
		}, null, "\t");

		score.exchange('../components/com_gallery/assets/js/update_counts.php', function() { // save changed json data to server

			if (exch_xmlhttp.readyState == 4) {
				if (exch_xmlhttp.status == 200) {

					//console.log('oki, done ', exch_xmlhttp.responseText); // output php echo for control

					score.get(f, i);

				} else {
					console.log('update_counts shit happens');
				}
			}
		}, json);

	},
	"get": function(f, i) {
		if (score.top_folder.name == f && score.top_folder.image == i) {
			document.getElementById('txt_display').children[0].innerHTML += ' Hit-Bild: ' + score.top_folder.hits + ' clicks!';
		}
	}
};