import React = require('react');

interface IButtonProp {
  name: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  value: string;
}

export function Button(props: IButtonProp) {
  const { name, type, onClick, value } = props;
  return <button name={name} type={type} onClick={onClick} value={value} />;
}
