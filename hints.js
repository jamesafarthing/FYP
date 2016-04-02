var canvas2;
var ctx2;

function init(){
	canvas2 = document.getElementById("canvas2");
	ctx2 = canvas2.getContext("2d");
	drawLines();
}

function toggleHints(){
	if(document.getElementById("canvas2").style.display == "none"){
		document.getElementById("canvas2").style.display = "block";
		drawHints1();
		drawHints2();
		drawHints3();drawHints4();
	}
	else{
		document.getElementById("canvas2").style.display = "none";
	}
}

function drawLines(){
	ctx2.beginPath();
	
	ctx2.moveTo(0,0);
	ctx2.lineTo(0,400);
	
	ctx2.moveTo(375,0);
	ctx2.lineTo(375,400);
	
	ctx2.moveTo(750,0);
	ctx2.lineTo(750,400);
	
	ctx2.moveTo(1125,0);
	ctx2.lineTo(1125,400);
	
	ctx2.moveTo(1500,0);
	ctx2.lineTo(1500,400);
	
	ctx2.moveTo(0,0);
	ctx2.lineTo(1500,0);
	
	ctx2.moveTo(0,400);
	ctx2.lineTo(1500,400);
	ctx2.stroke();
}

function drawHints1(){
	ctx2.font = "30px Arial";
	ctx2.fillText("Conjunction Introduction",10,50);
}

function drawHints2(){
	ctx2.font = "30px Arial";
	ctx2.fillText("Implication Introduction",385,50);
}

function drawHints3(){
	ctx2.font = "30px Arial";
	ctx2.fillText("Negation",760,50);
}

function drawHints4(){
	ctx2.font = "30px Arial";
	ctx2.fillText("How to Drag and Drop",1135,50);
}

init();