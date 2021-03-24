import React from "react";
import ToggleGroup from "./ToggleGroup";
import Space from "./../layout/Space";

const Radio = ({ id, label, checked, onChange }) => {
  return (
    <label forHtml={id}>
      <input type="radio" checked={checked} onChange={onChange} />
      <Space n={3} />
      {label}
    </label>
  );
};

class RadioGroup extends React.PureComponent {
  render() {
    const { items } = this.props;

    return (
      <ToggleGroup>
        {({ toggle, isOn }) => {
          return items.map((item, index) => {
            return (
              <div>
                <Radio
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

export default RadioGroup;
