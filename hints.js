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
		if(levelNum == 1 || levelNum == 2){
			drawHints1(hints2);
			drawHints4(hints1);
			reduceScore();
		} else if(levelNum == 3){
			drawHints1(hints2);
			drawHints4(hints1);
			drawHints2(hints3);
			reduceScore();
		}else if(levelNum == 4 || levelNum == 5){
			drawHints1(hints2);
			drawHints4(hints1);
			drawHints2(hints3);
			drawHints3(hints4);
			reduceScore();
		}else if(levelNum == 6){
			drawHints1(hints1);
			drawHints5(hints4);
			drawHints2(hints2);
			drawHints3(hints3);
			
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
	ctx2.font = "24px Arial";
	ctx2.fillText("The two statements on the top are",x,90);
	ctx2.fillText("assumed true. This means the",x,120);
	ctx2.fillText("statement on the bottom is true.",x,150);
	
	ctx2.drawImage(conin, x+42, 190, 271,154);
	
}

function drawHints2(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("Conjunction Elimination",x,50);
	ctx2.font = "24px Arial";
	ctx2.fillText("The conjunction on the top is",x,90);
	ctx2.fillText("assumed true. This means A and",x,120);
	ctx2.fillText("C are both indivdually true and",x,150);
	ctx2.fillText("this is shown by eliminating the",x,180);
	ctx2.fillText("conjunction",x,210);
	
	ctx2.drawImage(conel, x+42, 240, 271,154);
}

function drawHints3(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("Implication Introduction",x,50);
	ctx2.font = "24px Arial";
	ctx2.fillText("Implication Introduction means", x,90);
	ctx2.fillText("something assumed to be true", x,120);
	ctx2.fillText("later leads to something else",x,150);
	ctx2.fillText("to be true.", x,180);
	ctx2.drawImage(impin, x+42, 180, 275*0.9,233*0.9);
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

function drawHints5(x){
	ctx2.font = "30px Arial";
	ctx2.fillText("Implication Elimination",x,50);
	ctx2.font = "24px Arial"; 
	ctx2.fillText("A implies B being true means that", x,90);
	ctx2.fillText("if A is also true then B is", x,120);
	ctx2.fillText("true by Implication Elimination.",x,150);
	ctx2.drawImage(impel, x+42, 180, 271,154);
}

initial();