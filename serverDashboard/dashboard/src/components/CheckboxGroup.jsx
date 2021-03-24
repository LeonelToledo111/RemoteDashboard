import React from "react";
import ToggleGroup from "./ToggleGroup";
import Checkbox from "./Checkbox";

class CheckboxGroup extends React.PureComponent {

  sampleFunction(){
    window.alert("Que se arme el bailongo");
  }

  render() {
    const { items } = this.props;

    return (
      <ToggleGroup single={false}>
        {({ toggle, isOn }) => {
          return items.map((item, index) => {
            return (
              <div>
                <Checkbox
                  checked={isOn(index)}
                  onChange={() => toggle(index)}
                  {...item}
                />
              </div>
            );
          });
        }}
      </ToggleGroup>
    );
  }
}

export default CheckboxGroup;