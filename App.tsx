import * as React from 'react';
import './style.css';
import Todos from './mobx/todo-app/todos';

export default function App() {
  console.log('App');
  return (
    <div>
      <h1>Mox</h1>
      {/* <Mob /> */}
      <Todos />
    </div>
  );
}
