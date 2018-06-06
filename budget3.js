//BUDGET BEREKENEN
var budgetController = (function(){

	//create objects voor expense, handige manier omdat je meerdere expenses hebt
	//hierin wordt het id, description en value opgeslagen
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	//var data stored alleItems(exp of inc) Deze zullen worden gevuld met 
	//de addItem function. hierin wordt gekeken of het type exp of inc is
	//waarna alleItems wordt gepusht met alle benodigde data.
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals:{
			exp: 0,
			inc: 0
		}

	  };

	  return {
	  	addItem: function(type, des, val){
	  		var newItem, ID;

	  		//maakt een nieuwe ID aan
	  		if (data.allItems[type].length > 0){
	  			ID = data.allItems[type][data.allItems[type].length -1].id + 1;
	  		} else {
	  			ID = 0;
	  		}
	  		

	  		//Nieuw item voor inc of voor exp(type)
	  		if(type === 'exp'){
	  			newItem = new Expense(ID, des, val);
	  		} else if (type === 'inc'){
	  			newItem = new Income(ID, des, val);
	  		}

	  		//de array type zal worden gepusht, dit is exp of inc.
	  		data.allItems[type].push(newItem);

	  		//returnt het nieuwe element.
	  		return newItem;
	  	},

	  	testing: function(){
	  		console.log(data);
	  	}
	  };

})();



//UI CONTROLLER
var UIController = (function() {

//ik maak hier een var aan om zo te zorgen dat ik in een later stadium
//de code makkelijker kan gebruiken en niet elke keer een string moet aanpassen
//deze waardes komen vanuit de index.html
var ALLEstrings = {
	inputType: '.add__type',
	inputDescription: '.add__description',
	inputValue: '.add__value',
	inputBtn: '.add__btn',
	incomeContainer: '.income__list',
	expensesContainer: '.expenses__list'

};

return {
	getInput: function(){
		return {

			//leest de waarde van add type(in dit geval wat is geselecteerd inkomen of uitgaven)
			//hetzelfde geldt voor description en value
			type: document.querySelector(ALLEstrings.inputType).value, //selectie voor inkomsten of uitgaven (selectie type +/-)
			description: document.querySelector(ALLEstrings.inputDescription).value,
			value: document.querySelector(ALLEstrings.inputValue).value
		};
	},

	addListItem: function(obj, type){
		var html, newHtml, element;
		//create html string with placeholder text

		if(type === 'inc') {
			element = ALLEstrings.incomeContainer;

			html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div></div></div>';
		} else if(type === 'exp') {
			element = ALLEstrings.expensesContainer;

			html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div></div>';
		}
				
		//replace placeholder text
		newHtml = html.replace('%id%', obj.id);
		newHtml = newHtml.replace('%description%', obj.description);
		newHtml = newHtml.replace('%value%', obj.value);

		//insert html into the dom
		document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

	},
	//aan te roepen functie(ALLEstrings)
	getALLEstrings: function(){
		return ALLEstrings;
	}
};

})();




// GLOBALE APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

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
		var input, newItem;

		//hier worden alle gegevens uit de UI controller gehaald
		//het type, de descripton en value van getInput.
		//1 get the field input data
		input = UICtrl.getInput();
		

		//2	add item to budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		//3	add item to UI
		UICtrl.addListItem(newItem, input.type);
		
		//4	caltulate budget
		//5	display budget


	};

	return {
		init: function(){
			console.log('Applicatie is gestart.');
			setupEventListeners();
		}
	};

})(budgetController, UIController);


controller.init();


