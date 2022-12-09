import { observer } from 'mobx-react';
import React = require('react');
import { store } from './store';
import TodoView from './todo/todo-view';
import UserInput from './todo/user-input';

function Todos() {
  return (
    <div>
      <UserInput />
      {store.getterValue.map((items) => {
        return (
          <TodoView
            todo={items.title}
            completed={items.completed}
            id={items.id}
            key={items.id}
          />
        );
      })}
    </div>
  );
}
export default observer(Todos);
