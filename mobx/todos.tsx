import { observer } from 'mobx-react';
import React = require('react');
import { Input, Button } from './components';
import { store } from './store';
import TodoView from './todo-view';

function Todos() {
  // const renderTodos = () => {
  //   const res = store.data.map((items) => {
  //     return (
  //       <TodoView
  //         todo={items.title}
  //         completed={items.completed}
  //         id={items.id}
  //         key={items.id}
  //       />
  //     );
  //   });
  //   return res;
  // };

  return (
    <div>
      <Input
        name={'todoInput'}
        placeholder="enter todo..."
        onChange={store.handleOnchange}
        value={store.value}
      />
      <Button
        name={'todoAddButton'}
        type={'submit'}
        onClick={store.handleOnclick}
        value="Add"
      />
      {store.data.map((items) => {
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
