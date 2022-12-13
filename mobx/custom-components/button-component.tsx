import React = require('react');

interface IButtonProp {
  name: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  value: string;
  id: string;
}

export function Button(props: IButtonProp) {
  const { name, type, onClick, value, id } = props;
  return (
    <button name={name} type={type} onClick={onClick} id={id}>
      {value}
    </button>
  );
}

export const MemoizedButton = React.memo(Button);
//
