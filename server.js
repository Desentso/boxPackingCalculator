const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();


app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, resp) => {

	resp.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/estimateBoxes/:", (req, resp) => {

	/*const boxSize = ;

	const smallBags = ;
	const mediumBags = ; 
	const bigBags = ;*/

})
