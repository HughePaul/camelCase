#!/usr/local/bin/node


var translate = {
	'Var': ' var ',
	'For': ' for( ',
	'While': ' while( ',
	'In': ' in ',
	'Do': ' ){\n ',
	'EndFor': ' } \n',
	'EndWhile': ' } \n',
	'Equals': ' = ',
	'If': ' if( ',
	'Then': ' ){\n',
	'ElseIf': ' } else if( ',
	'Else': ' } else {\n ',
	'EndIf': ' } \n',

	'BeginArray': ' [ ',
	'EndArray': ' ] ',
	'BeginObject': ' { ',
	'EndObject': ' } ',

	'BeginString': ' "',
	'EndString': '" ',
	'NewLine': ' \'\\n\' ',

	'True': ' true ',
	'False': ' false ',

	'And': ' && ',
	'Or': ' || ',

	'Dot': '.',
	'Comma': ',',
	'WhichIs': ':',
	'Next': ',',

	'Function': 'function ',
	'WithParameters': ' ( ',
	'EndParameters': ' ) ',
	'SubScript': ' [ ',
	'EndSubScript': ' ] ',
	'WithNoParameters': ' () ',
	'DefinedAs': ' {\n ',
	'EndOfFunctionDefinition': '}',
	'Stop': ' ;\n ',

	'IsMoreThan': ' > ',
	'IsMoreThanOrEqualTo': ' >= ',
	'IsLessThan': ' < ',
	'IsLessThanOrEqualTo': ' <= ',
	'DoubleEquals': ' == ',
	'TrippleEquals': ' === ',
	'NotEquals': ' != ',
	'NotDoubleEquals': ' !== ',
	'IsNot': ' !== ',
	'Is': ' === ',

	'End': ' } \n',

	'Undefined': ' undefined ',
	'Null': ' null ',
	'DividedBy': ' / ',
	'Times': ' * ',
	'MultipliedBy': ' * ',
	'Plus': ' + ',
	'Minus': ' - ',
	'Negative': ' -',
	'Point': '.',
	'Zero': 0,
	'One': 1,
	'Two': 2,
	'Three': 3,
	'Four': 4,
	'Five': 5,
	'Six': 6,
	'Seven': 7,
	'Eight': 8,
	'Nine': 9,
	'Ten': 10,
	'Eleven': 11,
	'Twelve': 12,
	'Thirteen': 13,
	'Fourteen': 14,
	'Fifteen': 15,
	'Sixteen': 16,
	'Seventeen': 17,
	'Eighteen': 18,
	'Nineteen': 19,
	'Twenty': 20,
	'Thirty': 30,
	'Fourty': 40,
	'Fifty': 50,
	'Sixty': 60,
	'Seventy': 70,
	'Eighty': 80,
	'Ninety': 90,
	'Hundred': 100,
	'Thousand': 1000,
	'Million': 1000000,
	'Billion': 1000000000
};

var code = '';

var source = require('fs').readFileSync('/dev/stdin', 'UTF-8');
source = source.replace(/[\n\s]/g,'');
source = source.substr(0,1).toUpperCase() + source.substr(1);

function matchReserved() {
	for(var r in translate) {
		if(source.substr(0,r.length) === r && source.substr(r.length,1).match(/^[A-Z]?$/)) {
			source = source.substr(r.length);
			return translate[r];
		}
	}
}

var m;
var number;
var fraction = 0;
var variable = '';
while( (m = source.match(/[A-Z][a-z0-9]*/)) ) {
	var part = m[0];
	var reserved = matchReserved();
	if(reserved !== undefined) {
		if(variable.length) {
			code += ' '+variable.substr(0,1).toLowerCase()+variable.substr(1)+' ';
			variable = '';
		}

		if(typeof reserved === 'number' || part === 'Point') {
			if(part === 'Point') {
				fraction++;
			} else if(fraction) {
				number += reserved / Math.exp(10, fraction);
				fraction++;
			} else {
				if(number === undefined) { number = 0; }
				if(reserved >= 100) {
					if(number === 0) { number = 1; }
					number *= reserved;
				} else {
					number += reserved;
				}
			}
		} else {
			if(number) {
				code += ' '+number+' ';
				number = undefined;
				fraction = 0;
			}

			code += reserved;
		}
	} else {
		source = source.substr(part.length);
		variable += part;
	}

}

console.warn('Code:', code);

eval(code);



