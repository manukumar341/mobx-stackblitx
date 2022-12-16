import React = require('react');
import { storeComponent } from './store/store';
import { ITodo } from './types';
import TodoView from '../common-components/todo-view';
import { observer } from 'mobx-react';

const store = storeComponent;
export const clickOnCheckbox = (e: { target: { id: string } }) => {
  store.handleOnclickOnCheckbox(parseInt(e.target.id));
};

export const handleDeleteTodo = (e: { target: { id: string } }) => {
  store.handleDelete(parseInt(e.target.id));
};

function ArrayMapper() {
  const temp = store.todosArray.map((items: ITodo) => {
    return (
      <TodoView
        todo={items}
        status={items.completed}
        key={items.id}
        onClickCheckbox={clickOnCheckbox}
        onClickDelete={handleDeleteTodo}
      />
    );
  });
  return <div>{temp}</div>;
}

export default observer(ArrayMapper);
