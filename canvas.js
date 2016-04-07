var canvas;
var ctx;
var x = 75;
var y = 50;
var WIDTH = 1500;
var HEIGHT = 1000;
var scale=1.00;
//var WIDTH = 1000;
//var HEIGHT = 750;
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
var dotTaken = [-1 ,false];
var correctProof = true;
var freePlay = false;
var userScore = 0;
var levelScore = 10;
var proof = [];
var structure = [];

function reduceScore(){
	levelScore = Math.max(1, levelScore - 2);
}

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
	r.push(new object((WIDTH/2)-200, 500, 75, 75, [dot1, dot2, dot3, "%"], 2, [dot1, dot2, dot3]));
	dotsArray.push(new dot(dot1));
	dotsArray.push(new dot(dot2));
	dotsArray.push(new dot(dot3));
	if(levelNum == 100){
		levelNum++;
		levelText();
	}
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
	r.push(new object((WIDTH/2)+200, 500, 100, 100, [dot1, "%", dot2, "%"], 5, [dot1, dot2]));
	dotsArray.push(new dot(dot1));
	dotsArray.push(new dot(dot2));
}
function createA(){
	r.push(new object((WIDTH/2)-200,  55,  100, 100, ["A", "none", "none", "none"], 0, []));
	if(levelNum == 101){
		levelNum++;
		levelText();
	}
} 
function createB(){
	r.push(new object((WIDTH/2)-100, 55,  100, 100, ["B", "none", "none", "none"], 0, []));
} 
function createC(){
	r.push(new object((WIDTH/2), 55,  100, 100, ["C", "none", "none", "none"], 0, []));
} 
function createConjunction(){
	r.push(new object((WIDTH/2)+100, 55,  100, 100, ["∧", "none", "none", "none"], 1, []));
}
function createImplication(){
	r.push(new object((WIDTH/2)+200, 55,  100, 100, ["→", "none", "none", "none"], 1, []));
}

function setButtons(bool1,bool2,bool3,bool4,bool5,bool6,bool7,bool8,bool9,bool10,bool11){
	$('#twoOne').prop('disabled', bool1);
	$('#oneOne').prop('disabled', bool2);
	$('#A').prop('disabled', bool3);
	$('#B').prop('disabled', bool4);
	$('#C').prop('disabled', bool5);
	$('#con').prop('disabled', bool6);
	$('#imp').prop('disabled', bool7);
	$('#del').prop('disabled', bool8);
	$('#check').prop('disabled', bool9);
	$('#free').prop('disabled', bool10);
	$('#hints').prop('disabled', bool11);
}

