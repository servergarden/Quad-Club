function loadXMLDoc(ud, cfunc) {

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = cfunc;

	xmlhttp.open("GET", ud, true);

	xmlhttp.send();

}

var adjustments_de = {

	dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	monthNamesMin: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
	years: []

};

var botsi_content, folders, folder_text, lp, clicker;

var imagesloaded = true,
	disable_img_load = false;

var color = 0;
/*
var colors = [
	'rgb(207,207,207)',
	'rgb(255, 255, 0)',
	'rgb(0, 255, 0)',
	'rgb(0, 255, 255)',
	'rgb(0, 0, 255)',
	'rgb(255, 0, 255)',
	'rgb(255,0,0)',

	'rgb(183, 183, 35)',
	'rgb(35, 183, 35)',
	'rgb(35, 183, 183)',
	'rgb(35, 35, 183)',
	'rgb(183, 35, 183)',
	'rgb(183,35,35)',

	'rgb(111, 111, 71)',
	'rgb(71, 111, 71)',
	'rgb(71, 111, 111)',
	'rgb(71, 71, 111)',
	'rgb(111, 71, 111)',
	'rgb(111,71,71)'
];
*/
//'rgb(111, 111, 71)',
var colors = [
	'rgb(111,71,71)',
	'rgb(209,125,16)',
	'rgb(71, 111, 71)',
	'rgb(71, 111, 111)',
	'rgb(71, 71, 111)',
	'rgb(111, 71, 111)'
];
//var colors = ['rgb(255,0,0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)', 'rgb(0, 0, 255)', 'rgb(255, 0, 255)'];
//var colors = ['rgb(160,230,0)', 'rgb(0, 230, 69)', 'rgb(0, 160, 230)', 'rgb(69, 0, 230)', 'rgb(230,0,160)', 'rgb(230, 69, 0)'];

var add_zeros = function(n) {
	var zehn = (n > 9) ? '' : '0';
	var hundert = (n > 99) ? '' : '0';
	return hundert + zehn + n;
};

var load_image = function(i, p, c) {

	if (disable_img_load == true) {
		disable_img_load = false;
		return;
	}

	ni = new Image();
	ni.onload = function() {

		if (i == 1 && folder_text.length > 0) {
			ih += '<div id="album_txt_display">' + folder_text[0] + '</div><img src="' + ni.src + '" onclick="sh_big(this,' + parseInt(ni.width / ni.height) + ')" style="border-color:' + c + ';"/><div class="positioner" id="p' + i + '"></div>';
		} else {
			ih += '<img src="' + ni.src + '" onclick="sh_big(this,' + parseInt(ni.width / ni.height) + ')" style="border-color:' + c + ';"/><div class="positioner" id="p' + i + '"></div>';
		}
		i++;
		if (i == 7) {
			botsi_content.innerHTML = ih;
			var fs = window.innerHeight * 0.98 - (botsi_content.children[botsi_content.children.length - 2].getBoundingClientRect().bottom + 80);
			ih = '';
			if (fs < 48) {
				fs = 48;
			}
			botsi_content.innerHTML += '<i id="wait_awe" style="color:' + c + ';font-size:' + fs + 'px;" class="fa fa-circle-o-notch fa-spin aria-hidden="true"></i>';
			botsi_content.classList.add("show_kacheln");

			actualize_menu(p, c);
		}

		load_image(i, p, c);
		dis_big.gal_max = i;
	};
	ni.onerror = function() {




		/*
				console.log('oki, done. i is: ', i);
		*/

		botsi_content.removeChild(document.querySelector("#wait_awe"));

		botsi_content.innerHTML += ih;
		imagesloaded = true;
	};
	ni.src = '../images/years/' + p + '/' + add_zeros(i) + '.jpg';
};


