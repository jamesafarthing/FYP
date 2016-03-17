var canvas;
var ctx;
var x = 75;
var y = 50;
var WIDTH = 1500;
var HEIGHT = 1000;
var dragok = false;
var r = [];
var dotsArray = [];
var move;
var border = "black";
var taken = false;
var text = [];
var type = 0; //0 is variable, 1 is operator, 2, 3, 4, 5 are forms
var levelNum = 0;
var conclusion = "";
var proofHeight = 2;
var connection = -1;
var dotNumber = 0;
var xPos = 0;
var yPos = 0;

function dot(number){
	this.number = number;
	this.xPos = 0;
	this.yPos = 0;
	this.colour = "black";
	this.formula = "";
}

function object(x, y, w, h, text, type, dots) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.border = border;
	this.taken = taken;
	this.text = text;
	this.type = type;
	this.proofHeight = 2;
	this.connection = -1;
	this.dots = dots;
}

function createTwoUpOneDown(){
	dot1 = dotNumber++;
	dot2 = dotNumber++;
	dot3 = dotNumber++;
	r.push(new object(355, 600, 100, 100, [dot1, dot2, dot3, "%"], 2, [dot1, dot2, dot3]));
	//r.push(new object(355, 600, 100, 100, [0, 1, 2, "%"], 2));
	dotsArray.push(new dot(dot1));
	dotsArray.push(new dot(dot2));
	dotsArray.push(new dot(dot3));
	//window.alert(r[0].text.toString());
} 
function createTwoUpTwoDown() {
	r.push(new object(355, 500, 100, 100, ["•", "•", "•", "•"], 3));
}
function createOneUpTwoDown() {
	r.push(new object(355, 500, 100, 100, ["•", "%", "•", "•"], 4));
}
function createOneUpOneDown() {
	dot1 = dotNumber++;
	dot2 = dotNumber++;
	//r.push(new object(355, 500, 100, 100, ["•", "%", "•", "%"], 5));
	r.push(new object(355, 500, 100, 100, [dot1, "%", dot2, "%"], 5, [dot1, dot2]));
	dotsArray.push(new dot(dot1));
	dotsArray.push(new dot(dot2));
}
function createA(){
	r.push(new object(55,  55,  100, 100, ["A", "none", "none", "none"], 0, []));
} 
function createB(){
	r.push(new object(155, 55,  100, 100, ["B", "none", "none", "none"], 0, []));
} 
function createC(){
	r.push(new object(255, 55,  100, 100, ["C", "none", "none", "none"], 0, []));
} 
function createConjunction(){
	r.push(new object(355, 55,  100, 100, ["∧", "none", "none", "none"], 1, []));
}
function createImplication(){
	r.push(new object(455, 55,  100, 100, ["→", "none", "none", "none"], 1, []));
}

function levelText(){
	if (levelNum == 1) {
		document.getElementById("level").innerHTML = "Level 1: The goal is to create A ∧ B. <br> This uses Conjunction Introduction.";
	}
	else if (levelNum == 2) {
		document.getElementById("level").innerHTML = "Level 2: The goal is to create B using A, B and →. Assume A is true. <br> This uses Implication Elimination.";
	}
	else if (levelNum == 3) {
		document.getElementById("level").innerHTML = "Level 3: The goal is to create A → C using A, B, C and →.";
	}
	else if (levelNum == 4) {
		document.getElementById("level").innerHTML = "Level 4: The goal is to create (A ∧ B) → C using A, B, C, ∧, →.";
	}
	else if (levelNum > 4){
		levelNum = 1;
	}
}

function deleteAll(){
	r.splice(0,r.length);
	dotsArray.splice(0,dotsArray.length);
	dotNumber = 0;
}

function rect(x,y,w,h) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	levelNum = 1;
	levelText();
	return setInterval(drawIterate, 10);
}

function dotsIterate(dotNumber, updatedX, updatedY) {
	dotsArray[dotNumber].xPos = updatedX;
	dotsArray[dotNumber].yPos = updatedY;
	ctx.fillStyle = dotsArray[dotNumber].colour;
}

//***** TO DO *****
// 
//	YES 1) Input numbers instead of dots and create an element of the dot array
//	YES 2) Put conditionals in to make sure that when numbers appear then they are rendered as dots in the proof tree.
//	YES 3) Start to put in logic that will set the colour of the dot to change when a proof is dragged over it.
//	YES	4) Add text instead of the dot when statements added to it.
//		5) Implement for one up one down.
//		6) Stop highlighting once dot has been removed.
//		7) Allow proof structures to be merged together. 
//
//*****************

