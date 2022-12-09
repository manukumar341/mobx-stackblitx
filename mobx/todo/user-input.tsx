import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton, Input } from '../components';
import { store } from '../store';

function UserInput() {
  console.log('user input');
  return (
    <div>
      <Input
        name={'todoInput'}
        placeholder="enter todo..."
        onChange={store.handleOnchange}
        value={store.value}
      />
      <MemoizedButton
        name={'todoAddButton'}
        type={'submit'}
        onClick={store.handleOnclick}
        value="Add"
      />
    </div>
  );
}

export default observer(UserInput);