var build_menu = function(f) {
	var c = 0;
	//var rem = document.getElementsByClassName("uk-navbar-nav")[0].getElementsByTagName('li');
	var rep = document.createElement('div');
	rep.id = "party_selector";
	rep.setAttribute("val", "");
	rep.classList.add("dropdown");

	var o = '<li style="background:rgb(255,255,255);"><div onclick="change_from_menu(this)" val ="index">Party auswählen</div></li>';
	for (var i = 0; i < f.length; i++) {
		c++;
		if (c > 5) {
			c = 0;
		}
		o += '<li style="background:' + colors[c] + ';"><div onclick="change_from_menu(this)" val ="' + f[i] + colors[c] + '">' + folder_to_date(f[i]) + '</div></li>';
	}
	rep.innerHTML = '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Party auswählen<span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' + o + '</ul>';

	//document.getElementsByClassName("uk-navbar-nav")[0].removeChild(rem[1]);
	//document.getElementsByClassName("uk-navbar-nav")[0].insertBefore(rep, rem[1]);

	botsi_content.parentNode.appendChild(rep);

};

var change_from_menu = function(a) {
	dis_big.classList.add('display_big_ini');
	r = a.getAttribute("val").split('rgb');
	a.parentNode.parentNode.setAttribute("val", r);
	if (r[0] == 'index') {
		//lp.classList.remove('display_big_ini');
		talk();
	} else {
		if (imagesloaded) {
			sh_big(a, r[0], 'rgb' + r[1]);
		} else {
			disable_img_load = true;
			setTimeout(function() {
				sh_big(a, r[0], 'rgb' + r[1]);
			}, 50);

		}
	}
};

var actualize_menu = function(a, c) {
	document.getElementById('party_selector').setAttribute("val", a + c);
	document.getElementById('party_selector').getElementsByTagName('button')[0].innerHTML = 'Party vom ' + folder_to_date(a);
	document.getElementById('party_selector').getElementsByTagName('button')[0].style.background = c;
};

var folder_to_date = function(f) {

	var d = f.split('_');

	return ((d.length == 2) ? adjustments_de.monthNames[parseInt(d[1]) - 1] : d[2].replace('0', '') + '. ' + adjustments_de.monthNames[parseInt(d[1]) - 1]) + ' ' + d[0];

};

var come_lp = function(t, f, c) {
	var b = 'Party vom ' + folder_to_date(f);
	var ro = 0 - b.length / 2 * 12 + 6;
	var bend = '<img src="images/galery_sys/single_transp.png" /><div id="warped">';
	for (var i = 0; i < b.length; i++) {
		bend += '<span class="w' + i + '">' + b.charAt(i) + '</span>';
	}
	bend += '</div>';


	lp.innerHTML = bend;

	lp.onclick = function() {
		sh_big(t, f, c);
	};
	lp.style.transform = 'rotate(' + ro + 'deg)';
	lp.style.background = 'radial-gradient(rgba(0,0,0,0) 2.4vw, ' + c + ' 2.4vw, ' + c + ' 10vw, rgba(0,0,0,0) 10vw)';
	lp.style.left = t.getBoundingClientRect().left + 'px';
	lp.style.top = t.offsetTop + 'px';
	lp.classList.remove('display_big_ini');
};

/*  filling the main window */

var talk = function() {


	/*  clear all content */

	botsi_content.innerHTML = '';
	var ih = '';
	var f = 0;
	var ni;
	color = 0;


	/* define loading function for home images of each folder (this function loops herself ontill all folders are checked)  */

	var load_folder_image = function(f) {
		color++;

		if (color > 5) {
			color = 0;
		}

		ni = new Image();
		ni.onload = function() {
			//ih += '<img src="' + ni.src + '" onmouseover="come_lp(this,\'' + folders[f] + '\',\'' + colors[color] + '\')" onclick="sh_big(this,\'' + folders[f] + '\',\'' + colors[color] + '\')" style="border-color:' + colors[color] + ';"/>';
			ih += '<img src="' + ni.src + '" onmouseover="come_lp(this,\'' + folders[f] + '\',\'' + colors[color] + '\')" style="border-color:' + colors[color] + ';"/>';
			f++;
			if (f < folders.length) {
				load_folder_image(f);
			} else {
				botsi_content.innerHTML += ih;
				botsi_content.classList.add("show_kacheln");
				build_menu(folders);
			}
		};
		ni.onerror = function() {
			console.log('oki, done (error onload). f is: ', f);
			botsi_content.innerHTML += ih;
		};
		ni.src = '../images/years/' + folders[f] + '/001.jpg';
	};

	load_folder_image(f);

};


/*  calculation helper function */

