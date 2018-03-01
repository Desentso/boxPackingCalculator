const express = require("express");
const http = require("http");
const path = require("path");

const boxFittingAlgorithm = require("./boxFittingAlgorithm.js");



const app = express();

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.use(express.static(path.join(__dirname, 'build')));



app.get("/", (req, resp) => {

	resp.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/estimateBoxes", (req, resp) => {

	const boxSize = req.query.boxSize;

	const bigBags = req.query.bigBags;
	const mediumBags = req.query.mediumBags;
	const smallBags = req.query.smallBags;


	const data = boxFittingAlgorithm(boxSize, bigBags, mediumBags, smallBags);

	resp.send(JSON.stringify(data));
})
