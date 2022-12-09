import React = require('react');

interface IButtonProp {
  name: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  value: string;
}

export function Button(props: IButtonProp) {
  const { name, type, onClick, value } = props;
  console.log('button component');
  return (
    <button name={name} type={type} onClick={onClick}>
      {value}
    </button>
  );
}

// export default React.memo(Button);
//
