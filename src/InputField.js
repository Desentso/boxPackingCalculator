import React, { Component } from 'react';

class InputField extends Component {
  constructor(props){
    super(props);

    this.state = {
      showInfo: "none"
    }
  }

  showInfo = () => {
    this.setState({showInfo: "inline-block"});
  }

  hideInfo = () => {
    this.setState({showInfo: "none"});
  }

  render() {

    let className = this.props.className || "input";
    let displayError = "none";

    //If error, add error class to show error text and styling
    if (this.props.error){

      className = className + " error";
      displayError = "block";
    }

    return (
      <span className="inputArea" style={this.props.style}>

        <div>
          <label className="label">{this.props.name}</label>

          <span onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo} className="info" >i</span>
          <div className="refPoint">
            <span className="infoBox" style={{display: this.state.showInfo}}>{this.props.info}</span>
          </div>
        </div>

        <input id={this.props.id} className={className} type={this.props.type} value={this.props.value} name={this.props.name} min={this.props.min} max={this.props.max} onClick={this.props.onClick} onChange={this.props.onChange}/>
        <span className="inputErrorText" style={{display: displayError}}>{this.props.errorText} </span>
      </span>
    )
  }
}

export default InputField;