import React = require('react');
import styled from 'styled-components';

interface IButtonProp {
  name: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  value: string;
  id?: string;
  disabled?: boolean;
}

export function Button(props: IButtonProp) {
  const { name, type, onClick, value, id, disabled } = props;
  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export const MemoizedButton = React.memo(Button);
//
const StyledButton = styled.button`
border-radius:10px;
margin-bottom:10px;

color:white;
`;
