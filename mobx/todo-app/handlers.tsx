import React = require('react');
import { storeComponent } from './store/store';
import { ITodo } from './types';
import TodoView from '../common-components/todo-view';

const store = storeComponent;
export const clickOnCheckbox = (e: { target: { id: string } }) => {
  store.handleOnclickOnCheckbox(parseInt(e.target.id));
};

export const handleDeleteTodo = (e: { target: { id: string } }) => {
  store.handleDelete(parseInt(e.target.id));
};
interface IType {
  new: Array<JSX.Element>;
  completed: Array<JSX.Element>;
}
export const findId = (arr: any, id: number) => {
  let selectedTodo = arr.find((item) => id === item.id);
  return selectedTodo;
};
function arrayMapper(array: ITodo[]) {
  const list: IType = { new: [], completed: [] };
  const todoIds = [0];

  let temp: JSX.Element;
  array.map((items: ITodo) => {
    temp = (
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

export default arrayMapper;
