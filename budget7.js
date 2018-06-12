//budget controller
var budgetController = (function(){

	// hier komt nog code
})();



//ui controller
var UIController = (function(){

	return{
		getInput: function(){
			return{

			//leest de waarde van add type(in dit geval wat is geselecteerd inkomen of uitgaven)
			//hetzelfde geldt voor description en value

			type: document.querySelector('.add__type').value, 
			description: document.querySelector('.add__description').value,
			value: document.querySelector('.add__value').value

			};

			
		}
	};

})();


//global app controller
var controller = (function(bugetCtrl, UICtrl) {

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
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event){
	
		if(event.keyCode === 13 || event.which === 13){
			
			ctrlAddItem();
		}

	});

})(budgetController, UIController);

