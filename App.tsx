import * as React from 'react';
import './style.css';
import Todos from './mobx/todos';

export default function App() {
  return (
    <div>
      <h1>Mox</h1>
      {/* <Mob /> */}
      <Todos />
    </div>
  );
}