function drawIterate() {
	clear();
	levelText();
	var bin = document.getElementById("bin");
	var brackets = document.getElementById("brackets");
	var premise = document.getElementById("premise");
    ctx.drawImage(bin, WIDTH-110, HEIGHT-138, 110, 138); 
	ctx.drawImage(brackets, 0, HEIGHT-100, 100, 100); 
	ctx.drawImage(premise, WIDTH-150, 0, 150, 75);
	for (i = 0; i < r.length ; i++) {
		draw(r[i].x, r[i].y, r[i].w, r[i].h, i, r[i].border, r[i].text, r[i].proofHeight);
		//drawConnections(r[i].connection);
	}
}

function drawConnections(connection){
	if (connection != -1){
		ctx.strokeStyle = "grey";
		ctx.beginPath();
		ctx.moveTo (r[i].x - r[i].w/2,r[i].y - r[i].h/2);
		ctx.lineTo(r[connection].x,(r[connection].y + (r[connection].h/2))); 
		ctx.stroke();	
	}
	
}

function colourReplace(border, colour, i, lines) {
	if (border != "ignore") {
		if (border == colour && i != move) {
			if (lines == true) {
				ctx.strokeStyle = border;
			}
			ctx.fillStyle = border;
		} else {
			ctx.strokeStyle = "black";
			ctx.fillStyle = "black";
		}
	}
}

function draw(x, y, w, h, i, border, text, ph) {
	ctx.fillStyle = "#FAF7F8";
	rect(x-(w/2), y-(h/2), w, h);
	ctx.strokeStyle = border;
	ctx.lineWidth=3;
	ctx.stroke();
	ctx.font="32px Georgia";
	ctx.fillStyle = "#444444";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	//ctx.strokeStyle = "black";
	if (text[2] == "none") { //Figures out whether it is a form or a var/operator.
		r[i].w = Math.max(50, text[0].length * 30);
		r[i].h = 50;
		ctx.textAlign = "center";
		ctx. fillText(text[0], x, y);
	}
	else {
		multiLineDrawing(x, y, w, h, i, border, text, ph);
	}
}

