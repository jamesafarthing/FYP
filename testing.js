var success = 0;
var failed = 0; 

function testTwoUpOneDown(){
	reset();
	var test = true;
	createTwoUpOneDown();
	if (dotsArray.length == 3){
		console.log("Test Successful: Dots added.");
	} else {
		console.log("Test unsuccessful: Dots not added.");
		test = false;
	}
	
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createTwoUpOneDown");
		success++;
	} else {
		console.log("Test Unsuccessful: createTwoUpOneDown");
		failed++;
	}
	
}

function testOneUpOneDown(){
	reset();
	var test = true;
	createOneUpOneDown();
	if (dotsArray.length == 2){
		console.log("Test Successful: Dots added.");
	} else {
		console.log("Test unsuccessful: Dots not added.");
		test = false;
	}
	
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createOneUpOneDown");
		success++;
	} else {
		console.log("Test Unsuccessful: createOneUpOneDown");
		failed++;
	}
}

function testA(){
	reset();
	var test = true;
	createA();
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	if (r[0].text[0] == "A" && r[0].text[1]=="none" && r[0].text[2]=="none" && r[0].text[3]=="none"){
		console.log("Test Successful: Strucure correct.");
	} else {
		console.log("Test Unsuccessful: Strucure incorrect.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createA");
		success++;
	} else {
		console.log("Test Unsuccessful: createA");
		failed++;
	}
}

function testB(){
	reset();
	var test = true;
	createB();
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	if (r[0].text[0] == "B" && r[0].text[1]=="none" && r[0].text[2]=="none" && r[0].text[3]=="none"){
		console.log("Test Successful: Strucure correct.");
	} else {
		console.log("Test Unsuccessful: Strucure incorrect.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createB");
		success++;
	} else {
		console.log("Test Unsuccessful: createB");
		failed++;
	}
}

function testC(){
	reset();
	var test = true;
	createC();
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	if (r[0].text[0] == "C" && r[0].text[1]=="none" && r[0].text[2]=="none" && r[0].text[3]=="none"){
		console.log("Test Successful: Strucure correct.");
	} else {
		console.log("Test Unsuccessful: Strucure incorrect.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createC");
		success++;
	} else {
		console.log("Test Unsuccessful: createC");
		failed++;
	}
}

function testCopycat(){
	reset();
	var test = true;
	var text = ["A ∧ B", "none", "none", "none"];
	copycat(text);
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	if (r[0].text[0] == "A ∧ B" && r[0].text[1]=="none" && r[0].text[2]=="none" && r[0].text[3]=="none"){
		console.log("Test Successful: Strucure correct.");
	} else {
		console.log("Test Unsuccessful: Strucure incorrect.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: copycat");
		success++;
	} else {
		console.log("Test Unsuccessful: copycat");
		failed++;
	}
}

function testConjunction(){
	reset();
	var test = true;
	createConjunction();
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	if (r[0].text[0] == "∧" && r[0].text[1]=="none" && r[0].text[2]=="none" && r[0].text[3]=="none"){
		console.log("Test Successful: Strucure correct.");
	} else {
		console.log("Test Unsuccessful: Strucure incorrect.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createConjunction");
		success++;
	} else {
		console.log("Test Unsuccessful: createConjunction");
		failed++;
	}
}

function testImplication(){
	reset();
	var test = true;
	createImplication();
	if(r.length == 1){
		console.log("Test Successful: Object added.");
	} else {
		console.log("Test unsuccessful: Object not added");
		test = false;
	}
	if (r[0].text[0] == "→" && r[0].text[1]=="none" && r[0].text[2]=="none" && r[0].text[3]=="none"){
		console.log("Test Successful: Strucure correct.");
	} else {
		console.log("Test Unsuccessful: Strucure incorrect.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: createImplication");
		success++;
	} else {
		console.log("Test Unsuccessful: createImplication");
		failed++;
	}
}

function testButtons(){
	reset();
	var test = true;
	setButtons(false,true,true,true,true,true,true,true,true,true,true);
}

function testDeleteAll(){
	reset();
	var test = true;
	deleteAll();
	if (dotsArray.length == 0){
		console.log("Test Successful: All dots deleted.");
	} else {
		console.log("Test unsuccessful: Dots not deleted");
		test = false;
	}
	
	if(r.length == 0){
		console.log("Test Successful: All objects deleted.");
	} else {
		console.log("Test unsuccessful: Objects not deleted");
		test = false;
	}
	
	if (dotNumber == 0){
		console.log("Test Successful: DotNumber Reset.");
	} else {
		console.log("Test Successful: DotNumber Reset.");
		test = false;
	}
	
	if (test == true){
		console.log("Test Successful: DeleteAll");
		success++;
	} else {
		console.log("Test Unsuccessful: DeleteAll");
		failed++;
	}
}

function tests(){
	console.log("There were " + success + " successful tests run.");
	console.log("There were " + failed + " failed tests.");
}

function reset(){
	r=[];
	dotsArray=[];
	levelNum = 100;
}


testTwoUpOneDown();
testOneUpOneDown();
testA();
testB();
testC();
testCopycat();
testConjunction();
testImplication();
testButtons();
testDeleteAll();
tests();