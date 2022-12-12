import { observer } from 'mobx-react';
import React = require('react');
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
      <li>{todo.title}</li>
    </div>
  );
}

export default observer(TodoView);