function multiLineDrawing(x, y, w, h, i, border, text, ph){
	if (ph == 2) {
			ctx.strokeStyle = "black";
			drawLines(x,y,w,h, h/(ph*2), text, border);
		}
	if (ph == 3) {
		ctx.font="28px Georgia";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		drawLines(x,y+h/6,w,h, h/(ph*2), text, border);
		
		//left branch			
		if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
			//colourReplace(border, "yellow", i, true);
			if (text[1] != "%"){
				drawLines(x-w/4,y-h/6,w/2,h/3, h/(ph*2), text[0], "ignore");
			}
			else {
				drawLines(x,y-h/6,w,h/3, h/6, text[0], "ignore");
			}
		}
		//right branch
		if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			drawLines(x+w/4,y-h/6,w/2,h/3, h/(ph*2), text[1], "ignore");
		}
	}
	if (ph == 4) {
		ctx.font="24px Georgia";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		drawLines(x,y+h/4,w,h, h/(ph*2), text, border);
		
		//left branch
		if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
			//colourReplace(border, "yellow", i, true);
			if (text[1] != "%") {
				drawLines(x-w/4,y,w/2,h/2, h/(ph*2), text[0], "ignore");
			}
			else {
				drawLines(x,y,w,h/2, h/(ph*2), text[0], "ignore");
			}
		}
		//right branch
		if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			drawLines(x+w/4,y,w/2,h/2, h/(ph*2), text[1], "ignore");
		}	
		//left left branch
		if ((typeof text[0][0] !== 'string' && typeof text[0][0] !== 'number') && text[0][0] !== undefined){
			//colourReplace(border, "yellow", i, true);
			if(text[0][1] != "%" && text[1] != "%"){
				drawLines(x-(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][0], "ignore");
			}
			else if (text[0][1] != "%" || text[1] != "%") {
				drawLines(x-w/4,y-h/4,w/2,h/4, h/(ph*2), text[0][0], "ignore");
			}
			else {
				drawLines(x,y-h/4,w,h/4, h/(ph*2), text[0][0], "ignore");
			}
			
		} 
		
		// left right branch
		if ((typeof text[0][1] !== 'string' && typeof text[0][1] !== 'number') && text[0][1] !== undefined){
			//colourReplace(border, "yellow", i, true);
			drawLines(x-(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][1], "ignore");
		}
		//right left branch
		if ((typeof text[1][0] !== 'string' && typeof text[1][0] !== 'number') && text[1][0] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			if(text[1][1] != "%"){
				drawLines(x+(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][0], "ignore");
			}
			else{
				drawLines(x+w/4,y-h/4,w/2,h/4, h/(ph*2), text[1][0], "ignore");
			}
		} 
		
		//right right branch
		if ((typeof text[1][1] !== 'string' && typeof text[1][1] !== 'number') && text[1][1] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			drawLines(x+(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][1], "ignore");
		}
	}
	if (ph > 4) {
		ctx.font="24px Georgia";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		drawLines(x,y+h/4,w,h, h/(ph*2), text, border);
		
		//left branch
		if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
			//colourReplace(border, "yellow", i, true);
			if (text[1] != "%") {
				drawLines(x-w/4,y,w/2,h/2, h/(ph*2), text[0], "ignore");
			}
			else {
				drawLines(x,y,w,h/2, h/(ph*2), text[0], "ignore");
			}
		}
		//right branch
		if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			drawLines(x+w/4,y,w/2,h/2, h/(ph*2), text[1], "ignore");
		}	
		//left left branch
		if ((typeof text[0][0] !== 'string' && typeof text[0][0] !== 'number') && text[0][0] !== undefined){
			//colourReplace(border, "yellow", i, true);
			if(text[0][1] != "%" && text[1] != "%"){
				drawLines(x-(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][0], "ignore");
				drawExtraBoxes(x -((3*w)/8), y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][0], ph-3, w/4);
			}
			else if (text[0][1] != "%" || text[1] != "%") {
				drawLines(x-w/4,y-h/4,w/2,h/4, h/(ph*2), text[0][0], "ignore");
				drawExtraBoxes(x-w/4, y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][0], ph-3, w/2);
			}
			else {
				drawLines(x,y-h/4,w,h/4, h/(ph*2), text[0][0], "ignore");
				drawExtraBoxes(x, y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][0], ph-3, w);
			}
			
		} 
		
		// left right branch
		if ((typeof text[0][1] !== 'string' && typeof text[0][1] !== 'number') && text[0][1] !== undefined){
			//colourReplace(border, "yellow", i, true);
			if(text[0][1] != "%" && text[1] != "%"){
				drawLines(x-(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][1], "ignore");
				drawExtraBoxes(x -((1*w)/8), y-h/4-h/(ph*2), x-w/2, y-h/2-200, 
					Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
					text[0][1], ph-3, w/4);
			}
			else if (text[0][1] != "%" || text[1] != "%") {
				drawLines(x+w/4,y,w/2,h/2, h/(ph*2), text[0][1], "ignore");
				drawExtraBoxes(x +(w/4), y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][1], ph-3, w/2);
			}
			else {
				drawLines(x,y-h/4,w,h/4, h/(ph*2), text[0][0], "ignore");
				drawExtraBoxes(x, y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][1], ph-3, w);
			}
		}
		//right left branch
		if ((typeof text[1][0] !== 'string' && typeof text[1][0] !== 'number') && text[1][0] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			if(text[1][1] != "%"){
				drawLines(x+(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][0], "ignore");
				drawExtraBoxes(x +((1*w)/8), y-h/4-h/(ph*2), x+w/2, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[1][0], ph-3, w/4);
			}
			else{
				drawLines(x+w/4,y-h/4,w/2,h/4, h/(ph*2), text[1][0], "ignore");
				drawExtraBoxes(x + w/4, y-h/4-h/(ph*2), x+w/2, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[1][0], ph-3, w/2);
			}
		} 
		
		//right right branch
		if ((typeof text[1][1] !== 'string' && typeof text[1][1] !== 'number') && text[1][1] !== undefined){
			//colourReplace(border, "deeppink", i, true);
			drawLines(x+(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][1], "ignore");
			drawExtraBoxes(x +((3*w)/8), y-h/4-h/(ph*2), x+w/2+200, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[1][1], ph-3, w/4);
		}
	}
	r[i].h = Math.min(ph*75, 400);
}

function drawExtraBoxes(beginX, beginY, x,y, w, h, i, border, text, ph, width) {
	if (typeof text[0] !== 'string' && text[0] !== undefined){
		ctx.beginPath();
		if (text[1] != "%"){
			ctx.moveTo (beginX - width/4,beginY);
		}
		else{
			ctx.moveTo (beginX,beginY);
		}
		ctx.lineTo(x,y);
		ctx.stroke();
		draw(x, y, w, h, i, border, text[0], ph);
	}
	if (typeof text[1] !== 'string' && text[1] !== undefined){
		ctx.beginPath();
		ctx.moveTo (beginX + width/4,beginY);
		ctx.lineTo(x,y-300);
		ctx.stroke();
		draw(x, y-300, w, h, i, border, text[1], ph);
	}
}

