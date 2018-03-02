
function boxFittingAlgorithm(boxSizeInput, bigBags, mediumBags, smallBags) {

	const smallBag = {width: 16, height: 23, length: 2};
	const mediumBag = {width: 22, height: 26, length: 2};
	const bigBag = {width: 14, height: 26, length: 10};

	const boxSize = boxSizeInput;
	const bigBagsAmount = bigBags;
	const mediumBagsAmount = mediumBags;
	const smallBagsAmount = smallBags;

	const box = newBox();
	const boxes = [box];


	//Create an array that has all the possible points of the box
	function newBox() {
		const cont = [];
		for (let y = 0; y < boxSize; y++){
			cont.push([]);
			for (let x = 0; x < boxSize; x++){

				if (!cont[y][x]) {
					cont[y].push([]);
				};

				for (let z = 0; z < boxSize; z++){
					cont[y][x][z] = 0;
				}
			}
		}
		return cont;
	}


	function fitBags() {
		
		const bags = [{bags: bigBagsAmount, bag: bigBag, fits: 0, noFit: 0}, {bags: mediumBagsAmount, bag: mediumBag, fits: 0, noFit: 0}, {bags: smallBagsAmount, bag: smallBag, fits: 0, noFit: 0}];

		//Go through the bags starting from the biggest
		for (let type = 0; type < bags.length; type++){
			for (let i = 0; i < bags[type].bags; i++) {

				nextBag:
				for (let b = 0; b < boxes.length; b++){

					if (fitBag(boxes[b], bags[type])) {
						break nextBag;
					} else {
						//If no more boxes, create new box and fit the bag there
						if (b == boxes.length - 1){
							const freeBox = newBox();
							boxes.push(freeBox);
							fitBag(freeBox, bags[type]);
							break nextBag;
						}
					}
				}

			}
		}

		return boxes.length;
	}


	//const rotations = [[bag.width, bag.height, bag.length], [bag.height, bag.width, bag.length], [bag.height, bag.length, bag.width], [bag.length, bag.height, bag.width]]

	function fitBag(box, bagData) {

		let noSpace = true;
		nextBag:
		for (let y = 0; y < boxSize; y++){
			for (let z = 0; z < boxSize; z++){
				for (let x = 0; x < boxSize; x++){

					if (box[y][z][x] == 1){
						continue;
					}

					const bag = bagData.bag;

					//Check all the possible rotations
					if (bagFits(box, x, y, z, bag.width, bag.height, bag.length)) {

						bagData.fits += 1;
						noSpace = false;
						break nextBag;						
					}
					//rotate w to h and h to w
					if (bagFits(box, x, y, z, bag.height, bag.width, bag.length)) {

						bagData.fits += 1;
						noSpace = false;
						break nextBag;	
					}
					//rotate w to h, h to l and l to w
					if (bagFits(box, x, y, z, bag.height, bag.length, bag.width)) {

						bagData.fits += 1;
						noSpace = false;
						break nextBag;					 	
					}
					//rotate w to l and l to w
					if (bagFits(box, x, y, z, bag.length, bag.height, bag.width)) {

						bagData.fits += 1;
						noSpace = false;
						break nextBag;						
					}
					//rotate w to l , h to w and l to w
					if (bagFits(box, x, y, z, bag.length, bag.width, bag.height)) {

						bagData.fits += 1;
						noSpace = false;
						break nextBag;						
					}
					//rotate h to l and l to h
					if (bagFits(box, x, y, z, bag.width, bag.length, bag.height)) {

						bagData.fits += 1;
						noSpace = false;
						break nextBag;
					}
				}
			}
		}

		if (noSpace) {

			bagData.noFit += 1;
			//Try another box or create a new box and place it there
			return false;
		}

		return true;
	}


	function bagFits(box, xp, yp, zp, width, height, length) {

		//If over of the box's edges
		if (xp + width > boxSize || yp + height > boxSize || zp + length > boxSize){
			return false;
		} 

		let fits = true;
		for (let y = yp; y < yp + height; y++){
			for (let z = zp; z < zp + length; z++){
				for (let x = xp; x < xp + width; x++){

					if (box[y][z][x] != 0){

						fits = false;
						break;
					}
				}
			}
		}

		//If found spot, set the space as reserved
		if (fits) {
			for (let y = yp; y < yp + height; y++){
				for (let z = zp; z < zp + length; z++){
					for (let x = xp; x < xp + width; x++){

						box[y][z][x] = 1;
					}
				}
			}
		}

		return fits;
	}

	//Calculate how much of the box is filled
	function getFilledArea () {

		let free = 0;
		let all = 0;

		const boxesData = [];

		for (let b = 0; b < boxes.length; b++){

			let free = 0;
			let all = 0;
			for (let y = 0; y < boxSize; y++){
				for (let z = 0; z < boxSize; z++){
					for (let x = 0; x < boxSize; x++){

						if (boxes[b][y][z][x] == 0){
							free += 1;
						}

						all += 1;
					}
				}
			}
			//console.log("BOX " + b + " FILLED: " + ((1 - (free/all))*100).toFixed(2) + "%" );
			boxesData[b] = {};
			boxesData[b].filled = 1 - (free/all);
			//boxesData[b].free = free;
			//boxesData[b].all = all;
			//boxesData[b].box = boxes[b];
		}

		return boxesData;
	}


	const boxesLength = fitBags();
	const boxesData = getFilledArea();

	//console.log(boxesData);

	return boxesData;
}

module.exports = boxFittingAlgorithm;