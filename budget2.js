//budget controller
var budgetController = (function(){

	//create objects voor expense, handige manier omdat je meerdere expenses hebt
	//hierin wordt het id, description en value opgeslagen
	 var Uitgaven = function(id, description, value){
	 	this.id = id;
	 	this.description = description;
	 	this.value = value;

	 };

	 var Inkomen = function(id, description, value){
	 	this.id = id;
	 	this.description = description;
	 	this.value = value;
	 };

//var data stored alleItems(exp of inc) Deze zullen worden gevuld met 
//de addItem function. hierin wordt gekeken of het type exp of inc is
//waarna alleItems wordt gepusht met alle benodigde data.
	 var data = {
	 	alleItems: {
	 		exp: [],
	 		inc: []
	 	},
	 	totals: {
	 		exp: 0,
	 		inc: 0
	 	}


	 };

	 return{
	 	addItem: function(type, des, val){
	 		var newItem, ID;

	 		//maakt een nieuwe ID aan
	 		if(data.alleItems[type].length > 0){
	 			ID = data.alleItems[type][data.alleItems[type].length - 1].id + 1;
	 		} else {
	 			ID = 0;
	 		}
	 		

	 		//Nieuw item voor inc of voor exp(type)
	 		if(type === 'exp'){
	 			newItem = new Uitgaven(ID, des, val);
	 		}else if (type === 'inc'){
	 			newItem = new Inkomen(ID, des, val);
	 		}
	 		
	 		//de array type zal worden gepusht, dit is exp of inc.
	 		data.alleItems[type].push(newItem);
	 		return newItem;
	 	},

	 	testing: function(){
	 		console.log(data);
	 	}

	 };


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

		
		getALLEstrings: function(){
			return ALLEstrings;
		}
	};

})();


//global app controller
var controller = (function(bugetCtrl, UICtrl) {

	var setupEventListeners = function(){

	var ALLE = UICtrl.getALLEstrings();

	//wanneer er op de button wordt geklikt of op enter wordt gedrukt
	document.querySelector(ALLE.inputBtn).addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event){
		if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}

	});
};


	

	var ctrlAddItem = function(){

		

		//hier worden alle gegevens uit de UI controller gehaald
		//het type, de descripton en value van getInput.
		//1. get field input data
		var input, newItem;

		input = UICtrl.getInput();
		

		//2. add item to controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3. add item to UI

		//4. calculate

		//5. display budget
		
	};
	
	return{
		init: function(){
			console.log('applicatie is gestart');
			setupEventListeners();
		}
	};
	

})(budgetController, UIController);

controller.init();