function drawLines(x,y,w,h,dist,text,colour) {
	r[i].w = Math.min(600, Math.max((text[0].toString().length + text[1].toString().length)*40, (text[2].toString().length + text[3].toString().length)*40, 100, Math.pow(2, r[i].proofHeight) * 50)); //Sets box size
	//ctx.fillStyle = "#444444";
	ctx.beginPath();
	ctx.moveTo (x -((3*w)/8), y);
	ctx.lineTo( x + ((3*w)/8) , y); //Draws middle line for the proof
	ctx.stroke();
	
	ctx.textAlign = 'center'; //Draws text in the various boxes in the correct positions.
	ctx.textBaseline = 'middle';
	if(text[0] != "%" && text[1] != "%" && (typeof text[0] === 'string' || typeof text[0] === 'number')) {
		//colourReplace(colour, "yellow", i, false);
		ctx.fillStyle = "black";
		if(typeof text[0] === 'number'){
			if (dotsArray[text[0]].formula != ""){
				temp = dotsArray[text[0]].number;
				text[0] = dotsArray[text[0]].formula;
				ctx.fillText(text[0], x-(w/4), y-dist);
				dotsArray[temp].number = "deleted";
			}
			else {
				dotsIterate(text[0], x-(w/4), y-dist);
				ctx.fillText("•", x-(w/4), y-dist);
			}
		}
		else {
			ctx.fillText(text[0], x-(w/4), y-dist);	
		}			
	} else if (text[0] != "%" && (typeof text[0] === 'string' || typeof text[0] === 'number')) {
		ctx.fillStyle = "black";
		if(typeof text[0] === 'number'){
			if (dotsArray[text[0]].formula != ""){
				temp = dotsArray[text[0]].number;
				text[0] = dotsArray[text[0]].formula;
				ctx.fillText(text[0], x, y-dist);
				dotsArray[temp].number = "deleted";
			}
			else {
				dotsIterate(text[0], x, y-dist);
				ctx.fillText("•", x, y-dist);
			}
		}
		else {
			ctx.fillText(text[0], x, y-dist);
		}
	}
	
	if(text[1] != "%" && (typeof text[1] === 'string' || typeof text[1] === 'number')){
		//colourReplace(colour, "deeppink", i, false);
		ctx.fillStyle = "black";		
		if(typeof text[1] === 'number'){
			if (dotsArray[text[1]].formula != ""){
				temp = dotsArray[text[1]].number;
				text[1] = dotsArray[text[1]].formula;
				ctx.fillText(text[1], x+(w/4), y-dist);
				dotsArray[temp].number = "deleted";
			}
			else {
				dotsIterate(text[1], x+(w/4), y-dist);
				ctx.fillText("•", x+(w/4), y-dist);
			}
		}
		else {
			ctx.fillText(text[1], x+(w/4), y-dist);
		}
	}
	
	if(text[2] != "%" && text[3] != "%" && (typeof text[2] === 'string' || typeof text[2] === 'number')) {
		//colourReplace(colour, "olive", i, false);
		ctx.fillStyle = "black";
		if(typeof text[2] === 'number'){
			if (dotsArray[text[2]].formula != ""){
				temp = dotsArray[text[2]].number;
				text[2] = dotsArray[text[2]].formula;
				ctx.fillText(text[2], x-(w/4), y+dist);
				dotsArray[temp].number = "deleted";
			}
			else {
				dotsIterate(text[2], x-(w/4), y+dist);
				ctx.fillText("•", x-(w/4), y+dist);
			}
		}
		else {
			ctx.fillText(text[2], x-(w/4), y+dist);
		}	
	} else if (text[2] != "%" && (typeof text[2] === 'string' || typeof text[2] === 'number')){
		//colourReplace(colour, "LightBlue", i, false);
		ctx.fillStyle = "black";
		if(typeof text[2] === 'number'){
			if (dotsArray[text[2]].formula != ""){
				temp = dotsArray[text[2]].number;
				text[2] = dotsArray[text[2]].formula;
				ctx.fillText(text[2], x, y+dist);
				dotsArray[temp].number = "deleted";
			}
			else {
				dotsIterate(text[2], x, y+dist);
				ctx.fillText("•", x, y+dist);
			}
		}
		else {
			ctx.fillText(text[2], x, y+dist);
		}
	}
	
	if(text[3] != "%" && (typeof text[3] === 'string' || typeof text[3] === 'number')) {
		//colourReplace(colour, "LightBlue", i, false);
		ctx.fillStyle = "black";
		if(typeof text[3] === 'number'){
			if (dotsArray[text[3]].formula != ""){
				temp = dotsArray[text[3]].number;
				text[3] = dotsArray[text[3]].formula;
				ctx.fillText(text[3], x+(w/4), y+dist);
				dotsArray[temp].number = "deleted";
			}
			else {
				dotsIterate(text[3], x+(w/4), y+dist);
				ctx.fillText("•", x+(w/4), y+dist);
			}
		}
		else {
			ctx.fillText(text[3], x+(w/4), y+dist);
		}
	}
}

