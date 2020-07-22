// Copyright https://www.RedDragonWebDesign.com/
// Permission required to use or copy code. All rights reserved.

"use strict";

// TODO: Experiment with TypeScript

class CSSAlphabetizer {
	alphabetize(s) {
		// TODO: this._validate();
		// TODO: this._beautify(); using regex and replace of { ; }
		let lines, blocks;
		// TODO: Can probably combine 1 or 2 of the below 3 loops. Reusing same loop = faster;
		lines = this._makeLinesArray(s);
		blocks = this._sortSelectors(lines);
		blocks = this._sortParameters(blocks);
		// TODO: blocks = this._addBlankLineBetweenBlocks(blocks);
		s = this._makeString(blocks);
		s = s.trim();
		return s;
	}
	
	_makeString(blocks) {
		// blocks => lines
		let lines = [];
		for ( let block of blocks ) {
			let lines2 = block[1];
			for ( let line of lines2 ) {
				lines.push(line);
			}
		}
		
		// lines => string
		let s = "";
		for ( let line of lines ) {
			s += line[0] + "\n";
		}
		s = s.slice(0, s.length-1);
		return s;
	}
	
	_sortSelectors(lines) {
		/** [parameterTrimmed, [line, line, line, line]] */
		let blocks = [];
		/** [line, line, line, line] **/
		let buffer = [];
		let lineNumTracker = 0;
		let parameterTrimmed = "";
		let len = lines.length;
		for ( let i = 0; i < len; i++ ) {
			let line = lines[i];
			let lineNum = line[2];
			if ( ! parameterTrimmed && line[1].search("{") !== -1 ) {
				parameterTrimmed = line[1];
			}
			if ( lineNum !== lineNumTracker ) {
				lineNumTracker++;
				blocks.push([parameterTrimmed, buffer]);
				buffer = [];
				parameterTrimmed = "";
			}
			buffer.push(line);
			// Last line. Finish the block.
			if ( i === len-1 ) {
				lineNumTracker++;
				blocks.push([parameterTrimmed, buffer]);
				buffer = [];
				parameterTrimmed = "";
			}
		}
		blocks = blocks.sort();
		return blocks;
	}
	
	_sortParameters(blocks) {
		
		
		
		
		console.log(blocks);
		
		
		return blocks;
	}
	
	/** Makes an array of arrays. [whitespace, trimmed, blockNum, isParameter]. Having unique block numbers will be important later, when we are alphabetizing things. */
	// TODO: Refactor from array to associative array? Easier to add/delete fields later without messing up other parts of the code.
	_makeLinesArray(s) {
		let lines = s.split("\n");
		let blockNum = 0;
		let isParameter = false;
		for ( let key in lines ) {
			let value = lines[key];
			if ( value.includes("}") ) {
				isParameter = false;
			}
			lines[key] = [
				value,
				value.trim(),
				blockNum,
				isParameter,
			];
			// When } is found, increment the block number. This keeps comment lines above grouped with that block.
			if ( value.includes("}") ) {
				blockNum++;
			}
			if ( value.includes("{") ) {
				isParameter = true;
			}
		}
		console.log(lines);
		return lines;
	}
}

window.addEventListener('DOMContentLoaded', (e) => {
	let css = document.getElementById('css');
	let alphabetize = document.getElementById('alphabetize');
	
	// TODO: Combo box that loads tests.
	
	alphabetize.addEventListener('click', function(e) {
		let alphabetizer = new CSSAlphabetizer();
		css.value = alphabetizer.alphabetize(css.value);
	});
});