import React from "react";
import PropTypes from "prop-types";
import Space from "./../layout/Space";



export default class Checkbox extends React.PureComponent {
  myRef = null;

  constructor(props) {
    // Call super class
    super(props);

    this.state={
    currentID: -1,
  }
}


  handleChange = (e) => {
    
    this.props.onChange(e.target.checked);
    this.state.currentID=this.props.id;
  //  window.alert(this.state.currentID+ " " + this.props.label + " " + this.props.value);
  };

  render() {
    const { id, checked, label,value } = this.props;

    return (

        <div>
        <label>
          {//id, value}
  }
        <input
          //id={"items"+id}
          id={id}
          ref={node => (this.myRef = node)}
          type="checkbox"
          checked={checked}
          value = {value}
          onChange={this.handleChange }
        />

        
        <Space n={3} />
          {label}
        </label>
      </div> 

      
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};