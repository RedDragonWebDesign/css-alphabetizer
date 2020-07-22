// Copyright https://www.RedDragonWebDesign.com/
// Permission required to use or copy code. All rights reserved.

"use strict";

class CSSAlphabetizer {
	alphabetize(s) {
		// TODO: this._validate();
		// TODO: this._beautify(); using regex and replace of { , }
		
		let lines;
		lines = this._makeLinesArray(s);
		lines = this._sortSelectors(lines);
		lines = this._sortParameters(lines);
		s = this._makeString(lines);
		
		console.log(lines);
		
		return s;
	}
	
	_makeString(lines) {
		let s = "";
		for ( let line of lines ) {
			s += line[0] + "\n";
		}
		s = s.slice(0, s.length-1);
		return s;
	}
	
	_sortSelectors(lines) {
		
		
		return lines;
	}
	
	_sortParameters(lines) {
		
		
		return lines;
	}
	
	_makeLinesArray(s) {
		let lines = s.split("\n");
		let isBlock = false;
		let blockNumCounter = 0;
		// Make an array of arrays. [whitespace, trimmed, blockNum, isParameter]
		for ( let key in lines ) {
			let value = lines[key];
			if ( value.includes("{") ) {
				isBlock = true;
				blockNumCounter++;
			}
			let blockNum = isBlock ? blockNumCounter : 0;
			lines[key] = [
				value,
				value.trim(),
				blockNum,
				//isParameter
			];
			if ( value.includes("}") ) {
				isBlock = false;
			}
		}
		return lines;
	}
}

window.addEventListener('DOMContentLoaded', (e) => {
	let css = document.getElementById('css');
	let alphabetize = document.getElementById('alphabetize');
	
	// TODO: Test combo box.
	
	alphabetize.addEventListener('click', function(e) {
		let alphabetizer = new CSSAlphabetizer();
		css.value = alphabetizer.alphabetize(css.value);
	});
});