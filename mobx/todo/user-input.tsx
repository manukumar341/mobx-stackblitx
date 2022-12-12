import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton, Input } from '../components';
import { store } from '../store';

function UserInput() {
  console.log('user input');

  const handleOnchange = React.useCallback(() => {
    store.handleOnchange;
  }, [store.handleOnchange]);

  const value = React.useMemo(() => store.value, [store.value]);

  return (
    <div>
      <Input
        name={'todoInput'}
        placeholder="enter todo..."
        onChange={handleOnchange}
        value={'value'}
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
