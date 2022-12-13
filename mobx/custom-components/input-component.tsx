import React = require('react');
import { MemoizedButton } from '.';

interface IInputProp {
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: (e: { target: { value: React.SetStateAction<string> } }) => void;
  onClick?: (e: any) => void;
  type: string;
  value?: string;
  checked?: boolean;
}

export function Input(props: IInputProp) {
  const { type, name, placeholder, onChange, value, onClick, id, checked } =
    props;

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
      value={value}
      defaultChecked={checked}
    />
  );
}

export const MemoizedInput = React.memo(Input);