function doneCheck() { //Checks to see if the code is correct and fill it in.
	if(levelNum == 1) {
		if (r[i].text == "A,B,∧,%" || r[i].text == "A,B,A ∧ B,%") {
			r[i].text[2] = "A ∧ B";
			return true;
		}
		else if (r[i].text == "B,A,∧,%" || r[i].text == "B,A,B ∧ A,%") {
			r[i].text[2] = "B ∧ A";
			return true;
		}
		else {
			return false;
		}
	}
	else if(levelNum == 2) {
		if (r[i].text == "A → B,A,B,%" || r[i].text == "A,A → B,B,%") {
			return true;
		}
		else {
			return false;
		}
	}
	else if (levelNum == 3){
		if (r[i].text == "A → B,B → C,→,%" || r[i].text == "B → C,A → B,→,%") {
			r[i].text[2] = "A → C";
			return true;
		}
		else if (r[i].text == "A → B,B → C,A → C,%" || r[i].text == "B → C,A → B,A → C,%") {
			return true;
		}
		else {
			return false;
		}
	}
	else if (levelNum == 4){
		if (r[i].text == "A,B,A ∧ B,%,C,(A ∧ B) ∧ C,%") {
			return true; 0
		}
		else {
			return false;
		}
	}
}

function delShape(i, move) {
	r[i].border = "black";
	r[i].taken = false;
	if (r[i].connection == -1) {
		if (move > r[move].connection){
		r[i].connection = r[move].connection;
		}
		else {
				r[i].connection = r[move].connection -1;
		}
	}
	var done = doneCheck();
	r.splice(move,1);
	if (done == true) {
		drawIterate();
		drawIterate();
		window.alert("Congratulations! Level " + levelNum + " Complete.");
		levelNum++;
		deleteAll();
	}
}

function validMoveTopLeft() {
	if (r[i].type == 1 || r[i].type == 0) {
		r[i].text[0] = r[move].text[0] + " " + r[i].text[0];
		delShape(i, move);
	}
	else if (r[i].type == 2 || r[i].type == 3 || r[i].type == 4 || r[i].type == 5) {
		if (r[move].type == 2 || r[move].type == 5){
			if(r[move].text[2] == "•") {
				r[move].text[2] = r[i].text[0];
			}
			//if(r[move].proofHeight == 4 && r[i].connection == -1) {
			//	r[i].text[0] = "line: " + r[i].text[0];
			//	r[move].text[2] = "line: " + r[move].text[2];
			//	r[i].connection = move;
			//	window.alert("NO NO NO");
			//}
			//else {
				r[i].text[0] = r[move].text;
				r[i].proofHeight = Math.max(r[move].proofHeight + 1, r[i].proofHeight);
				delShape(i, move);
			//}
		}
		else if (r[move].type == 1 || r[move].type == 0) {
			if (r[i].text[0] == "•" || typeof r[i].text[0] !== 'string'){
				r[i].text[0] = r[move].text[0];
				delShape(i, move);
			}
			else {
				r[i].text[0] = r[i].text[0] + " " + r[move].text[0];
				delShape(i, move);
			}
		}
		else {
			window.alert("This is not a valid move!");
		}
	}
	else {
		window.alert("This is not a valid move!");
	}
}

function validMoveTopRight() {
	if (r[i].type == 1 || r[i].type == 0) {
		r[i].text[0] = r[i].text[0] + " " + r[move].text[0];
		delShape(i, move);
	}
	else if (r[i].type == 2 || r[i].type == 3) {
		if(r[move].type == 2 || r[move].type == 5) {
			if(r[move].text[2] == "•") {
				r[move].text[2] = r[i].text[1];
			}
			//if(r[move].proofHeight == 4) {
				//window.alert("NO NO NO");
			//}
			//else {
				r[i].text[1] = r[move].text;
				r[i].proofHeight = Math.max(r[move].proofHeight + 1, r[i].proofHeight);
				delShape(i, move);
			//}
		}
		else if (r[move].type == 1 || r[move].type == 0) {
			if(r[i].text[1] == "•" || typeof r[i].text[1] !== 'string'){
				r[i].text[1] = r[move].text[0];
				delShape(i, move);
			}
			else {
				r[i].text[1] = r[i].text[1] + " " + r[move].text[0];
				delShape(i, move);
			}
		}
		else {
			window.alert("This is not a valid move!");
		}
	}
	else if (r[i].type == 4) {
		if(r[move].type == 2) {
			r[i].text[0] = r[move].text[2];
			delShape(i, move);
		}
		else if (r[move].type == 1 || r[move].type == 0) {
			if(r[i].text[0] == "•"){
				r[i].text[0] = r[move].text[0];
				delShape(i, move);
			}
			else {
				r[i].text[0] = r[i].text[0] + " " + r[move].text[0];
				delShape(i, move);
			}
		}
		else {
			window.alert("This is not a valid move!");
		}
	}
	else {
		window.alert("This is not a valid move!");
	}
}

