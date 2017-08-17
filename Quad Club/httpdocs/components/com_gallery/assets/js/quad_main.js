function loadXMLDoc(ud, cfunc) {

	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = cfunc;

	xmlhttp.open("GET", ud, true);

	xmlhttp.send();

}

var isTouchSupported = function() {

	var msTouchEnabled = window.navigator.msMaxTouchPoints;

	var generalTouchEnabled = "ontouchstart" in document.createElement("div");

	if (msTouchEnabled || generalTouchEnabled) {

		return true;

	}

	return false;
};

var botsi_content, folders, folder_text, lp, clicker, jumptoimgID, img_path = '';

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


var get_cine_script = function() {

	var s = document.createElement('script');

	s.setAttribute("id", "cinema_scr");

	s.setAttribute("type", "text/javascript");

	s.setAttribute("charset", "utf-8");

	s.onload = function() {

		start_cine(dis_big);

	};

	s.onerror = function() {
		alert('cine err');
	};


	s.src = '../components/com_gallery/assets/js/cinema.js';

	document.getElementsByTagName('head')[0].appendChild(s);

};

var get_score_script = function() {

	if (!document.getElementById('score_scr')) {

		var s = document.createElement('script');

		s.setAttribute("id", "score_scr");

		s.setAttribute("type", "text/javascript");

		s.setAttribute("charset", "utf-8");

		s.onload = function() {

			talk();

		};

		s.onerror = function() {
			alert('score err');
		};

		s.src = '../components/com_gallery/assets/js/image_score.js';

		document.getElementsByTagName('head')[0].appendChild(s);

	} else {

		talk();

	}

};


var load_image = function(i, p, c) {

	if (disable_img_load == true) {
		disable_img_load = false;
		return;
	}


	if (i == 1) {

		if (document.getElementById('footer_pusher')) {
			document.getElementById('footer_pusher').style.height = 0;
			document.getElementById('tm-main').nextSibling.nextSibling.style.visibility = 'hidden';

		}

		for (var j = 0; j < folders.length; j++) {
			if (folders[j].name === p) {
				dis_big.gal_max = folders[j].count;
				break;
			}
		}

	}

	ni = new Image();

	ni.onload = function() {

		ih += '<img src="' + ni.src + '" onclick="sh_big_from_img(this,' + parseInt(ni.width / ni.height) + ')" style="border-color:' + c + ';"/><div class="positioner" id="p' + i + '"></div>';

		i++;

		if (i == 7) {

			botsi_content.innerHTML = ih;

			document.querySelector("#album_txt_display").innerHTML = (folder_text.length > 0) ? folder_text[0] : '';

			var fs = window.innerHeight * 0.98 - (botsi_content.children[botsi_content.children.length - 2].getBoundingClientRect().bottom + 80);
			ih = '';
			if (fs < 48) {
				fs = 48;
			}
			botsi_content.innerHTML += '<i id="wait_awe" style="color:' + c + ';font-size:' + fs + 'px;" class="fa fa-circle-o-notch fa-spin aria-hidden="true"></i>';
			botsi_content.classList.add("show_kacheln");

			actualize_menu(p, c);

		}

		if (i == dis_big.gal_max) {

			botsi_content.removeChild(document.querySelector("#wait_awe"));

			botsi_content.innerHTML += ih;

			/*
						setTimeout(function() {
						}, 500);
			*/
			push_down_footer();
			imagesloaded = true;


		}

		if (i < dis_big.gal_max) {
			load_image(i, p, c);
		}

	};

	ni.onerror = function() {

		console.log('error, dont know why ... i is: ', i);

	};

	ni.src = '../images/' + img_path + 'years/' + p + '/' + add_zeros(i) + '.jpg';

};


var build_menu = function(f) {
	if (document.getElementById('party_selector')) {
		return false;
	}
	var c = 0;
	var rep = document.createElement('div');
	rep.id = "party_selector";
	rep.setAttribute("val", "");
	rep.classList.add("dropdown");

	var o = '<li style="background:rgb(255,255,255);"><div onclick="change_from_menu(this)" val ="index">zurück zur Party Übersicht</div></li>';
	for (var i = 0; i < f.length; i++) {
		c++;
		if (c > 5) {
			c = 0;
		}
		o += '<li style="background:' + colors[c] + ';"><div onclick="change_from_menu(this)" val ="' + f[i].name + colors[c] + '">' + folder_to_date(f[i].name) + '</div></li>';
	}
	rep.innerHTML = '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Party auswählen<span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' + o + '</ul>';

	botsi_header.appendChild(rep);

	botsi_header.innerHTML += '<div id="album_txt_display"></div>';

};

