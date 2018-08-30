window.onload=function(){
	let size=4
		timerAllCards=0,
		timerCoupleCards=0,
		numAllCards=52,
		numCards=16,
		numHalfCards=8,
		countMistake=0,
		arrayFull=[],
		randomNum=0,
		arrCards=[];

	function createImg(n){		
		for (i=0;i<n;i++){
			arrCards.push(document.createElement('img'))
		};
		console.log(arrCards);
		return arrCards;
	}

	createImg(numCards);

	function addToPage(arr){
		for(i=0;i<arr.length;i++){
			document.body.appendChild(arr[i]);
		}
	}

	addToPage(arrCards);
}

