import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from '../todo-app/types';
import { MemoizedButton, MemoizedInput } from '../custom-components';

interface IProps {
  todo: ITodo;
  onClickCheckbox?: any;
  onClickDelete?: any;
}

function TodoView(props: IProps) {
  const { todo, onClickCheckbox, onClickDelete } = props;
  // console.log(todo.id.toString());
  // const id = todo.id ? todo.id.toString() : Date.now().toString();
  console.log(todo.completed);
  return (
    <div>
      <div key={todo.id}>
        <MemoizedInput
          type="checkbox"
          id={todo.id.toString()}
          onClick={onClickCheckbox}
          checked={todo.completed}
        />
        {todo.todo}
      </div>
      {todo.completed ? (
        <MemoizedButton
          name="delete"
          value="delete"
          type={'button'}
          onClick={onClickDelete}
        />
      ) : null}
    </div>
  );
}

export default observer(TodoView);
