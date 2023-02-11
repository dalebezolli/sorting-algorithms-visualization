'use strict';

class Screen {
	screen;
	elementsArray;

	constructor(id, initialArray) {
		this.screen = document.getElementById(id);
		this.elementsArray = [];
		
		for(let size of initialArray) {
			let element = document.createElement('div');
			element.className = 'element';
			element.style.height = `${size}%`;

			this.elementsArray[this.elementsArray.length] = element;
			this.screen.appendChild(element);
		}
	}

	async display(array, delay) {
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, delay);
		});

		for(let i = 0; i < this.elementsArray.length; i++) {
			this.elementsArray[i].style.height = `${array[i]}%`;
		}
	}
}


async function sort() {
	const array = [1, 90, 10, 30, 20, 60, 50, 100, 70, 80];
	const scr = new Screen('screen', array);

	for(let i = 0; i < array.length - 1; i++) {
		for(let j = i + 1; j > 0; j--) {
			if(array[j - 1] > array[j]) {
				const temp = array[j - 1];
				array[j - 1] = array[j];
				array[j] = temp;
				await scr.display(array, 300);
			}
		}
	}
}

sort();