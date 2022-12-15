import React = require('react');
import styled from 'styled-components';

interface IButtonProp {
  name: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  value: string;
  id?: string;
}

export function Button(props: IButtonProp) {
  const { name, type, onClick, value, id } = props;
  return (
    <StyledButton name={name} type={type} onClick={onClick} id={id}>
      {value}
    </StyledButton>
  );
}

export const MemoizedButton = React.memo(Button);
//
const StyledButton = styled.button`
border-radius:10px;
margin-bottom:10px;

color:white;
`;
