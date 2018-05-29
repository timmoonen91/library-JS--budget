//budget controller
var budgetController = (function(){

	// hier komt nog code
})();



//ui controller
var UIController = (function(){

	//hier komt nog code

})();


//global app controller
var controller = (function(bugetCtrl, UICtrl) {

	document.querySelector('.add__btn').addEventListener('click', function(){

		//1. get field input data

		//2. add item to controller

		//3. add item to UI

		//4. calculate

		//5. display budget


	});

	document.addEventListener('keypress', function(event){
	
		if(event.keyCode === 13 || event.which === 13){
			console.log('ENTER is ingedrukt');
		}

	});

})(budgetController, UIController);

