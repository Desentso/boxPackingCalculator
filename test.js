const boxFittingAlgorithm = require("./boxFittingAlgorithm.js");

let testCases = [];
let results = [];

for (let i = 0; i < 1000; i++){

	const bigs = Math.round(Math.random() * 100);
	const mediums = Math.round(Math.random() * 100);
	const smalls = Math.round(Math.random() * 100);

	const boxSize = Math.round((Math.random() * 70) + 30);

	//testCases.push({boxSize: boxSize,bigs: bigs, mediums: mediums, smalls: smalls});
	const result = boxFittingAlgorithm(boxSize, bigs, mediums, smalls);
	if (result.length > 1) {
		testCases.push({boxSize: boxSize,bigs: bigs, mediums: mediums, smalls: smalls});
		results.push((result[0].filled*100));//.toFixed(2));
	}
}

let total = 0;
let entries = 0;

for (let i = 0; i < testCases.length; i++){
	console.log("INPUT: ", testCases[i] , "OUTPUT: " + results[i]);
	total += results[i];
	entries += 1;
}

console.log(total);
console.log(entries);
console.log(total / entries);


console.log("AVERAGE FILL %: ", (total / entries).toFixed(2));