function validMoveBottomLeft() {
	if (r[i].type == 2 || r[i].type == 3 || r[i].type == 4 || r[i].type == 5) {
		if(r[move].type == 4 || r[move].type == 5) {
			r[i].text[2] = r[move].text[0];
			delShape(i, move);
		}
		else if (r[move].type == 1 || r[move].type == 0) {
			if (r[i].text[2] == "•") {
				r[i].text[2] = r[move].text[0];
				delShape(i, move);
			}
			else {
				r[i].text[2] = r[i].text[2] + " " + r[move].text[0];
				delShape(i, move);
			}
		}
		else {
			window.alert("This is not a valid move!");
		}
	}
	else {
		window.alert("This is not a valid move!");
	}
}

function validMoveBottomRight() {
	if (r[i].type == 2 || r[i].type == 5) {
		if(r[move].type == 4) {
			r[i].text[2] = r[move].text[0];
			delShape(i, move);			
		}
		else if (r[move].type == 1 || r[move].type == 0) {
			if (r[i].text[2] == "•") {
				r[i].text[2] = r[move].text[0];
				delShape(i, move);
			}
			else {
				r[i].text[2] = r[i].text[2] + " " + r[move].text[0];
				delShape(i, move);
			}
		}
	}
	else if (r[i].type == 3 || r[i].type == 4) {
		if(r[move].type == 4) {
			r[i].text[3] = r[move].text[0];
			delShape(i, move);			
		}
		else if (r[move].type == 1 || r[move].type == 0) {
			if (r[i].text[3] == "•") {
				r[i].text[3] = r[move].text[0];
				delShape(i, move);
			}
			else {
				r[i].text[3] = r[i].text[3] + " " + r[move].text[0];
				delShape(i, move);
			}
		}
		else {
			window.alert("This is not a valid move!");
		}
	}
	else {
		window.alert("This is not a valid move!");
	}
}

function insertFormula(i){
	if (r[move].text[1] == "none"){
		dotsArray[i].formula = r[move].text[0];
	}
	r.splice(move,1);
}

function myMove(e){
	if (dragok){
		r[move].x = e.pageX - canvas.offsetLeft;
		r[move].y = e.pageY - canvas.offsetTop;
		
		for (i = 0; i < Math.max(1,dotsArray.length); i++){
			if (dotsArray.length > 0){
				if (dotsArray[i].number != "deleted"){
					if (r[move].dots.toString().indexOf(i.toString()) == -1){	
						if ((r[move].x - (r[move].w/2) < dotsArray[i].xPos) && (r[move].x + (r[move].w/2) > dotsArray[i].xPos)
							&& (r[move].y - (r[move].h/2) < dotsArray[i].yPos) && (r[move].y + (r[move].h/2) > dotsArray[i].yPos)){
							r[move].border = "BlueViolet";
							dotsArray[i].colour = "BlueViolet";
							//r[move].taken = true;
							break;
						}
					}
				}
			}
			if (r[move].x + (r[move].w/2) >= WIDTH-110 && r[move].y + (r[move].h/2) >= HEIGHT-138) {
				r[move].border = "Navy";
			}
			else if (r[move].x - (r[move].w/2) <= 100 && r[move].y + (r[move].h/2) >= HEIGHT-100) {
				r[move].border = "Crimson";
			}
			else if (r[move].x + (r[move].w/2) >= WIDTH-150  && r[move].y - (r[move].h/2) <= 100) {
				r[move].border = "Chocolate";
			}
			else {
				r[move].border = "black";
				dotsArray[i].colour = "black";
				//r[move].taken = false;
			}
		}
		
		
		for(i = 0; i < r.length; i ++) { //Cycle through static elements
			
			if (i != move && r[i].taken == r[move].taken && //Move over bottom left
			(((r[i].x - (r[i].w/2)) < (r[move].x + (r[move].w/2))) && ((r[move].x) < r[i].x)) 
			&& ((r[move].y -(r[move].h/2)) < (r[i].y + (r[i].h/2))) 
			&& ((r[move].y -(r[move].h/2)) >= r[i].y - (r[i].h/2))
			&& (r[move].x <= r[i].x && r[move].y > r[i].y)) {
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "green";
					r[move].border = "green";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == r[move].taken && //Move over bottom right
			((r[i].x < (r[move].x + (r[move].w/2))) && ((r[move].x - (r[move].w/2)) < (r[i].x + (r[i].w/2)))) 
			&& ((r[move].y -(r[move].h/2)) < (r[i].y + (r[i].h/2))) 
			&& ((r[move].y -(r[move].h/2)) >= r[i].y - (r[i].h/2))
			&& (r[move].x > r[i].x && r[move].y > r[i].y)) {
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "red";
					r[move].border = "red";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == r[move].taken && //Move over top right
				((r[i].x < r[move].x) && ((r[move].x - (r[move].w/2)) < (r[i].x + (r[i].w/2))))
				&& ((r[move].y + (r[move].h/2)) > (r[i].y -(r[i].h/2)))
				&& ((r[move].y + (r[move].h/2)) <= r[i].y + (r[i].h/2))
				&& (r[move].x > r[i].x && r[move].y <= r[i].y)){
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "red";
					r[move].border = "red";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == r[move].taken && //Move over top left
				(((r[i].x - (r[i].w/2)) < (r[move].x + (r[move].w/2))) && ((r[move].x - (r[move].w/2)) < r[i].x))
				&& ((r[move].y + (r[move].h/2)) > (r[i].y -(r[i].h/2)))
				&& ((r[move].y + (r[move].h/2)) <= r[i].y + (r[i].h/2))
				&& (r[move].x <= r[i].x && r[move].y <= r[i].y)){
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "green";
					r[move].border = "green";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == true && r[move].taken == true) { //If it over none of the squares
				r[i].border = "black";
				r[move].border = "black";
				r[i].taken = false;
				r[move].taken = false;
			}
		}
	}
}

