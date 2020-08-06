// Copyright https://www.RedDragonWebDesign.com/
// Permission required to use or copy code. All rights reserved.

"use strict";

/*
CSS Terminology
This whole thing is a rule:

selector {
	declaration;
	declaration;
}
*/

class CSSAlphabetizer {
	alphabetize(s) {
		try {
			let lines, rules;
			
			// TODO: this._validate();
			// TODO: this._beautify(); using regex and replace of { ; }
			
			lines = this._makeLinesArray(s);
			rules = this._sortSelectors(lines);
			rules = this._sortDeclarations(rules);
			
			s = this._makeString(rules);
			s = this._addBlankLineBetweenRules(s);
			s = s.trim();
			
			return s;
		} catch {
			return 'Error';
		}
	}
	
	_addBlankLineBetweenRules(s) {
		// Replace } enter text with } enter enter text
		return s.replace(/}\r?\n(?=[^\r\n])/, "}\n\n");
	}
	
	_makeString(rules) {
		// rules => lines
		const lines = rules.map(rule => rule[1]).flat(); 
		
		// lines => string
		return lines.map(line=>line[1]).join("\n");
	}
	
	_sortSelectors(lines) {
		/** [declarationTrimmed, [line, line, ...line]] */
		let rules = [];
		/** [line, line, ...line] **/
		let buffer = [];
		let lineNumTracker = 0;
		let declarationTrimmed = "";
		let len = lines.length;
		
		for (let i = 0; i < len; i++) {
			let line = lines[i];
			let lineNum = line[2];
			
			if (! declarationTrimmed && line[0].includes("{")) {
				declarationTrimmed = line[0];
			}
			
			if (lineNum !== lineNumTracker) {
				lineNumTracker++;
				rules.push([declarationTrimmed, buffer]);
				buffer = [];
				declarationTrimmed = "";
			}
			
			buffer.push(line);
			
			// Last line. Finish the rule.
			if (i === len-1) {
				lineNumTracker++;
				rules.push([declarationTrimmed, buffer]);
				buffer = [];
				declarationTrimmed = "";
			}
		}
		
		rules = rules.sort();
		
		return rules;
	}
	
	_sortDeclarations(rules) {
		for (let key in rules) {
			let lines = rules[key][1];
			let lineBuffer = [];
			let sortBuffer = [];
			
			for (let line of lines) {
				let isDeclaration = line[3];
				
				if (isDeclaration) {
					sortBuffer.push(line);
				} else {
					// If last line
					if (sortBuffer.length) {
						sortBuffer = sortBuffer.sort();
						lineBuffer = lineBuffer.concat(sortBuffer);
					}
					
					lineBuffer.push(line);
				}
			}
			
			rules[key][1] = lineBuffer;
		}
		console.log(rules);
		return rules;
	}
	
	/** Makes an array of lines. Outer level [line, line, ...line]. Inner level [string trimmed, string notTrimmed, int ruleNum, bool isDeclaration]. Having unique rule numbers will be important later, when we are alphabetizing things. */
	_makeLinesArray(s) {
		// TODO: refactor to use associative array, more readable code, and less likely to have bugs if later we want to add/change/delete fields
		let lines = s.split("\n");
		let ruleNum = 0;
		let isDeclaration = false;
		
		for (let key in lines) {
			let value = lines[key];
			
			if (value.includes("}")) {
				isDeclaration = false;
			}
			
			lines[key] = [
				// Trimmed line in first spot. Important for sorting.
				value.trim(),
				value,
				ruleNum,
				isDeclaration,
			];
			
			// When } is found, increment the rule number. This keeps comment lines above rule grouped with that rule.
			if (value.includes("}")) {
				ruleNum++;
			}
			
			if (value.includes("{")) {
				isDeclaration = true;
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