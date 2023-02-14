'use strict';

class Screen {

	constructor(id, initialArray) {
		this.screen = document.getElementById(id);
		this.elementsArray = [];
		this.iterationDelay = 300;
		this.colors = {
			currentColor: '#ff0bbb',
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
		this.elementsArray[currentIndex].style.backgroundColor = this.colors.currentColor;

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

		if('currentColor' in colors) {
			this.colors.currentColor = colors.currentColor;
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
	const array = [1, 90, 10, 30, 20, 60, 50, 100, 70, 80];
	const scr = new Screen('screen', array);
	scr.setColors({currentColor: '#00ffff'});

	for(let i = 0; i < array.length - 1; i++) {
		for(let j = i + 1; j > 0; j--) {
			if(array[j - 1] > array[j]) {
				const temp = array[j - 1];
				array[j - 1] = array[j];
				array[j] = temp;
				await scr.display(array, j);
			}
		}
	}
}

sort();