import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedInput } from '../components';
interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

interface IProps {
  todo: ITodo;
}

function TodoView(props: IProps) {
  const { todo } = props;
  console.log('todo view');

  return (
    <div>
      <p key={todo.id}>
        <MemoizedInput type="checkbox" />
        {todo.title}
      </p>
    </div>
  );
}

export default observer(TodoView);
