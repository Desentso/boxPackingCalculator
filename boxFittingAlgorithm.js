
/*const smallBag = {width: 16, height: 23, length: 2};
const mediumBag = {width: 22, height: 26, length: 2};
const bigBag = {width: 14, height: 26, length: 10};

const containerSize = ;

const smallBagsAmount = ;
const mediumBagsAmount = ;
const bigBagsAmount = ;

function newCont() {
	const cont = [];
	for (let y = 0; y < containerSize; y++){
		cont.push([]);
		for (let x = 0; x < containerSize; x++){
			if (!cont[y][x]) {
				cont[y].push([]);
			};
			for (let z = 0; z < containerSize; z++){
				cont[y][x][z] = 0;
			}
		}
	}
	return cont;
}

const containers = [newCont()];

console.log(cont);
/*containerSize / bigBag.width;
containerSize / bigBag.height;
containerSize / bigBag.length;

for (let i = 0; i < bigBagsAmount; i++) {

	let freeY = 0;
	let freeX = 0;
	let freeZ = 0;

	for (let y = 0; y < containerSize; y++){
		for (let x = 0; x < containerSize; x++){
			for (let z = 0; z < containerSize; z++){

				if (cont[y][x][z] == 0) {
					freeZ += 1;
				} else {
					freeZ = 0;
				}
			}
		}
	}
}*/












const smallBag = {width: 16, height: 23, length: 2};
const mediumBag = {width: 22, height: 26, length: 2};
const bigBag = {width: 14, height: 26, length: 10};

//for example
const boxSize = 100;
const bigBagsAmount = 240;
const mediumBagsAmount = 50;
const smallBagsAmount = 50;


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

const box = newBox();
const boxes = [box];
const spaceTaken = [];

function fitBags() {
	
	const bags = [{bags: bigBagsAmount, bag: bigBag, fits: 0, noFit: 0}, {bags: mediumBagsAmount, bag: mediumBag, fits: 0, noFit: 0}, {bags: smallBagsAmount, bag: smallBag, fits: 0, noFit: 0}];

	for (let type = 0; type < bags.length; type++){

		for (let i = 0; i < bags[type].bags; i++) {

			fitBag(box, bags[type].bag);

			let noSpace = true;
			nextBag:
			for (let y = 0; y < boxSize; y++){
				for (let z = 0; z < boxSize; z++){
					for (let x = 0; x < boxSize; x++){

						if (box[y][z][x] == 1){
							continue;
						}

						if (bagFits(box, x, y, z, bags[type].bag.width, bags[type].bag.height, bags[type].bag.length)) {

							//console.log("fits");
							bags[type].fits += 1;
							noSpace = false;
							break nextBag;

							
						}
					}
				}
			}

			if (noSpace) {
				//console.log("Didn't find space");
				bags[type].noFit += 1;
				//Create new box and place it there
			}
		}
	}

	console.log(boxSize);
	console.log(bags);

}


function bagFits(box, xp, yp, zp, width, height, length) {

	if (xp + width > boxSize || yp + height > boxSize || zp + length > boxSize){
		return false;
	} 

	let fits = true;
	for (let y = yp; y < yp + height; y++){
		for (let z = zp; z < zp + length; z++){
			for (let x = xp; x < xp + width; x++){

				if (box[y][z][x] == 0){

				} else {
					fits = false;
					//console.log("Y: " + y, "Z: " + z, "X: " + x);
					break;
				}
			}
		}
	}

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


fitBags();
