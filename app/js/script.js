var $result = $('.result'),
		valid = true,
    Ans,
    result;

function percentConversion(percent) {
	var num = +percent.slice(0, percent.length - 1);
	return num/100;
}

$('.input').on('click', function() {
	if (!valid) {
		valid = true;
		$result.text('');
	}
	var newText = $(this).text();
	var current = $result.text();
	$result.text(current + newText);
});

$('#all-clear').on('click', function() {
	if (!valid) {
		valid = true;
	}
	$result.text('');
	Ans = undefined;
});

$('#clear-entry').on('click', function() {
	if (!valid) {
		valid = true;
		$result.text('');
		return;
	}
	var current = $result.text();
	var newText = current.slice(0, current.length -1);
	$result.text(newText);
});


var regex = /[\/\*\-\+]/g;

$('#calculate').on('click', function() {
	var text = $result.text();
	// array of actual number inputs
	var numArr = text.split(regex);

	// test if calulator inputs are incomplete. if incomplete simply return to do nothing
	if (numArr[numArr.length-1] == '') {
		console.log("incomplete");
		return;
	}

	// array of math operations
	var mathOperations = text.match(regex);

	// check for invalid inputs and convert Ans and percentages to numbers
	for (var i=0; i<numArr.length; i++) {
		if (numArr[i] == '') {
			result = "Invalid inputs!";
			valid = false;
			break;
		}
		
		//test if number
		var test = +numArr[i];
		
		if (isNaN(test)) {
			if (numArr[i] == 'Ans') {
				if (Ans) {
					numArr[i] = Ans;
				} else {
					result = "Ans is empty";
					valid = false;
					break;
				}
				
			} else {
				numArr[i] = percentConversion(numArr[i]);
			}
		} else {
			numArr[i] = test;
		}
	}

	if (valid) {
		// string of numbers and math operations to be concatenated
		var mathString = '';
		console.log(mathOperations);
		for (var j=0; j<mathOperations.length; j++) {
			mathString += numArr[j] + mathOperations[j];
		}
		mathString += numArr[numArr.length-1];
		result = eval(mathString);
		Ans = result; // stores last result into Ans button
		valid = false; // this makes it so that the results are cleared on next input press
	}
	$result.text(result);
});