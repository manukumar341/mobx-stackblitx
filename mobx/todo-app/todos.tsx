import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from './types';
import { storeComponent } from './store';
import Counter from '../common-components/counter';
import TodoView from '../common-components/todo-view';
import UserInput from './user-input';
function Todos() {
  const store = React.useMemo(() => storeComponent, []);
  // console.log('todos');

  const clickOnCheckbox = React.useCallback((e: { target: { id: string } }) => {
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
    let isDisplayed = true;
    let list: any = [];
    list.push(<h3>New</h3>);

    for (let key in store.data) {
      store.data[key].length === 0 ? list.push(<h6>add your todo</h6>) : null;
      store.data[key].map((items: ITodo) => {
        list.push(
          <TodoView todo={items} key={items.id} onClick={clickOnCheckbox} />
        );
      });
      if (isDisplayed) {
        list.push(<h3>Completed</h3>);
        isDisplayed = false;
      }
    }
    return list;
  }, [store.data]);

  return (
    <div>
      <UserInput />
      {todoList()}
      {getCounts()}
    </div>
  );
}
export default observer(Todos);
