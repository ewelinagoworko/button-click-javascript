'use strict';

//wywolujemy funkcje onclick na button'ie, zeby wywolala sie nasza funkcja pobierajaca nasze dane:
document.getElementsByTagName('button')[0].onclick = function() {
	
	//tworzymy nową instancję obiektu XML Http Request:
	var dane = new XMLHttpRequest();

	//metoda open - definiujemy parametry połączenia (jaka metoda, jaki adres URL i czy ma byc asychroniczne):
	//GET - metoda do nawiązania połączenia:
	//true - odnosi sie do tego, czy ma byc asynchroniczne czy nie
	dane.open('GET', 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl', true);

	//funkcja onreadystatechange sprawdza, czy sie zmienil stan naszego obiektu:
	dane.onreadystatechange = function() {
	
	//dopiero w momencie, kiedy mamy zwrocone dane (stan = 4), to dopiero mozemy zaczac w tym momencie wykonywac operacje na tych danych - tutaj wykonujemy operacje na danych:
		if (dane.readyState == 4 && (dane.status >= 200 && dane.status < 300 || dane.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof dane.status == 'undefined')) {//sprawdzamy status naszego serwera, czy nie wyrzuca bledow typu 400, 200, 300, a jak nie wyrzuca to jest okej
		
			var pobraneDane = dane.responseText; // <- tutaj definiujemy, jakie dane pobieramy
			
			//zmien dane tekstowe na obiekt JSON:
			var jsonObj = JSON.parse(pobraneDane);
			
			console.log(jsonObj);
		
			//tworze paragrafy, bo nie ma ich w strukturze mojego kodu HTML:
			var parID = document.createElement('p');
			var parName = document.createElement('p');
			var parURL = document.createElement('p');
		
			//wrzucam dane do utworzonych (wyzej) przeze mnie paragrafow:
			parID.innerHTML = "User ID " + jsonObj.userId;
			parName.innerHTML = "User Name " + jsonObj.userName;
			parURL.innerHTML = "User URL " + jsonObj.userURL;
			
			//teraz wrzucam to, co utworzylam (wyzej) do mojego dokumentu HTML:
			document.body.appendChild(parID);
			document.body.appendChild(parName);
			document.body.appendChild(parURL);
		
		//po zakonczeniu operacji usuń obiekt:
		dane = null;
		
		}

	}


	dane.send(); //wysylamy zapytanie do serwera

	
}

//zmieniamy technologię - przechodzimy z javascript (to, co wyzej napisane, to w JS) na jQuery - AJAX w jQuery:

$('button').eq(1).click(function() {
	
//nawiązujemy połączenie:
	$.getJSON('http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl', function(dane){
		console.log(dane);
		
			//tworze paragrafy, bo nie ma ich w strukturze mojego kodu HTML:
			var parID = document.createElement('p');
			var parName = document.createElement('p');
			var parURL = document.createElement('p');
		
			//wrzucam dane do utworzonych (wyzej) przeze mnie paragrafow:
			parID.innerHTML = "User ID " + dane.userId;
			parName.innerHTML = "User Name " + dane.userName;
			parURL.innerHTML = "User URL " + dane.userURL;
			
			//teraz wrzucam to, co utworzylam (wyzej) do mojego dokumentu HTML:
			document.body.appendChild(parID);
			document.body.appendChild(parName);
			document.body.appendChild(parURL);
		
	});
	
});
	

















