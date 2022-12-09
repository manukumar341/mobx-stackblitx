import { observer } from 'mobx-react';
import React = require('react');
import { Button, Input } from '../components';

function UserInput(store: any) {
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
    </div>
  );
}

export default observer(UserInput);
