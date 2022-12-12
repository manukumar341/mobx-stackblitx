import { observer } from 'mobx-react';
import React = require('react');
import { store } from './store';
import Counter from './todo/counter';
import TodoView from './todo/todo-view';
import UserInput from './todo/user-input';

function Todos() {
  console.log('todos');

  // const Todoviews = React.useCallback(() => {
  //   return store.getterValue.map((items) => {
  //     return (
  //       <div>
  //         <TodoView todo={items} key={items.id} />
  //       </div>
  //     );
  //   });
  // }, [store.getterValue]);
  const clickOnCheckbox = React.useCallback((e: any) => {
    store.handleOnclickOnCheckbox(parseInt(e.target.id));
  }, []);

  return (
    <div>
      <UserInput />
      {store.data.new.map((items) => {
        return (
          <div>
            <TodoView todo={items} key={items.id} onClick={clickOnCheckbox} />
          </div>
        );
      })}
      <Counter data={store.data} />
    </div>
  );
}
export default observer(Todos);
