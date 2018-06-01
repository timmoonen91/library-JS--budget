//budget controller
var budgetController = (function(){

	// hier komt nog code
})();



//ui controller
var UIController = (function(){


//ik maak hier een var aan om zo te zorgen dat ik in een later stadium
//de code makkelijker kan gebruiken en niet elke keer een string moet aanpassen
var ALLEstrings = {
	inputType: '.add__type',
	inputDescription: '.add__description',
	inputValue: '.add__value',
	inputBtn: '.add__btn'

}


	return{
		getInput: function(){
			return{

			//leest de waarde van add type(in dit geval wat is geselecteerd inkomen of uitgaven)
			//hetzelfde geldt voor description en value

			type: document.querySelector(ALLEstrings.inputType).value, 
			description: document.querySelector(ALLEstrings.inputDescription).value,
			value: document.querySelector(ALLEstrings.inputValue).value

			};	
		},

		//
		getALLEstrings: function(){
			return ALLEstrings;
		}
	};

})();


//global app controller
var controller = (function(bugetCtrl, UICtrl) {

	//alle strings worden uit de UIcontroller gehaald
	var ALLE = UICtrl.getALLEstrings();

	var ctrlAddItem = function(){

		//1. get field input data

		//hier worden alle gegevens uit de UI controller gehaald
		//het type, de descripton en value van getInput.
		var input = UICtrl.getInput();
		console.log(input);

		//2. add item to controller

		//3. add item to UI

		//4. calculate

		//5. display budget
		
	}
	
	//wanneer er op de button wordt geklikt of op enter wordt gedrukt
	document.querySelector(ALLE.inputBtn).addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event){
	
		if(event.keyCode === 13 || event.which === 13){
			
			ctrlAddItem();
		}

	});

})(budgetController, UIController);

