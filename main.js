'use strict';

class Screen {

	constructor(id, initialArray) {
		this.screen = document.getElementById(id);
		this.elementsArray = [];
		this.iterationDelay = 300;
		this.colors = {
			current: '#ff0bbb',
			sorted: '#00ff00',
		};
		
		for(let size of initialArray) {
			let element = document.createElement('div');
			element.className = 'element';
			element.style.height = `${size}%`;

			this.elementsArray[this.elementsArray.length] = element;
			this.screen.appendChild(element);
		}
	}

	async display(array, currentIndex) {
		this.elementsArray[currentIndex].style.backgroundColor = this.colors.current;

		await new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, this.iterationDelay);
		});


		for(let i = 0; i < this.elementsArray.length; i++) {
			this.elementsArray[i].style.height = `${array[i]}%`;
		}

		this.elementsArray[currentIndex].style.backgroundColor = '';
	}

	setColors(colors) {
		if(!colors instanceof Object) {
			throw Error('colors must be an object');
		}

		if('current' in colors) {
			this.colors.current = colors.current;
		}
	}

	setIterationDelay(iterationDelay) {
		this.iterationDelay = iterationDelay;
	}
	
	getIterationDelay() {
		return this.iterationDelay;
	}
}


async function sort() {
	const ARRAY_SIZE  = 10;
	const array = new Array(ARRAY_SIZE);
	for(let i = 0; i < ARRAY_SIZE; i++) {
		array[i] = Math.ceil(Math.random() * 100);
	}

	const scr = new Screen('screen', array);
	scr.setColors({current: '#00ffff'});

	for(let i = 1; i < array.length; i++) {
		let key = array[i];

		let j = i - 1;
		while(j >= 0 && key < array[j]) {
			console.log(`STEP ${i}:${j} checking ${key} < ${array[j]} = ${key < array[j]}`);
			array[j + 1] = array[j];
			await scr.display(array, j);
			j--;
		}
		array[j + 1] = key;
		await scr.display(array, j + 1);
		console.log(array);
	}

}

sort();