function levelText(){
	if (freePlay == false){
		if (levelNum == 100){
			document.getElementById("level").innerHTML = "Welcome to the Natural Deduction Tutorial. <br> Start by clicking the '2 Top\\1 Bottom' button.";
			proof = [];
			setButtons(false,true,true,true,true,true,true,true,true,true,true);
		}
		if (levelNum == 101){
			document.getElementById("level").innerHTML = "Well done. This creates a proof structure. You can left click on it and drag it around. <br> Now click on the 'A' button below.";
			setButtons(true,true,false,true,true,true,true,true,true,true,true);
		}
		if (levelNum == 102){
			document.getElementById("level").innerHTML = "Great. Now click and drag the 'A' to move it around. Drag it over a dot. <br> You will see the dot and the border of the 'A' goes purple. <br> This means the items will connect if you release the mouse. <br> The 'Check Proof' button checks a finished proof. Press that when you have connected the 'A' to the top left dot.";
			setButtons(true,true,true,true,true,true,true,true,false,true,true);
		}
		if (levelNum == 103){
			document.getElementById("level").innerHTML = "Awesome. You're learning how to build proofs.<br> Proof structures can also be dragged onto each other. Drag a '1 Top\\1 Bottom' structure onto the top right of the proof. <br> Once again, click 'Check Proof' when you are done.";
			setButtons(true,false,true,true,true,true,true,true,false,true,true);
		}
		
		if (levelNum ==104){
			document.getElementById("level").innerHTML = "Drag what you've created over the bin icon to delete it.<br> Once the border goes blue, release it and it will be deleted."
			setButtons(true,true,true,true,true,true,true,true,true,true,true);
		}
		if (levelNum == 105){
			document.getElementById("level").innerHTML = "Good work. Statements can also be joined together to create longer statements. <br> Dragging a statement to the right of another turns the borders red. This will add the object you are moving to the right. <br> Dragging a statement to the left of another will turn the borders green will add the object to the left. <br> See if you can create 'A ∧ B. When you are done, click 'Check Proof'."
			setButtons(true,true,false,false,true,false,true,true,false,true,true);
		}
		if (levelNum == 106){
			document.getElementById("level").innerHTML = "Nice. Drag this proof over to the brackets. Once the border goes pink release it. <br> This surrounds the outside of the current statement with brackets.";
		}
		if (levelNum == 107){
			document.getElementById("level").innerHTML = "Fantastic. The tutorial is done! In 5 seconds Level 1 will start! Enjoy.";
			levelNum = 108;
			window.setTimeout(start, 5000);
		}
		if (levelNum == 108){
			document.getElementById("level").innerHTML = "Fantastic. The tutorial is done! In 5 seconds Level 1 will start! Enjoy.";
		}
		if (levelNum == 1) {
			document.getElementById("level").innerHTML = "Level 1: The goal is to prove A ∧ B. <br> This uses Conjunction Introduction.";
			proof = ["A","B", "A ∧ B", "%"];
			setButtons(false,true,false,false,true,false,true,false,false,false,false);
		}
		else if (levelNum == 2){
			document.getElementById("level").innerHTML = "Level 2: The goal is to prove B ∧ (A ∧ C). <br> This uses Conjunction Introduction.";
			proof = ["B", ["A","C", "A ∧ C", "%"], "B ∧ (A ∧ C)", "%"];
			setButtons(false,true,false,false,false,false,true,false,false,false,false);
		} else if (levelNum == 3){
			document.getElementById("level").innerHTML = "Level 3: The goal is to prove B ∧ A. Assume A ∧ B is true. <br> This uses Conjunction Introduction and Conjunction Elimination.";
			proof = [["A ∧ B", "%", "B", "%"], ["A ∧ B","%", "A", "%"], "B ∧ A", "%"];
			setButtons(false,false,false,false,true,false,true,false,false,false,false);
		} else if (levelNum == 4) {
			document.getElementById("level").innerHTML = "Level 4: The goal is to proof A → (A ∧ B). Assume A is true and B ∧ C is true. <br> This uses Conjunction Introduction, Conjunction Elimination and Implication Introduction.";
			proof = [["A", ["B ∧ C", "%", "B", "%"], "A ∧ B", "%"], "%", "A → (A ∧ B)", "%"];
			setButtons(false,false,false,false,false,false,false,false,false,false,false);
		}
		else if (levelNum == 5){
			//levelNum = 1;
		}
	}
	else {
		proof = [];
		document.getElementById("level").innerHTML = "FREE PLAY! HAVE SOME FUN!!!";
		setButtons(false,false,false,false,false,false,false,true);
	}
}

function runDone(){
	done(proof);
}

function start(){
		popup('start');
		levelNum = 1;
		deleteAll();
}

function play(){
	if (freePlay == true) {
		freePlay = false;
	} else{
		freePlay = true;
	}
	levelText();
}

