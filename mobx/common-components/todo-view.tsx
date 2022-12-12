import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from '../todo-app/types';
import { MemoizedInput } from '../custom-components';

interface IProps {
  todo: ITodo;
  onClick: (e: {
    target: {
      id: string;
    };
  }) => void;
}

function TodoView(props: IProps) {
  const { todo, onClick } = props;
  console.log('todo view');
  console.log(todo.id.toString());
  return (
    <div>
      <p key={todo.id}>
        <MemoizedInput
          type="checkbox"
          id={todo.id.toString()}
          onClick={onClick}
        />
        {todo.todo}
      </p>
    </div>
  );
}

export default observer(TodoView);
