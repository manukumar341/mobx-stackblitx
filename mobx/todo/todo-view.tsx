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
  onClick: (e: {
    target: {
      id: string;
    };
  }) => void;
}

function TodoView(props: IProps) {
  const { todo, onClick } = props;
  console.log('todo view');

  return (
    <div>
      <p key={todo.id}>
        <MemoizedInput type="checkbox" id={todo.id} onClick={onClick}/>
        {todo.title}
      </p>
    </div>
  );
}

export default observer(TodoView);