function done(proof){
	correctProof = true;
	if (typeof r[0] === 'undefined'){
		window.alert("There is no proof on the screen. Please create a proof.");
	} else if (typeof r[1] != 'undefined'){
		window.alert("There are too many proofs on the screen. Please delete items you do not want.");
	} else if (levelNum == 102){
		if(r[0].text[0] == "A"){
			levelNum++;
			levelText();
		}
		else{
			window.alert("You've gone wrong. Start the tutorial again.");
			deleteAll();
			levelNum = 100;
			levelText();
		}
	} else if (levelNum == 103){
		if (typeof r[0].text[1][0] == 'number' && r[0].text[1][1] == "%"){
			levelNum++;
			levelText();
		}
		else {
			window.alert("You've gone wrong. Start the tutorial again.");
			deleteAll();
			levelNum = 100;
			levelText();
		}
	}
	
	else if (levelNum == 105){
		if(r[0].text[0] == "A ∧ B"){
			levelNum++;
			levelText();
		} else {
			window.alert("You've gone wrong. Try that again.");
			deleteAll();
			//levelNum = 103;
			//levelText();
		}
	} else{
		//console.log(r[0].text);
		unification(r[0].text, proof);
		if (correctProof == true){
			document.getElementById("levelScore").innerHTML= levelScore;
			if(levelNum == 4){
				popup('finish');
			} else {
				popup('correct');
			}
			deleteAll();
			levelNum++;
			userScore = userScore + levelScore;
			document.getElementById("userScore").innerHTML= userScore;
			levelScore = 10;
		} else {
			popup('incorrect');
			reduceScore();
		}
	}
}

function removeBrackets(statement){
	if (typeof statement == 'string'){ 
		if(statement.charAt(0) == '(' && statement.charAt(statement.length-1) == ')'){
			statement = statement.slice(1,statement.length-1);
		}
	}
	return statement;
}