var change_from_menu = function(a) {
	dis_big.classList.add('display_big_ini');
	r = a.getAttribute("val").split('rgb');
	a.parentNode.parentNode.setAttribute("val", r);
	if (r[0] == 'index') {
		//lp.classList.remove('display_big_ini');
		botsi_content.classList.remove('opc_dwn');
		talk('menu');
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

var replace_flyer_if_inex = function(t) {

	t.src = '../images/galery_sys/single_transp.png';

};

var come_lp = function(t, f, c) {

	var bend = '<img src="../images/' + img_path + 'years/' + f + '/000.jpg" onerror="replace_flyer_if_inex(this)" />';
	lp.innerHTML = bend;
	lp.onclick = function() {
		sh_big(t, f, c);
	};
	lp.style.background = c;





	lp.style.left = t.getBoundingClientRect().left + 'px';
	lp.style.top = t.offsetTop + 'px';
	lp.classList.remove('display_big_ini');
};

/*  filling the main window */

var talk = function(org) {

	/*  clear all content */



	botsi_header.style.display = 'none';
	botsi_content.style.marginTop = 0;

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
			ih += '<img src="' + ni.src + '" onmouseover="come_lp(this,\'' + folders[f].name + '\',\'' + colors[color] + '\')" style="border-color:' + colors[color] + ';"/>';
			f++;
			if (f < folders.length) {
				load_folder_image(f);
			} else {
				botsi_content.innerHTML += ih;
				botsi_content.classList.add("show_kacheln");

				push_down_footer();

				build_menu(folders);

				//  ok, folder images succesfully loaded, now prepare for slideshof if conditions are given

				if (isTouchSupported() && !document.getElementById('cinema_scr')) {
					get_cine_script();
				}

				console.log(location.search.slice(1));



				if (location.search.slice(1) != '' && org != 'menu') {

					for (var y = 0; y < botsi_content.children.length; y++) {
						if (botsi_content.children[y].src.indexOf('years/' + location.search.slice(1).split('&')[0] + '/001.jpg') != -1) {
							var el = botsi_content.children[y];
							break;
						}
					}
					sh_big(el, location.search.slice(1).split('&')[0], el.style.borderColor);

					clearInterval(jumptoimgID);

					jumptoimgID = setInterval(function() {

						if (imagesloaded) {

							clearInterval(jumptoimgID);

							document.getElementById('p' + parseInt(location.search.slice(1).split('&')[1])).scrollIntoView({
								block: "start",
								behavior: "smooth"
							});

						}

					}, 20);

				}


			}

		};

		ni.onerror = function() {
			//console.log('oki, done (error onload). f is: ', f);
		};

		if (document.getElementById('footer_pusher') && f == 0) {
			document.getElementById('footer_pusher').style.height = 0;
			console.log('footer_pusher 0');
			document.getElementById('tm-main').nextSibling.nextSibling.style.visibility = 'hidden';
		}

		ni.src = '../images/' + img_path + 'years/' + folders[f].name + '/001.jpg';
		var plak = new Image();
		plak.src = '../images/' + img_path + 'years/' + folders[f].name + '/000.jpg';

	};

	load_folder_image(f);

};

/*  push down footer (hack) */

var push_down_footer = function() {

	//	var tm_bot = botsi_content.children[botsi_content.children.length - 2].getBoundingClientRect().bottom - 180;
	var tm_bot = botsi_content.offsetHeight + botsi_content.offsetTop - 200;

	if (!document.getElementById('footer_pusher')) {

		var fp = document.createElement('div');

		fp.id = 'footer_pusher';

		fp.style.width = 0;

		document.getElementById('tm-main').parentNode.insertBefore(fp, document.getElementById('tm-main'));

		fp.style.height = tm_bot + 'px';

	} else {

		document.getElementById('footer_pusher').style.height = tm_bot + 'px';

	}

	document.getElementById('tm-main').nextSibling.nextSibling.style.visibility = 'visible';

};

/*  calculation helper function */

var rech = function(el) {
	w = ((window.innerWidth - el.offsetWidth) / 2) / window.innerWidth * 100 - 1;
	h = ((window.innerHeight - el.offsetHeight) / 2) / window.innerHeight * 100 - 1;
	return [w, h];
};


