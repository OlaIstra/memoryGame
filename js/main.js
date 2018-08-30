window.onload = function () {
	const 	size = 4,						
			timerShowAllCards = 5000,		
			timerShowCouple = 1000,		
			numAllCards = 52;				

	let numHalfCards = 8,	
		countTry = 0,
		arrayFull = [],				
		arrCards = [],				
		tdArr = [],					
		cards = [],					
		back = [],
		memoryBoard,
		memoryArr = [],
		tempTd = [0];


	//update the page & start new game
	const button = document.querySelector('button');
	button.onclick = function() {						
		location.reload();
	}

	const spanTry = document.querySelector('.try');

	//shuffle elements
	function compareRandom(a, b) {
	  return Math.random() - 0.5;
	}

	//to get a random number
	function getRandomN() {
		return Math.ceil(Math.random() * numAllCards);	
	}
	
	//array of 16 images
	function getRandomImages() {
		
		for( let image, i = 1; i <= numAllCards; i++ ) {
			image = new Image();
		    image.src = "img/" + i + ".png";
		    image.setAttribute('class','card');
		    arrayFull.push(image);
		};
		
		for (i = 0; i < numHalfCards; i++) {
			arrCards.push(arrayFull[getRandomN()]);
			arrCards[i].setAttribute('data-number','' + i + '');
		}
		
		arrCards = arrCards.concat(arrCards);
		arrCards.sort(compareRandom);
		return arrCards;
	};
	
	getRandomImages();

	//tanble 4x4
	function getTable(arrCards) {
		const table = document.createElement('table');
		const tbody = table.appendChild(document.createElement('tbody'));
		let tr;
		let td;
		//create rows
		for (i = 0; i < size; i++) {
			tr = document.createElement('tr');
			tbody.appendChild(tr);
		}
		//create cells
		const trArr = tbody.getElementsByTagName('tr');
		for (i = 0; i < trArr.length; i++) {
			for (j = 0; j < size; j++) {
				td = document.createElement('td');
				td.setAttribute('data-td-number',''+ i + '' + j + '');
				trArr[i].appendChild(td);
			}
		}
		
		memoryBoard = document.querySelector('#memory_board');
		memoryBoard.appendChild(table);
		tdArr = document.querySelectorAll('td');
		for (i = 0; i < tdArr.length; i++) {
			const newNode = arrCards[i].cloneNode(true);
      		tdArr[i].appendChild(newNode);
		}		
	}
	getTable(arrCards);

	//to show cardback
	function showCardBack() {
		
		for (i = 0; i < tdArr.length; i++) {
			tdArr[i].innerHTML += '<img src = img/cardback.png class = "back hidden" style = "width: 89 px, height: 134 px">';
		}
		
		cards = document.querySelectorAll('.card');
		for (i = 0; i < cards.length; i++) {
			cards[i].classList.toggle('hidden');
		}
		
		back = document.querySelectorAll('.back');
		for (i = 0; i < back.length; i++) {
			back[i].classList.toggle('hidden');
		}
		return tdArr;
	}
	setTimeout(showCardBack,timerShowAllCards);

	//handler
	function memoryClick(e) {
			
			if (!e.target.parentElement.hasAttribute('data-lock')) {	

				if (e.target.parentElement.tagName == "TD") {	
					//push data-attribute to the array
					tempTd.push(e.target.parentElement.getAttribute('data-td-number'));
				
					e.target.parentNode.firstElementChild.classList.toggle('hidden');
					e.target.parentNode.lastElementChild.classList.toggle('hidden');
					memoryArr.push(e.target.parentNode.firstElementChild);

					if ((memoryArr.length === 2) )  {
						
						countTry++;
						spanTry.innerHTML = countTry;

						//data-lock is needed for making some elements unclickable
						if ((memoryArr[0].getAttribute('data-number') === memoryArr[1].getAttribute('data-number'))&& (tempTd[2] !== tempTd[1])) {
							memoryArr[0].parentElement.setAttribute('data-lock','true');
							memoryArr[1].parentElement.setAttribute('data-lock','true');
							memoryArr = [];
							numHalfCards--;
							
							
							if (numHalfCards === 0) {
								setTimeout(function() {
									alert(`You're the WINNER! You,ve used ${countTry} attmpts`)
								}, 1000)};					
						} else {
							
							//remove handler to prevent not needed clicks
							memoryBoard.removeEventListener("click", memoryClick);
							//in 2 sec return handler to continue the game
							setTimeout(function() {
	 							memoryArr[0].classList.toggle('hidden');
								memoryArr[0].nextElementSibling.classList.toggle('hidden');
								memoryArr[1].classList.toggle('hidden');
								memoryArr[1].nextElementSibling.classList.toggle('hidden');
								memoryArr = [];
								memoryBoard.addEventListener('click', memoryClick);
								tempTd=[0];
							}, timerShowCouple);
						}

					}
				}			
			}

	}


	memoryBoard.addEventListener('click', memoryClick);


}

