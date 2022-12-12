import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from './types';
import { store } from './store';
import Counter from '../common-components/counter';
import TodoView from '../common-components/todo-view';
import UserInput from './user-input';

function Todos() {
  console.log('todos');

  const clickOnCheckbox = React.useCallback((e: { target: { id: string } }) => {
    console.log(e.target.id);
    store.handleOnclickOnCheckbox(parseInt(e.target.id));
  }, []);

  const getCounts = React.useCallback(() => {
    let couters: any = [];
    for (let key in store.data) {
      couters.push(<Counter title={key} count={store.data[key].length} />);
    }
    return couters;
  }, [store.data]);

  const todoList = React.useCallback(() => {
    let list: any = [];
    for (let key in store.data) {
      store.data[key].map((items: ITodo) => {
        list.push(
          <TodoView todo={items} key={items.id} onClick={clickOnCheckbox} />
        );
      });
    }
    return list;
  }, []);

  return (
    <div>
      <UserInput />
      {todoList()}
      {getCounts()}
    </div>
  );
}
export default observer(Todos);