var rech = function(el) {
	w = ((window.innerWidth - el.offsetWidth) / 2) / window.innerWidth * 100 - 1;
	h = ((window.innerHeight - el.offsetHeight) / 2) / window.innerHeight * 100 - 1;
	return [w, h];
}


/*  showing or hideing the big image display */

var sh_big = function(t, a, c) {

	if (typeof a !== 'undefined') {

		if (!isNaN(a)) {

			/*  showing a image out of folder  */

			botsi_content.classList.add('opc_dwn');
			dis_big.classList.remove('img_high');
			dis_big.classList.remove('display_big_ini');
			dis_big.style.borderColor = clicker.style.background = t.style.borderColor;

			dis_big.children[1].onload = function() {

				align_dis_big();

				var sc = parseInt(dis_big.children[1].src.substring(dis_big.children[1].src.length - 7, dis_big.children[1].src.length - 4));

				document.getElementById('p' + sc).scrollIntoView({
					block: "start",
					behavior: "smooth"
				});

				/* display text for image if specified */

				document.getElementById('txt_display').style.display = 'none';

				for (var i = 1; i < folder_text.length; i++) {
					if (parseInt(folder_text[i].substring(6, 8)) == sc) {
						document.getElementById('txt_display').style.background = dis_big.style.borderColor;
						document.getElementById('txt_display').innerHTML = folder_text[i].substring(9);
						document.getElementById('txt_display').style.display = 'block';
						break;
					}
				}



			};

			dis_big.children[1].src = t.src;

		} else {

			/*  hideing and reopen a other folder */

			t.parentNode.parentNode.previousSibling.innerHTML = t.innerHTML + '<span class="caret"></span>';

			botsi_content.innerHTML = ih = '';
			botsi_content.classList.remove('opc_dwn');
			lp.classList.add('display_big_ini');
			imagesloaded = false;

			folder_text = [];


			/* new way over invisible div by id in Kachelzeugs file  */

			if (document.getElementById('quad_galery_text_' + a)) {

				var ft = document.getElementById('quad_galery_text_' + a).innerText.split('\n');

				if (ft.length > 0) {

					folder_text[0] = '';

					for (var i = 0; i < ft.length; i++) {

						if (ft[i].substring(0, 5).toLowerCase() == 'photo') {

							folder_text.push(ft[i]);

						} else {

							folder_text[0] += ft[i] + '<br/>';

						}

					}

				}

				load_image(1, a, c);

			} else {

				console.log('no quad_galery_text');
				load_image(1, a, c);

			}





			/* old way over text file in party folder  */

			/*

						loadXMLDoc('../images/years/' + a + '/party.txt?zuza' + Math.floor(Math.random() * (1000) + 1), function() {

							if (xmlhttp.readyState == 4) {

								if (xmlhttp.status == 200) {

									var ft = xmlhttp.responseText.split('\n');

									if (ft.length > 0) {

										folder_text[0] = '';

										for (var i = 0; i < ft.length; i++) {

											if (ft[i].substring(0, 5).toLowerCase() == 'photo') {

												folder_text.push(ft[i]);

											} else {

												folder_text[0] += ft[i] + '<br/>';

											}

										}

									}

									load_image(1, a, c);

								} else {

									console.log('no party text (txt shit happens)');
									load_image(1, a, c);

								}
							}

						});

			*/

		}

	} else {

		/*  hideing and stay in current folder */

		botsi_content.classList.remove('opc_dwn');
		dis_big.classList.add('display_big_ini');
		dis_big.classList.remove('img_high');

	}

};

var align_dis_big = function() {

	dis_big.style.left = 0;

	var maxH = window.innerHeight / 100 * 96 - 80;

	dis_big.classList.add('img_high');
	var re = rech(dis_big.children[1]);
	dis_big.style.left = re[0] + 'vw';
	dis_big.style.top = re[1] + 'vh';

	clicker.style.marginTop = 'calc(' + parseInt(-re[1]) + 'vh - 80px)';

};


