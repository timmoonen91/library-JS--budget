# Library - Bereken jouw maandelijks budget

Waarvoor kun je deze library gebruiken?
Deze library zorgt ervoor dat je bepaalde inkomens en uitgaven makkelijk kunt bijhouden. Er zijn genoeg mensen die hier geen goed overzicht van hebben en middels deze manier is het mogelijk om het te gebruiken. Tevens zorg je voor inzicht in je geldzaken.

Hoe installeer je deze library?
1.	Download de library, deze heet budget.js
2.	Kopieer en gebruik onderstaande HTML code om alles aan te kunnen sturen
3.	<script src="budget.js"></script> voeg dit toe onderaan je html bestand voordat de body sluit(</body>)
4.	Kopieer alles tussen de head en body om het te kunnen gebruiken.


De HTML code:

    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600" rel="stylesheet" type="text/css">
        <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
        <link type="text/css" rel="stylesheet" href="style.css">
       
    </head>

    <body>
        
        <div class="top">
            <div class="budget">
                <div class="budget__title">
                    Beschikbaar Budget in <span class="budget__title--month">Juni</span>:
                </div>
                
                <div class="budget__value">+ 0,00</div>
                
                <div class="budget__income clearfix">
                    <div class="budget__income--text">Inkomen</div>
                    <div class="right">
                        <div class="budget__income--value">0,00</div>
                      
                    </div>
                </div>
                
                <div class="budget__expenses clearfix">
                    <div class="budget__expenses--text">Uitgaven</div>
                    <div class="right clearfix">
                        <div class="budget__expenses--value">0,00</div>
              
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="add">
                <div class="add__container">
                    <select class="add__type">
                        <option value="inc" selected>Inkomen</option>
                        <option value="exp">Uitgaven</option>
                    </select>
                    <input type="text" class="add__description" placeholder="Voeg iets toe">
                    <input type="number" class="add__value" placeholder="Waarde">
                   <button class="add__btn"><i class="ion-ios-checkmark-outline"></i></button>
                </div>
            </div>
            
            <div class="container clearfix">
                <div class="income">
                    <h2 class="icome__title">Inkomen</h2>
                     <div class="income__list">

                    </div>
                </div>

              <div class="expenses">
                    <h2 class="expenses__title">Uitgaven</h2>
                    
                    <div class="expenses__list">
                    </div>
                </div>
            </div>     
        </div>   
    </body>



de link van mijn demo: http://i292704.hera.fhict.nl/inkomen_uitgaven/