//["A", ["B","C", "B ∧ C", "%"], "A ∧ (B ∧ C)", "%"]
function unification(userEntry, idealSolution){
	userEntry[0] = removeBrackets(userEntry[0]);
	userEntry[1] = removeBrackets(userEntry[1]);
	userEntry[2] = removeBrackets(userEntry[2]);
	idealSolution[0] = removeBrackets(idealSolution[0]);
	idealSolution[1] = removeBrackets(idealSolution[1]);
	idealSolution[2] = removeBrackets(idealSolution[2]);
	userEntry[0][2] = removeBrackets(userEntry[0][2]);
	userEntry[1][2] = removeBrackets(userEntry[1][2]);
	idealSolution[0][2] = removeBrackets(idealSolution[0][2]);
	idealSolution[1][2] = removeBrackets(idealSolution[1][2]);
	
	if (userEntry[2] == idealSolution[2]){
		if (typeof userEntry[0] == 'string' && (userEntry[0] == idealSolution[0] || userEntry[0] == idealSolution[1])){
			console.log("This part is correct 0 :" + userEntry[0]);
		} else if(typeof userEntry[0] == 'number'){
			console.log("This proof is wrong: " + userEntry[0]);
			correctProof = false;
		} else{
			if (userEntry[0][2] == idealSolution[0][2] 
				&& typeof userEntry[0][2] != 'undefined' && typeof idealSolution[0][2] != 'undefined'){
				unification(userEntry[0], idealSolution[0]);
			}
			else if (userEntry[0][2] == idealSolution[1][2]
					&& typeof userEntry[0][2] != 'undefined' && typeof idealSolution[1][2] != 'undefined'){
				unification(userEntry[0], idealSolution[1]);
			}
			else {
				console.log("This proof is wrong: " + userEntry[0]);
				correctProof = false;
			}
		}
		if (userEntry[1] != "%"){
			if (typeof userEntry[1] == 'string' && (userEntry[1] == idealSolution[0] || userEntry[1] == idealSolution[1])){
				console.log("This part is correct 1: " + userEntry[1]);
			} else if(typeof userEntry[1] == 'number'){
				console.log("This proof is wrong: " + userEntry[1]);
				correctProof = false;
			} else {
				if(userEntry[1][2] == idealSolution[0][2]
					&& typeof userEntry[1][2] != 'undefined' && typeof idealSolution[0][2] != 'undefined') {
					unification(userEntry[1], idealSolution[0]);
				}
				else if (userEntry[1][2] == idealSolution[1][2]
						&& typeof userEntry[1][2] != 'undefined' && typeof idealSolution[1][2] != 'undefined'){
					unification(userEntry[1], idealSolution[1]);
				}
				else {
					console.log("This proof is wrong: " + userEntry[1]);
					correctProof = false;
				}
			}
		}		
	}
	else {
		console.log("This proof is wrong: " + userEntry[2]);
		correctProof = false;
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
	levelNum = 100;
	levelText();
	return setInterval(drawIterate, 10);
}

function dotsIterate(dotNumber, updatedX, updatedY) {
	dotsArray[dotNumber].xPos = updatedX;
	dotsArray[dotNumber].yPos = updatedY;
	ctx.fillStyle = dotsArray[dotNumber].colour;
}

function drawIterate() {
	clear();
	levelText();
	var bin = document.getElementById("bin");
	var brackets = document.getElementById("brackets");
	var premise = document.getElementById("premise");
    ctx.drawImage(bin, WIDTH-110, HEIGHT-138, 110, 138); 
	ctx.drawImage(brackets, 0, HEIGHT-100, 100, 100); 
	ctx.drawImage(premise, WIDTH-150, 0, 150, 75);
	ctx.font = "32px Georgia";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	ctx.fillText("Score: " + userScore, 20, 35);
	if (r.length == 0) {
		deleteAll();
	}
	for (i = 0; i < r.length ; i++) {
		draw(r[i].x, r[i].y, r[i].w, r[i].h, i, r[i].border, r[i].text, r[i].proofHeight);
	}
}

function draw(x, y, w, h, i, border, text, ph) {
	ctx.fillStyle = "#FAF7F8";
	rect(x-(w/2), y-(h/2), w, h);
	ctx.strokeStyle = border;
	ctx.lineWidth=3;
	ctx.stroke();
	ctx.font="24px Georgia";
	ctx.fillStyle = "#444444";
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	//ctx.strokeStyle = "black";
	if (text[2] == "none") { //Figures out whether it is a form or a var/operator.
		r[i].w = Math.max(50, text[0].length * 25);
		r[i].h = 40;
		ctx.textAlign = "center";
		ctx.fillText(text[0], x, y);
	}
	else {
		multiLineDrawing(x, y, w, h, i, border, text, ph);
	}
}

function multiLineDrawing(x, y, w, h, i, border, text, ph){
	r[i].h = Math.min(ph*50, 300);
	if (ph == 2) {
			ctx.strokeStyle = "black";
			drawLines(x,y,w,h, h/(ph*2), text, i);
		}
	if (ph == 3) {
		ctx.font="22px Georgia";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		drawLines(x,y+h/6,w,h, h/(ph*2), text, i);
		
		//left branch			
		if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
			if (text[1] != "%"){
				drawLines(x-w/4,y-h/6,w/2,h/3, h/(ph*2), text[0], i);
			}
			else {
				drawLines(x,y-h/6,w,h/3, h/6, text[0], i);
			}
		}
		//right branch
		if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
			drawLines(x+w/4,y-h/6,w/2,h/3, h/(ph*2), text[1], i);
		}
	}
	if (ph == 4) {
		ctx.font="20px Georgia";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		drawLines(x,y+h/4,w,h, h/(ph*2), text, i);
		
		//left branch
		if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
			if (text[1] != "%") {
				drawLines(x-w/4,y,w/2,h/2, h/(ph*2), text[0], i);
			}
			else {
				drawLines(x,y,w,h/2, h/(ph*2), text[0], i);
			}
		}
		//right branch
		if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
			drawLines(x+w/4,y,w/2,h/2, h/(ph*2), text[1], i);
		}	
		//left left branch
		if ((typeof text[0][0] !== 'string' && typeof text[0][0] !== 'number') && text[0][0] !== undefined){
			if(text[0][1] != "%" && text[1] != "%"){
				drawLines(x-(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][0], i);
			}
			else if (text[0][1] != "%" || text[1] != "%") {
				drawLines(x-w/4,y-h/4,w/2,h/4, h/(ph*2), text[0][0], i);
			}
			else {
				drawLines(x,y-h/4,w,h/4, h/(ph*2), text[0][0], i);
			}
			
		} 
		
		// left right branch
		if ((typeof text[0][1] !== 'string' && typeof text[0][1] !== 'number') && text[0][1] !== undefined){
			if(text[1] != "%"){
				drawLines(x-(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][1], i);
			}
			else{
				drawLines(x+w/4,y-h/4,w/2,h/4, h/(ph*2), text[0][1], i);
			}
		}
		//right left branch
		if ((typeof text[1][0] !== 'string' && typeof text[1][0] !== 'number') && text[1][0] !== undefined){
			if(text[1][1] != "%"){
				drawLines(x+(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][0], i);
			}
			else{
				drawLines(x+w/4,y-h/4,w/2,h/4, h/(ph*2), text[1][0], i);
			}
		} 
		
		//right right branch
		if ((typeof text[1][1] !== 'string' && typeof text[1][1] !== 'number') && text[1][1] !== undefined){
			drawLines(x+(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][1], i);
		}
	}
	if (ph > 4) {
		ctx.font="20px Georgia";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		drawLines(x,y+h/4,w,h, h/(ph*2), text, i);
		
		//left branch
		if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
			if (text[1] != "%") {
				drawLines(x-w/4,y,w/2,h/2, h/(ph*2), text[0], i);
			}
			else {
				drawLines(x,y,w,h/2, h/(ph*2), text[0], i);
			}
		}
		//right branch
		if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
			drawLines(x+w/4,y,w/2,h/2, h/(ph*2), text[1], i);
		}	
		//left left branch
		if ((typeof text[0][0] !== 'string' && typeof text[0][0] !== 'number') && text[0][0] !== undefined){
			if(text[0][1] != "%" && text[1] != "%"){
				drawLines(x-(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][0], i);
				drawExtraBoxes(x -((3*w)/8), y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][0], ph-3, w/4);
			}
			else if (text[0][1] != "%" || text[1] != "%") {
				drawLines(x-w/4,y-h/4,w/2,h/4, h/(ph*2), text[0][0], i);
				drawExtraBoxes(x-w/4, y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][0], ph-3, w/2);
			}
			else {
				drawLines(x,y-h/4,w,h/4, h/(ph*2), text[0][0], i);
				drawExtraBoxes(x, y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][0], ph-3, w);
			}
			
		} 
		
		// left right branch
		if ((typeof text[0][1] !== 'string' && typeof text[0][1] !== 'number') && text[0][1] !== undefined){
			if(text[0][1] != "%" && text[1] != "%"){
				drawLines(x-(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[0][1], i);
				drawExtraBoxes(x -((1*w)/8), y-h/4-h/(ph*2), x-w/2, y-h/2-200, 
					Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
					text[0][1], ph-3, w/4);
			}
			else if (text[0][1] != "%" || text[1] != "%") {
				drawLines(x+w/4,y,w/2,h/2, h/(ph*2), text[0][1], i);
				drawExtraBoxes(x +(w/4), y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][1], ph-3, w/2);
			}
			else {
				drawLines(x,y-h/4,w,h/4, h/(ph*2), text[0][0], i);
				drawExtraBoxes(x, y-h/4-h/(ph*2), x-w/2-400, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[0][1], ph-3, w);
			}
		}
		//right left branch
		if ((typeof text[1][0] !== 'string' && typeof text[1][0] !== 'number') && text[1][0] !== undefined){
			if(text[1][1] != "%"){
				drawLines(x+(1*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][0], i);
				drawExtraBoxes(x +((1*w)/8), y-h/4-h/(ph*2), x+w/2, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[1][0], ph-3, w/4);
			}
			else{
				drawLines(x+w/4,y-h/4,w/2,h/4, h/(ph*2), text[1][0], i);
				drawExtraBoxes(x + w/4, y-h/4-h/(ph*2), x+w/2, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[1][0], ph-3, w/2);
			}
		} 
		
		//right right branch
		if ((typeof text[1][1] !== 'string' && typeof text[1][1] !== 'number') && text[1][1] !== undefined){
			drawLines(x+(3*w/8),y-h/4,w/4,h/4, h/(ph*2), text[1][1], i);
			drawExtraBoxes(x +((3*w)/8), y-h/4-h/(ph*2), x+w/2+200, y-h/2-200, 
				Math.max(300, (ph-3)*75), Math.min((ph-3)*75, 200), i, r[i].border, 
				text[1][1], ph-3, w/4);
		}
	}
}

