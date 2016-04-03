var canvas2;
var ctx2;
var hints1 = 10;
var hints2 = 385;
var hints3 = 760;
var hints4 = 1135;

function initial(){
	canvas2 = document.getElementById("canvas2");
	ctx2 = canvas2.getContext("2d");
	drawLines();
}

function toggleHints(){
	if(document.getElementById("canvas2").style.display == "none"){
		document.getElementById("canvas2").style.display = "block";
		if(levelNum == 1){
			//ctx2.clearRect(0,0, canvas2.width, canvas2.height);
			//drawLines();
			drawHints1(hints2);
			drawHints4(hints1);
			reduceScore();
		}
		else if(levelNum == 2){
			drawHints2(hints3);
			drawHints3(hints4);
			reduceScore();
		}
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

function drawHints1(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("Conjunction Introduction",x,50);
}

function drawHints2(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("Implication Introduction",x,50);
}

function drawHints3(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("Negation",x,50);
}

function drawHints4(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("How to Drag and Drop",x,50);
	ctx2.font = "24px Arial";
	ctx2.fillText("Move any proof structure onto",x,90);
	ctx2.fillText("dots that are at the top of a",x,120);
	ctx2.fillText("branch of the proof.",x,150);
	ctx2.fillText("A proof statement can be",x,200);
	ctx2.fillText("dragged onto any available dot.",x,230);
	ctx2.fillText("When the proof structure you are",x,280);
	ctx2.fillText("moving and a dot turns purple",x,310);
	ctx2.fillText("then these two elements will",x,340);
	ctx2.fillText("join when the mouse is released.",x,370);
}

initial();