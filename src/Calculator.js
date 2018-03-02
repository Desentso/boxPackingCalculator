import React, { Component } from 'react';
import InputField from "./InputField.js";

class Calculator extends Component {

	constructor(props) {
		super(props);

		this.state = {
			smallBagsAmount: 0,
			mediumBagsAmount: 0,
			bigBagsAmount: 0,

			boxSize: 0,

			smallBagsError: false,
			smallBagsErrorText: null,

			mediumBagsError: false,
			mediumBagsErrorText: null,

			bigBagsError: false,
			bigBagsErrorText: null,

			boxSizeError: false,
			boxSizeErrorText: null,
		}
	}

	smallBagsOnChange = e => this.setState({smallBagsAmount: e.target.value, smallBagsError: false, smallBagsErrorText: null})
	mediumBagsOnChange = e => this.setState({mediumBagsAmount: e.target.value, mediumBagsError: false, mediumBagsErrorText: null})
	bigBagsOnChange = e => this.setState({bigBagsAmount: e.target.value, bigBagsError: false, bigBagsErrorText: null})
	boxSizeOnChange = e => this.setState({boxSize: e.target.value, boxSizeError: false, boxSizeErrorText: null})

	onSubmit = () => {

		const data = {
			smallBags: this.state.smallBagsAmount,
			mediumBags: this.state.mediumBagsAmount,
			bigBags: this.state.bigBagsAmount,
			boxSize: this.state.boxSize
		}

		let errors = false;

		//Validate the data
		Object.keys(data).forEach(key => {

			if (isNaN(data[key])) {

				let errKey = key + "Error";
		        let errObj = {};
		        errObj[errKey] = true;
		        errObj[errKey + "Text"] = "Box Amount Must be a number";

		        this.setState(errObj);
		        errors = true;
			}

			if (data[key] < 0) {

				let errKey = key + "Error";
		        let errObj = {};
		        errObj[errKey] = true;
		        errObj[errKey + "Text"] = "Can't be smaller than zero";

		        this.setState(errObj);
		        errors = true;
			}
		})

		if (data.bigBags == 0 && data.mediumBags == 0 && data.smallBags == 0) {
			errors = true;
			this.setState({smallBagsError: true, smallBagsErrorText: "All Can't be zero", mediumBagsError: true, mediumBagsErrorText: "All Can't be zero", bigBagsError: true, bigBagsErrorText: "All Can't be zero", });
		}

		if (data.boxSize < 30 || data.boxSize > 100){
			this.setState({boxSizeError: true, boxSizeErrorText: "Box size must be between 30 and 100"});
			errors = true;
		}

		//If no errors get estimate from the server
		if (!errors) {
			
			this.setState({smallBagsError: false,mediumBagsError: false,bigBagsError: false, boxSizeError: false});
			this.props.setCalculating();

			fetch("/estimateBoxes?boxSize=" + data.boxSize + "&bigBags=" + data.bigBags + "&mediumBags=" + data.mediumBags + "&smallBags=" + data.smallBags)
			.then(resp => resp.json())
			.then(data => {
				if (data.error) {
					this.props.setAnswer([]);
					this.setState({boxSizeError: true, boxSizeErrorText: data.error});
				} else {
					this.props.setAnswer(data);
				}
			})
			.catch(err => {
				console.log(err);
				this.props.setAnswer([]);
				this.setState({boxSizeError: true, boxSizeErrorText: "Something went wrong"});
			})
		}
	}

  	render() {
	    return (
	    	<div style={{margin: "50px 0"}}>
				<InputField name="Small Bags" type="number" min="0" max="1000" value={this.state.smallBagsAmount} onChange={this.smallBagsOnChange} error={this.state.smallBagsError} errorText={this.state.smallBagsErrorText} info="200g bag, 16cm x 23cm x 2cm" />
				<InputField name="Medium Bags" type="number" min="0" max="1000" value={this.state.mediumBagsAmount} onChange={this.mediumBagsOnChange} error={this.state.mediumBagsError} errorText={this.state.mediumBagsErrorText} info="400g bag, 22cm x 26cm x 2cm" />
				<InputField name="Big Bags" type="number" min="0" max="1000" value={this.state.bigBagsAmount} onChange={this.bigBagsOnChange} error={this.state.bigBagsError} errorText={this.state.bigBagsErrorText} info="1000g bag, 14cm x 26cm x 10cm" />

				<InputField name="Box Size (cm)" type="number" min="30" max="100" style={{display: "block"}} onChange={this.boxSizeOnChange} error={this.state.boxSizeError} errorText={this.state.boxSizeErrorText} info="Size should be from 30 to 100 cm" />
				
				<button className="submit" onClick={this.onSubmit}>Submit</button>
			</div>
	    );
  	}
}

export default Calculator;
