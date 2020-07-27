// Copyright https://www.RedDragonWebDesign.com/
// Permission required to use or copy code. All rights reserved.

"use strict";

class CSSAlphabetizer {
	alphabetize(s) {
		let lines, blocks;
		
		// TODO: this._validate();
		// TODO: this._beautify(); using regex and replace of { ; }
		
		lines = this._makeLinesArray(s);
		blocks = this._sortSelectors(lines);
		blocks = this._sortParameters(blocks);
		
		s = this._makeString(blocks);
		s = this._addBlankLineBetweenBlocks(s);
		s = s.trim();
		
		return s;
	}
	
	_addBlankLineBetweenBlocks(s) {
		return s.replace(/}\n([^\n])/, "}\n\n$1");
	}
	
	_makeString(blocks) {
		// blocks => lines
		let lines = [];
		for (let block of blocks) {
			let lines2 = block[1];
			for (let line of lines2) {
				lines.push(line);
			}
		}
		
		// lines => string
		let s = "";
		for (let line of lines) {
			s += line[1] + "\n";
		}
		s = s.slice(0, s.length-1);
		return s;
	}
	
	_sortSelectors(lines) {
		/** [parameterTrimmed, [line, line, ...line]] */
		let blocks = [];
		/** [line, line, ...line] **/
		let buffer = [];
		let lineNumTracker = 0;
		let parameterTrimmed = "";
		let len = lines.length;
		
		for (let i = 0; i < len; i++) {
			let line = lines[i];
			let lineNum = line[2];
			
			if (! parameterTrimmed && line[0].includes("{")) {
				parameterTrimmed = line[0];
			}
			
			if (lineNum !== lineNumTracker) {
				lineNumTracker++;
				blocks.push([parameterTrimmed, buffer]);
				buffer = [];
				parameterTrimmed = "";
			}
			
			buffer.push(line);
			
			// Last line. Finish the block.
			if (i === len-1) {
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
		for (let key in blocks) {
			let lines = blocks[key][1];
			let lineBuffer = [];
			let sortBuffer = [];
			
			for (let line of lines) {
				let isParameter = line[3];
				
				if (isParameter) {
					sortBuffer.push(line);
				} else {
					if (sortBuffer) {
						sortBuffer = sortBuffer.sort();
						lineBuffer = lineBuffer.concat(sortBuffer);
					}
					
					lineBuffer.push(line);
				}
			}
			
			blocks[key][1] = lineBuffer;
		}
		console.log(blocks);
		return blocks;
	}
	
	/** Makes an array of lines. Outer level [line, line, ...line]. Inner level [string trimmed, string notTrimmed, int blockNum, bool isParameter]. Having unique block numbers will be important later, when we are alphabetizing things. */
	_makeLinesArray(s) {
		// TODO: refactor to use associative array, more readable code, and less likely to have bugs if later we want to add/change/delete fields
		let lines = s.split("\n");
		let blockNum = 0;
		let isParameter = false;
		
		for (let key in lines) {
			let value = lines[key];
			
			if (value.includes("}")) {
				isParameter = false;
			}
			
			lines[key] = [
				// Trimmed line in first spot. Important for sorting.
				value.trim(),
				value,
				blockNum,
				isParameter,
			];
			
			// When } is found, increment the block number. This keeps comment lines above block grouped with that block.
			if (value.includes("}")) {
				blockNum++;
			}
			
			if (value.includes("{")) {
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