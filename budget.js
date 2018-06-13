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

	//het berekenen van het bedrag(type: inkomen of uitgaven)
	var calculateTotal = function(type){
		var sum = 0;

		//pakt de vorige inkomen of uitgaven en telt daar cur.value bij op(dus het laatste ingevulde value)
		data.allItems[type].forEach(function(cur){
			sum += cur.value;

		});

		//het inkomen of uitgaven dat is uitgerekend via sum.
		data.totals[type] = sum;
	}

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
		},
		budget: 0

	  };

	  //aan te roepen functies
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

	  	calculateBudget: function(){

	  		//berekend totale waarde van inkomen en uitgaven
	  		calculateTotal('exp');
	  		calculateTotal('inc');

	  		//berekend hier het budget(trekt ze van elkaar af)
	  		data.budget = data.totals.inc - data.totals.exp;

	  	},

	  	//
	  	getBudget: function(){
	  		return{ 
	  			budget: data.budget,
	  			totalInc: data.totals.inc,
	  			totalExp: data.totals.exp

	  		};
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
	expensesContainer: '.expenses__list',
	budgetLabel: '.budget__value',
	incomeLabel: '.budget__income--value',
	expensesLabel: '.budget__expenses--value'

};

return {
	getInput: function(){
		return {

			//leest de waarde van add type(in dit geval wat is geselecteerd inkomen of uitgaven)
			//hetzelfde geldt voor description en value
			type: document.querySelector(ALLEstrings.inputType).value, //selectie voor inkomsten of uitgaven (selectie type +/-)
			description: document.querySelector(ALLEstrings.inputDescription).value,
			value: parseFloat(document.querySelector(ALLEstrings.inputValue).value)
		}; //parseFloat is een functie die een string omzet naar een nummer met decimalen, want met een string kun je geen berekening maken
	},

	addListItem: function(obj, type){
		var html, newHtml, element;
		//maakt nieuwe html string aan met placeholder tekst

		if(type === 'inc') {
			element = ALLEstrings.incomeContainer;

			html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div></div></div>';
		} else if(type === 'exp') {
			element = ALLEstrings.expensesContainer;

			html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div></div>';
		}
				
		//vervangen van placeholder tekst
		newHtml = html.replace('%id%', obj.id);
		newHtml = newHtml.replace('%description%', obj.description);
		newHtml = newHtml.replace('%value%', obj.value);

		//invoegen html element
		document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

	},

	//deze code zorgt ervoor dat als je iets invuld in de description of value
	//en op het vinkje klikt deze velden leeg gaan. 
	legeVelden: function(){
		var velden, veldenArr;

		velden = document.querySelectorAll(ALLEstrings.inputDescription + ', ' + ALLEstrings.inputValue);

		veldenArr = Array.prototype.slice.call(velden);

		veldenArr.forEach(function(current, index, array){
			current.value = "";
		});

	},

	//laat de waardes zien die worden ingevuld, deze worden gepakt uit ALLEstrings(UICtrl)
	//budget total inc en exp 
	displayBudget: function(obj){
		document.querySelector(ALLEstrings.budgetLabel).textContent = obj.budget;
		document.querySelector(ALLEstrings.incomeLabel).textContent = obj.totalInc;
		document.querySelector(ALLEstrings.expensesLabel).textContent = obj.totalExp;

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

	var updateBudget = function(){
		//1. berekenen budget
		budgetCtrl.calculateBudget();

		//2. geeft budget terug
		var budget = budgetCtrl.getBudget();

		//3. laat het budget zien
		UICtrl.displayBudget(budget);
	};

	var ctrlAddItem = function(){
		var input, newItem;

		//hier worden alle gegevens uit de UI controller gehaald
		//het type, de descripton en value van getInput.
		//1 get the field input data
		input = UICtrl.getInput();
		
		//er moet iets ingevuld worden als description. Het mag geen leeg veld zijn
		//Nan staat voor not a number, er wordt gecheckt of er daadwerkelijk een nummer is ingevuld
		// de waarde moet hoger zijn dan 0
		if(input.description !== "" && !isNaN(input.value) && input.value > 0){


		//2 voeg item toe aan budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		//3 Voeg item toe aan UI
		UICtrl.addListItem(newItem, input.type);

		//4. leeg velden(description en value)
		UICtrl.legeVelden();
		
		//5. bereken en update budget
		updateBudget();


		}

	};

	return {
		init: function(){
			console.log('Applicatie is gestart.');
			setupEventListeners();
		}
	};

})(budgetController, UIController);


controller.init();


