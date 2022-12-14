import React = require('react');
import { storeComponent } from './store/store';
import { ITodo } from './types';
import TodoView from '../common-components/todo-view';

const store = storeComponent;
export const clickOnCheckbox = React.useCallback(
  (e: { target: { id: string } }) => {
    store.handleOnclickOnCheckbox(parseInt(e.target.id));
  },
  []
);

export const handleDeleteTodo = React.useCallback(
  (e: { target: { id: string } }) => {
    store.handleDelete(parseInt(e.target.id));
  },
  []
);

function arrayMapper(array: ITodo[]) {
  const list: any = { new: [], completed: [] };
  array.map((items: ITodo) => {
    let temp = (
      <TodoView
        todo={items}
        key={items.id}
        onClickCheckbox={clickOnCheckbox}
        onClickDelete={handleDeleteTodo}
      />
    );
    items.completed ? list.completed.push(temp) : list.new.push(temp);
  });

  return list;
}

export default React.memo(arrayMapper);
