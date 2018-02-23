

$(document).ready(function(){



	var Questions = {

		question: ["I am a Police Officer", "I love Chcocolate", "I love to Ski", "I have two brothers"],
		answer: [true, false, true, false],
		count: 0,
		right: 0,
		wrong: 0,
		timer: 7

	}

	var timer;

	//Starts the game
	startGame();



	function startGame(){

		//configures initial display
		initialDisplay();
		
		//shows the first question and next button after clicking the start button
		$("#start").on("click", function(){

			start();

		});

		//displays next question, adds to the correct or wrong score, displays correct/incorrect screen, 
		$("#next").on("click", function(){

			answerQuestion();
			
		});

		//restarts the game
		$("#tryAgain").on("click", function(){

			initialDisplay();

		});

	}





	//configures initial display
	function initialDisplay(){

		$("#title").show();
		$("#start").show();
		$(".question").hide();
		$(".timer").hide();
		$(".correctScreen").hide();
		$(".wrongScreen").hide();
		$(".timesUpScreen").hide();
		$(".results").hide();
		$("input[name=exampleRadios]").prop("checked",false);
		Questions.count = 0;
		Questions.right = 0;
		Questions.wrong = 0;

	}

	//shows the first question and next button after clicking the start button
	function start(){

		clearInterval(timer);
		Questions.timer = 7;
		$(".timer").html(Questions.timer);
		questionTimer();

		$("#start").hide();
		$(".question").show();
		$(".timer").show();

		$("#question").text(Questions.question[Questions.count]);

	}

	//displays next question, adds to the correct or wrong score, displays correct/incorrect screen, 
	function answerQuestion(){

		clearInterval(timer);
		Questions.timer = 7;
		$(".timer").html(Questions.timer);
		setTimeout(function(){questionTimer()}, 2000);

		if (Questions.count < Questions.question.length) {

			if($(".form-check-input").is(":checked")) { 

				var selection = $("input[name=exampleRadios]:checked").val(); 

				if (selection === Questions.answer[Questions.count].toString()) {

					updateRight();

				}else {

					updateWrong();

				}

				displayNextQuestion();

			}else {

				alert("Please select an answer.");

			}

		}else {

			displayResultsScreen();

		}


	}

	//displays the next question
	function displayNextQuestion(){

			Questions.count += 1;

		if (Questions.count < Questions.question.length) {

			$("input[name=exampleRadios]").prop("checked",false);
			$("#question").text(Questions.question[Questions.count]);

		}else {

			setTimeout(function(){displayResultsScreen()}, 2000);

		}

	}

	//hides the question and shows correct screen, updates questions answered correctly
	function updateRight(){

		$("#title").hide();
		$(".question").hide();
		$(".timer").hide();
		$(".correctScreen").show();

		setTimeout(function(){displayQuestionScreen()}, 2000);

		Questions.right += 1;

	}

	//hides the question and shows wrong screen, updates questions answered incorrectly
	function updateWrong(){

		$("#title").hide();
		$(".question").hide();
		$(".timer").hide();
		$(".wrongScreen").show();
		$(".correctAnswer").text(Questions.answer[Questions.count]);

		setTimeout(function(){displayQuestionScreen()}, 2000);

		Questions.wrong += 1;

	}

	//hides the question and shows the times up screen, updates questions answered incorrectly
	function updateTimesUp(){

		if (Questions.count < Questions.question.length - 1) {

			$("#title").hide();
			$(".question").hide();
			$(".timer").hide();
			$(".timesUpScreen").show();
			$(".correctAnswer").text(Questions.answer[Questions.count]);

			displayNextQuestion();
			setTimeout(function(){displayQuestionScreen()}, 2000);

			Questions.wrong += 1;

			clearInterval(timer);
			Questions.timer = 9;
			$(".timer").html(Questions.timer);
			questionTimer();

		}else {

			wrong += 1;
			displayResultsScreen();

		}

	}

	//displays the next question screen after the answer screen is displayed
	function displayQuestionScreen(){

		$("#title").show();
		$(".timer").show();
		$(".question").show();
		$(".correctScreen").hide();
		$(".wrongScreen").hide();
		$(".timesUpScreen").hide();

	}

	function displayResultsScreen(){

		clearInterval(timer);

		$("#title").hide();
		$(".question").hide();
		$(".timer").hide();

		$("#correct").text(Questions.right);
		$("#wrong").text(Questions.wrong);

		$(".results").show();

	}

	function questionTimer(){

		timer = setInterval(function(){

			if (Questions.timer > 0) {

				Questions.timer -= 1;
				$(".timer").html(Questions.timer);

			}else {

				updateTimesUp();

			}	

		}, 1000);

	}

});









