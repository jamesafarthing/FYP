var levNum = 1;

function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	//console.log(popUpDivVar);
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-350;//150 is half popup's height
	popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-400;//400 is half popup's width
	popUpDiv.style.left = window_width + 'px';
}
function popup(windowname) {
	if (windowname == 'finish2'){
		toggle('blanket');
		toggle('finish');
		blanket_size('finish');
		window_pos('finish');
		play();
		levelNum = 1;
		userScore = 0;
	} else if (windowname == 'done'){
		//toggle('finish');
		blanket_size('finish');
		window_pos('finish');
		skip('finish','start');
	}
	else {
		toggle('blanket');
		toggle(windowname);	
		blanket_size(windowname);
		window_pos(windowname);
	}
	
}

function level(off,windowname){
	document.getElementById("canvas2").style.display = "none";
	blanket_size(windowname + levelNum);
	window_pos(windowname  + levelNum);
	toggle(off);
	if (levelNum == 3 && off =='correct'){
		toggle('blanket');
		popup('conelim');
	} else if (levelNum == 4 && off =='correct') {
		toggle('blanket');
		popup('impintro');
	}else if (levelNum == 6 && off =='correct') {
		toggle('blanket');
		popup('impelim');
	} else if (levelNum == endLevel) {
		toggle('blanket');
		popup('finish')
	} else{
		toggle(windowname + levelNum);
	}
	
}

function skip(off,windowname){
	userScore = 0;
	levelNum = 1;
	blanket_size(windowname);
	window_pos(windowname);
	toggle(off);
	toggle(windowname);	
}