function drawExtraBoxes(beginX, beginY, x,y, w, h, i, border, text, ph, width) {
	if ((typeof text[0] !== 'string' && typeof text[0] !== 'number') && text[0] !== undefined){
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
	if ((typeof text[1] !== 'string' && typeof text[1] !== 'number') && text[1] !== undefined){
		ctx.beginPath();
		ctx.moveTo (beginX + width/4,beginY);
		ctx.lineTo(x,y-300);
		ctx.stroke();
		draw(x, y-300, w, h, i, border, text[1], ph);
	}
}

function drawLines(x,y,w,h,dist,text,i) {
	//r[i].w = Math.min(600, Math.max((text[0].toString().length + text[1].toString().length)*40, (text[2].toString().length + text[3].toString().length)*40, 100, Math.pow(2, r[i].proofHeight) * 50)); //Sets box size
	//r[i].w = Math.max(r[i].proofHeight*150, text[2].toString().length*50);
	r[i].w = Math.min(500, Math.max((text[0].toString().length + text[1].toString().length)*35, (text[2].toString().length + text[3].toString().length)*35, 80, Math.pow(2, r[i].proofHeight) * 40)); //Sets box size
	ctx.beginPath();
	ctx.moveTo (x -((3*w)/8), y);
	ctx.lineTo( x + ((3*w)/8) , y); //Draws middle line for the proof
	ctx.stroke();
	
	ctx.textAlign = 'center'; //Draws text in the various boxes in the correct positions.
	ctx.textBaseline = 'middle';
	if(text[0] != "%" && text[1] != "%" && (typeof text[0] === 'string' || typeof text[0] === 'number')) {
		ctx.fillStyle = "black";
		if(typeof text[0] === 'number'){
			if (dotsArray[text[0]].formula != ""){
				temp = dotsArray[text[0]].number;
				text[0] = dotsArray[text[0]].formula;
				if(typeof text[0] === 'string'){
					ctx.fillText(text[0], x-(w/4), y-dist);
				}else{
					if (typeof text[1] === 'string' || typeof text[1] === 'number'){
						r[i].proofHeight = r[i].proofHeight + r[move].proofHeight - 1;
					}
					r[i].dots = (r[i].dots).concat(r[move].dots);
					console.log(r[i].dots);
					r.splice(move,1);
				}
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
				if(typeof text[0] === 'string'){
					ctx.fillText(text[0], x, y-dist);
				} else {
					if (typeof text[1] === 'string' || typeof text[1] === 'number'){
						r[i].proofHeight = r[i].proofHeight + r[move].proofHeight - 1;
					}
					r[i].dots = (r[i].dots).concat(r[move].dots);
					r.splice(move,1);
				}
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
		ctx.fillStyle = "black";		
		if(typeof text[1] === 'number'){
			if (dotsArray[text[1]].formula != ""){
				temp = dotsArray[text[1]].number;
				text[1] = dotsArray[text[1]].formula;
				if(typeof text[1] === 'string'){
					ctx.fillText(text[1], x+(w/4), y-dist);
				} else {
					if (typeof text[0] === 'string' || typeof text[0] === 'number'){
						r[i].proofHeight = r[i].proofHeight + r[move].proofHeight - 1;
					}
					r[i].dots = (r[i].dots).concat(r[move].dots);
					r.splice(move,1);
				}	
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
		ctx.fillStyle = "black";
		if(typeof text[2] === 'number'){
			if (dotsArray[text[2]].formula != "" && typeof dotsArray[text[2]].formula === 'string'){
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
		ctx.fillStyle = "black";
		if(typeof text[2] === 'number'){
			if (dotsArray[text[2]].formula != "" && typeof dotsArray[text[2]].formula === 'string'){
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
		ctx.fillStyle = "black";
		if(typeof text[3] === 'number'){
			if (dotsArray[text[3]].formula != "" && typeof dotsArray[text[2]].formula === 'string'){
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
	r.splice(move,1);
}

function validMoveLeft() {
	if (r[i].type == 1 || r[i].type == 0) {
		r[i].text[0] = r[move].text[0] + " " + r[i].text[0];
		delShape(i, move);
	}
}

function validMoveRight() {
	if (r[i].type == 1 || r[i].type == 0) {
		r[i].text[0] = r[i].text[0] + " " + r[move].text[0];
		delShape(i, move);
	}
}

function insertFormula(i){
	if (r[move].text[1] == "none"){
		dotsArray[i].formula = r[move].text[0];
		r.splice(move,1);
	}
	else {
		dotsArray[i].formula = r[move].text;
	}
}

function myMove(e){
	if (dragok){
		r[move].x = e.pageX - canvas.offsetLeft;
		r[move].y = e.pageY - canvas.offsetTop;
		for (i = 0; i < Math.max(1,dotsArray.length); i++){
			if (dotsArray.length > 0){
				if (dotsArray[i].number != "deleted"){
					//console.log("Moving Dots: " + r[move].dots.toString());
					//console.log("Dots Array: " + dotsArray.toString());
					var isTrue = false;
					for (j = 0; j < r[move].dots.length; j ++){
						if (i == r[move].dots[j]){
							isTrue = true;
						}
					}
					if (dotTaken[1] == false){
						dotTaken[0] = i;
					}
					if (isTrue == false && dotTaken[0] == i){	
						if ((r[move].x - (r[move].w/2) < dotsArray[i].xPos) && (r[move].x + (r[move].w/2) > dotsArray[i].xPos)
							&& (r[move].y - (r[move].h/2) < dotsArray[i].yPos) && (r[move].y + (r[move].h/2) > dotsArray[i].yPos)){
							r[move].border = "BlueViolet";
							dotsArray[i].colour = "BlueViolet";
							dotTaken[1] = true;
							break;
						}
						else {
							dotTaken[1] = false;
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
				if (dotsArray.length > 0){
					dotsArray[i].colour = "black";
				}
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

function deleteDots(){
	for (j = 0; j < r[move].dots.length; j++){
		dotsArray[r[move].dots[j]].number = "deleted";
	}
	r.splice(move,1);
	
	if(levelNum == 104){
		levelNum++;
		levelText();
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

function myUp(){
	dragok = false;
	dotTaken = [-1 ,false]
	canvas.onmousemove = null;
	for(i = 0; i < r.length; i ++) {
		if (i != move && r[i].border == "green" && r[i].taken == r[move].taken) {
			validMoveLeft();
			break;
		}
		if (i != move && r[i].border == "red" && r[i].taken == r[move].taken) {
			validMoveRight();
			break;
		}
		if (r[move].border == "Navy") {
			deleteDots();
			break;
		}if (r[move].border == "Crimson" && i == move && (r[move].type == 1 || r[move].type == 0)) {
			r[move].text[0] = "("+r[move].text[0]+")";
			if(levelNum == 106){
				levelNum++;
				levelText();
			}
			break;
		}if (r[move].border == "Chocolate" && i == move && (r[move].type == 1 || r[move].type == 0)) {
			r[move].text[0] = "["+r[move].text[0]+"]";
			break;
		}
	}
	
	for (i = 0; i < Math.max(1,dotsArray.length); i++){ 
		if (dotsArray.length > 0){
			if (dotsArray[i].colour == "BlueViolet" && r[move].border == "BlueViolet") {
				insertFormula(i);
				break;
			}
		}
	}
}

init();
//unification([["A","C","A^C","%"],"B","A^B","%"],["B",["B","A","A^C","%"],"A^B","%"]);
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;