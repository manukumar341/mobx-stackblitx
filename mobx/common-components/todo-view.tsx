import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from '../todo-app/types';
import { MemoizedButton, MemoizedInput } from '../custom-components';
import styled from 'styled-components';

interface IProps {
  todo: ITodo;
  onClickCheckbox?: any;
  onClickDelete?: any;
  value?: string;
}

function TodoView(props: IProps) {
  const { todo, onClickCheckbox, onClickDelete, value } = props;
  // console.log(todo.id.toString());
  // const id = todo.id ? todo.id.toString() : Date.now().toString();
  return (
    <StyledDiv>
      <div key={todo.id}>
        <MemoizedInput
          type="checkbox"
          id={todo.id.toString()}
          onClick={onClickCheckbox}
          checked={todo.completed}
          value={value}
        />
        {todo.todo}
      </div>
      <MemoizedButton
        name="delete"
        value="X"
        type={'button'}
        id={todo.id.toString()}
        onClick={onClickDelete}
      />
    </StyledDiv>
  );
}

export default observer(TodoView);

const StyledDiv = styled.div`
margin-bottom:10px;
`;

const StyledButton = styled(MemoizedButton)`
border-radius:10px;
margin-bottom:10px;
color:white;
`;
