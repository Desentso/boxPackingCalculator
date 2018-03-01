import React, { Component } from 'react';

class InputField extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let className = this.props.className || "input";
    let displayError = "none";

    if (this.props.error){

      className = className + " error";
      displayError = "block";
    }

    return (
      <span className="inputArea" style={this.props.style}>
        <label className="label">{this.props.name}</label>
        <input id={this.props.id} className={className} type={this.props.type} value={this.props.value} name={this.props.name} min={this.props.min} max={this.props.max} onClick={this.props.onClick} onChange={this.props.onChange}/>
        <span className="inputErrorText" style={{display: displayError}}>{this.props.errorText} </span>
      </span>
    )
  }
}

export default InputField;