var arrow = function(e) {

	if (window.location.href.indexOf('bildergalerien') == -1 || dis_big.classList.contains('display_big_ini')) {
		return false;
	}

	if (!e) {

		e = window.event;

	}

	if (e.keyCode == 37 || e.keyCode == 39) {

		if (e.keyCode == 37) {

			//slide_lr(-1);
			var nn = parseInt(dis_big.children[1].src.slice(-7)) - 1;

		}

		if (e.keyCode == 39) {

			var nn = parseInt(dis_big.children[1].src.slice(-7)) + 1;

		}

		if (nn > dis_big.gal_max - 1) {
			nn = 1;
		}

		if (nn < 1) {
			nn = dis_big.gal_max - 1;
		}

		dis_big.children[1].src = dis_big.children[1].src.substring(0, dis_big.children[1].src.length - 7) + add_zeros(nn) + '.jpg';

	}

};


window.addEventListener('resize', function() {
	if (window.location.href.indexOf('bildergalerien') != -1) {
		align_dis_big();
	}
}, false);

document.addEventListener('keyup', function(evt) {
	arrow(evt);
}, false);



/*  start */

document.addEventListener("DOMContentLoaded", function(event) {

	if (window.location.href.indexOf('bildergalerien') == -1) {
		console.log('not bildergalerien');
		return false;
	}
	console.log('window.location.href ');

	/*  define elements and style them */

	botsi_content = document.querySelector("#botsi_content");

	lp = document.createElement('div');
	lp.id = 'lp';
	lp.classList.add('display_big_ini');
	botsi_content.parentNode.appendChild(lp);

	clicker = document.querySelector("#clicker");

	var dis_big = document.querySelector("#dis_big");
	dis_big.changeIhId;
	dis_big.job = 0;
	dis_big.gal_max = 1;

	dis_big.classList.add('display_big_ini');

	/*  adding eventlisteners to the big image display */

	dis_big.addEventListener('mouseover', function(evt) {
		clicker.style.display = 'block';
	}, false);

	dis_big.addEventListener('mouseout', function(evt) {
		clicker.style.display = 'none';
	}, false);

	dis_big.addEventListener('mousemove', function(evt) {
		clicker.style.display = 'block';
		var s = window.innerWidth / 100;
		clicker.style.left = evt.clientX - this.getBoundingClientRect().left - s + 'px';
		clicker.style.top = evt.clientY - s + 'px';
		clearTimeout(this.changeIhId);
		this.changeIhId = setTimeout(function() {

			var w = dis_big.offsetWidth - s * 2;

			if (parseInt(clicker.style.left) < w / 3) {
				if (dis_big.job != -1) {
					dis_big.job = -1;
					clicker.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
				}
			} else {
				if (parseInt(clicker.style.left) > w * 0.666) {
					if (dis_big.job != 1) {
						dis_big.job = 1;
						clicker.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
					}
				} else {
					if (dis_big.job != 0) {
						dis_big.job = 0;
						clicker.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
					}
				}
			}

		}, 20);
	}, false);

	dis_big.addEventListener('click', function(evt) {
		if (this.job == 0) {
			sh_big(this);
			/*
						var s = 80 + window.innerWidth / 50;
						clicker.style.left = evt.clientX - this.offsetLeft - s + 'px';
						clicker.style.top = evt.clientY - s - 80 + 'px';
			*/
		} else {
			var nn = parseInt(dis_big.children[1].src.slice(-7)) + this.job;

			if (nn > this.gal_max - 1) {
				nn = 1;
			}

			if (nn < 1) {
				nn = this.gal_max - 1;
			}

			dis_big.children[1].src = dis_big.children[1].src.substring(0, dis_big.children[1].src.length - 7) + add_zeros(nn) + '.jpg';

		}
	}, false);


	/*  load a array where all existinf folders are listed */


	loadXMLDoc('../botsi/inhalte.php?ordner=../images/years&zuza' + Math.floor(Math.random() * (1000) + 1), function() {

		if (xmlhttp.readyState == 4) {

			if (xmlhttp.status == 200) {

				var f = xmlhttp.responseText.split(' ').sort().reverse();

				var PATTERN = /_/;
				folders = f.filter(function(str) {
					return PATTERN.test(str);
				});

				/*  if every thing is fine, log the array for control and start talk (means filling the main window) */

				console.log(folders);

				talk();

			} else {

				console.log('get_images_array shit happens');

			}
		}

	});

});