function myMove2(e){ //Runs when an object is being moved
	if (dragok){
		r[move].x = e.pageX - canvas.offsetLeft;
		r[move].y = e.pageY - canvas.offsetTop;
		
		for(i = 0; i < r.length; i ++) { //Cycle through static elements
			
			if (i != move && r[i].taken == r[move].taken && //Move over bottom left
			(((r[i].x - (r[i].w/2)) < (r[move].x + (r[move].w/2))) && ((r[move].x) < r[i].x)) 
			&& ((r[move].y -(r[move].h/2)) < (r[i].y + (r[i].h/2))) 
			&& ((r[move].y -(r[move].h/2)) >= r[i].y - (r[i].h/2))
			&& (r[move].x <= r[i].x && r[move].y > r[i].y)) {
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "green";
					r[move].border = "green";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
				else if (r[i].type == 2 || r[i].type == 5) {
					r[i].border = "LightBlue";
					r[move].border = "LightBlue";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
				else if (r[i].type == 3 || r[i].type == 4) {
					r[i].border = "olive";
					r[move].border = "olive";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == r[move].taken && //Move over bottom right
			((r[i].x < (r[move].x + (r[move].w/2))) && ((r[move].x - (r[move].w/2)) < (r[i].x + (r[i].w/2)))) 
			&& ((r[move].y -(r[move].h/2)) < (r[i].y + (r[i].h/2))) 
			&& ((r[move].y -(r[move].h/2)) >= r[i].y - (r[i].h/2))
			&& (r[move].x > r[i].x && r[move].y > r[i].y)) {
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "red";
					r[move].border = "red";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
				else if (r[i].type == 2 || r[i].type == 3 || r[i].type ==4 || r[i].type ==5) {
					r[i].border = "LightBlue";
					r[move].border = "LightBlue";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == r[move].taken && //Move over top right
				((r[i].x < r[move].x) && ((r[move].x - (r[move].w/2)) < (r[i].x + (r[i].w/2))))
				&& ((r[move].y + (r[move].h/2)) > (r[i].y -(r[i].h/2)))
				&& ((r[move].y + (r[move].h/2)) <= r[i].y + (r[i].h/2))
				&& (r[move].x > r[i].x && r[move].y <= r[i].y)){
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "red";
					r[move].border = "red";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
				else if (r[i].type == 2 || r[i].type == 3) {
					r[i].border = "deeppink";
					r[move].border = "deeppink";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
				else if (r[i].type == 4 || r[i].type == 5) {
					r[i].border = "yellow";
					r[move].border = "yellow";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == r[move].taken && //Move over top left
				(((r[i].x - (r[i].w/2)) < (r[move].x + (r[move].w/2))) && ((r[move].x - (r[move].w/2)) < r[i].x))
				&& ((r[move].y + (r[move].h/2)) > (r[i].y -(r[i].h/2)))
				&& ((r[move].y + (r[move].h/2)) <= r[i].y + (r[i].h/2))
				&& (r[move].x <= r[i].x && r[move].y <= r[i].y)){
				if (r[i].type == 0 || r[i].type == 1) {
					r[i].border = "green";
					r[move].border = "green";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
				else if (r[i].type == 2 || r[i].type == 3 || r[i].type == 4 || r[i].type == 5) {
					r[i].border = "yellow";
					r[move].border = "yellow";
					r[i].taken = true;
					r[move].taken = true;
					break;
				}
			}
			else if (i != move && r[i].taken == true && r[move].taken == true) { //If it over none of the squares
				r[i].border = "black";
				r[move].border = "black";
				r[i].taken = false;
				r[move].taken = false;
			}
				
			if (r[move].x + (r[move].w/2) >= WIDTH-110 && r[move].y + (r[move].h/2) >= HEIGHT-138) {
				r[move].border = "Navy";
			}
			else if (r[move].x - (r[move].w/2) <= 100 && r[move].y + (r[move].h/2) >= HEIGHT-100) {
				r[move].border = "Crimson";
			}
			else if (r[move].x + (r[move].w/2) >= WIDTH-150  && r[move].y - (r[move].h/2) <= 100) {
				r[move].border = "Chocolate";
			}
			else {
				r[move].border = "black";
			}
		}
	}
}

function myDown(e){ //When the mouse is pressed down
	move = 0;
	for (j = 0; j < r.length; j++) { //Discovers which item is pressed down.
		if (e.pageX < r[j].x + (r[j].w/2) + canvas.offsetLeft && e.pageX > r[j].x - (r[j].w/2) +
			canvas.offsetLeft && e.pageY < r[j].y + (r[j].h/2) + canvas.offsetTop &&
			e.pageY > r[j].y - (r[j].h/2) + canvas.offsetTop){
				move = j;
				r[j].x = e.pageX - canvas.offsetLeft;
				r[j].y = e.pageY - canvas.offsetTop;
				dragok = true;
				canvas.onmousemove = myMove;
		}
	}
}

function myUp2(){ //When the mouse is released.
	dragok = false;
	canvas.onmousemove = null;
	for(i = 0; i < r.length; i ++) { //Checking which two elements should be joined or if bin is selected
		if (i != move && r[i].border == "green" && r[i].taken == r[move].taken) {
			validMoveTopLeft();
		}if (i != move && r[i].border == "LightBlue" && r[i].taken == r[move].taken) {
			validMoveBottomRight();
		}if (i != move && r[i].border == "red" && r[i].taken == r[move].taken) {
			validMoveTopRight();
		}if (i != move && r[i].border == "yellow" && r[i].taken == r[move].taken) {
			validMoveTopLeft();
		}if (i != move && r[i].border == "deeppink" && r[i].taken == r[move].taken) {
			validMoveTopRight();
		}if (i != move && r[i].border == "olive" && r[i].taken == r[move].taken) {
			validMoveBottomLeft();
		}
		if (r[move].border == "Navy") {
			for (j = 0; j < r[move].dots.length; j++){
				dotsArray[r[move].dots[j]].number = "deleted";
			}
			r.splice(move,1);
		}if (r[move].border == "Crimson" && i == move && (r[move].type == 1 || r[move].type == 0)) {
			r[move].text[0] = "("+r[move].text[0]+")";
		}if (r[move].border == "Chocolate" && i == move && (r[move].type == 1 || r[move].type == 0)) {
			r[move].text[0] = "["+r[move].text[0]+"]";
		}
	}
}

function myUp(){
	dragok = false;
	canvas.onmousemove = null;
	for (i = 0; i < Math.max(1,dotsArray.length); i++){ //Checking which two elements should be joined or if bin is selected
		if (dotsArray.length > 0){
			if (dotsArray[i].colour == "BlueViolet" && r[move].border == "BlueViolet") {
				//window.alert("GREAT SUCCESS");
				insertFormula(i);
			}
		}
			if (r[move].border == "Navy") {
				for (j = 0; j < r[move].dots.length; j++){
					dotsArray[r[move].dots[j]].number = "deleted";
				}
				r.splice(move,1);
			}if (r[move].border == "Crimson" && i == move && (r[move].type == 1 || r[move].type == 0)) {
				r[move].text[0] = "("+r[move].text[0]+")";
			}if (r[move].border == "Chocolate" && i == move && (r[move].type == 1 || r[move].type == 0)) {
				r[move].text[0] = "["+r[move].text[0]+"]";
			}
	}

	for(i = 0; i < r.length; i ++) {
		if (i != move && r[i].border == "green" && r[i].taken == r[move].taken) {
			validMoveTopLeft();
		}
		if (i != move && r[i].border == "red" && r[i].taken == r[move].taken) {
			validMoveTopRight();
		}
	}
}



init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