/*  showing or hideing the big image display */

var sh_big_from_img = function(t, a) {

	if (t.parentNode.classList.contains('opc_dwn')) {

		sh_big(t);

		return;

	}

	sh_big(t, a);

};


/*  showing or hideing the big image display */

var sh_big = function(t, a, c) {

	if (typeof a !== 'undefined') {

		if (!isNaN(a)) {

			/*  showing a image out of folder  */

			botsi_header.style.display = 'none';
			botsi_content.style.marginTop = 0;


			botsi_content.classList.add('opc_dwn');
			dis_big.classList.remove('img_high');
			dis_big.classList.remove('display_big_ini');
			dis_big.style.borderColor = clicker.style.background = t.style.borderColor;

			dis_big.children[1].onload = function() {

				align_dis_big();

				var nr = dis_big.children[1].src.substring(dis_big.children[1].src.length - 7, dis_big.children[1].src.length - 4);

				if (imagesloaded) {

					document.getElementById('p' + parseInt(nr)).scrollIntoView({
						block: "start",
						behavior: "smooth"
					});

				}

				/* display text for image if specified */

				var ft = parseInt(nr) + ' / ' + parseInt(dis_big.gal_max - 1);

				for (var i = 1; i < folder_text.length; i++) {
					if (parseInt(folder_text[i].substring(6, 8)) == parseInt(nr)) {
						ft = folder_text[i].substring(9);

						break;
					}
				}

				document.getElementById('txt_display').innerHTML = '<span>' + ft + '</span>';

				document.getElementById('txt_display').children[0].style.background = dis_big.style.borderColor;

				score.set(dis_big.children[1].src.substring(dis_big.children[1].src.length - 18, dis_big.children[1].src.length - 8), nr);

				//console.log('i set');

			};

			dis_big.children[1].src = t.src;

		} else {

			/*  hideing and reopen a other folder */

			botsi_header.style.display = 'flex';
			botsi_content.style.marginTop = '72px';

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

				//console.log('no quad_galery_text');
				load_image(1, a, c);

			}

		}

	} else {

		/*  hideing and stay in current folder */

		botsi_header.style.display = 'flex';
		botsi_content.style.marginTop = '72px';


		dis_big.children[1].src = '';
		botsi_content.classList.remove('opc_dwn');
		dis_big.classList.add('display_big_ini');
		dis_big.classList.remove('img_high');

	}

};

var align_dis_big = function() {

	dis_big.classList.add('img_high');

	dis_big.style.left = 0;

	var maxH = window.innerHeight / 100 * 98 - 80;

	var re = rech(dis_big.children[1]);
	dis_big.style.left = re[0] + 'vw';

	if (window.innerWidth < 960) {

		dis_big.style.top = re[1] + 'vh';

		if (!clicker.classList.contains('clicker_mobile')) {
			clicker.style.marginTop = 'calc(' + parseInt(-re[1]) + 'vh - 80px)';
		}

	} else {

		dis_big.style.top = 'calc(80px + 1vw)';

		if (!clicker.classList.contains('clicker_mobile')) {
			clicker.style.marginTop = 'calc(-160px - 1vw)';
		}

	}

};


var arrow = function(e) {

	if (window.location.href.indexOf(joomla_page) == -1 || dis_big.classList.contains('display_big_ini')) {
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
	if (window.location.href.indexOf(joomla_page) != -1) {
		align_dis_big();
	}
}, false);

document.addEventListener('keyup', function(evt) {
	arrow(evt);
}, false);



/*  start */

document.addEventListener("DOMContentLoaded", function(event) {

	if (window.location.href.indexOf(joomla_page) == -1) {
		//console.log('not bildergalerien');
		return false;
	}

	/*  define elements and style them */

	botsi_header = document.querySelector("#botsi_header");

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

	if (!isTouchSupported()) {

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

	} else {

		//clicker.style.display = 'none !important';
		clicker.classList.add('clicker_mobile');
		clicker.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';


		if (window.screen.availWidth < 560 && window.screen.availHeight < 668) {

			img_path = 'mobile/';

		}

	}

	dis_big.addEventListener('click', function(evt) {

		if (this.job == 0) {

			sh_big(this);

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


	/*  folders come from php */
	if (folders.length > 0) {
		get_score_script();
		console.log("joomla_page: ", joomla_page);
	} else {
		console.log("no folders found!");
	}

});