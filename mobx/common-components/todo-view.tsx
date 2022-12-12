import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from '../todo-app/types';
import { MemoizedInput } from '../custom-components';

interface IProps {
  todo: ITodo;
  onClick?: any;
}

function TodoView(props: IProps) {
  const { todo, onClick } = props;
  // console.log(todo.id.toString());
  // const id = todo.id ? todo.id.toString() : Date.now().toString();
  console.log(todo.completed);
  return (
    <div>
      <p key={todo.id}>
        <MemoizedInput
          type="checkbox"
          id={todo.id.toString()}
          onClick={onClick}
          checked={todo.completed}
        />
        {todo.todo}
      </p>
    </div>
  );
}

export default observer(TodoView);
