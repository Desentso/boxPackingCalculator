import React, { Component } from 'react';

class Answer extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

  	render() {

  		if (this.props.boxesData.length == 0){
  			return null;
  		}

  		const data = [];
  		for (let i = 0; i < this.props.boxesData.length; i++){

  			data.push(<p>Box {i + 1}: {(this.props.boxesData[i].filled*100).toFixed(2)} %</p>)
  		}

	    return (
	    	<div>
	    		<h2>You will need {this.props.boxesData.length} boxes to pack all the bags.</h2>
	    		<h3>Boxes Fill Percentage: </h3>
	    		{data}
			</div>
	    );
  	}
}

export default Answer;
