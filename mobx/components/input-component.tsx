import React = require('react');
import { MemoizedButton } from '.';

interface IInputProp {
  name?: string;
  placeholder?: string;
  onChange?: (e: { target: { value: React.SetStateAction<string> } }) => void;
  type: string;
  value?: string;
}

export function Input(props: IInputProp) {
  const { type, name, placeholder, onChange, value } = props;
  console.log('input component');

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export const MemoizedInput = React.memo(Input);
