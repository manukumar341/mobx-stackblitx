import { observer } from 'mobx-react';
import React = require('react');

interface IProps {
  todo: string;
  completed: boolean;
  id: number;
}

function TodoView(props: IProps) {
  const { todo } = props;
  console.log('todo view');

  return (
    <div>
      <li>{todo}</li>
    </div>
  );
}

export default observer(TodoView);
