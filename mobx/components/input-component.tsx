import React = require('react');

interface IInputProp {
  name: string;
  placeholder: string;
  onChange?: () => void;
  value?: string;
}

export function Input(props: IInputProp) {
  const { name, placeholder, onChange, value } = props;
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
