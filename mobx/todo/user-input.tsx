import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton, MemoizedInput } from '../components';
import { store } from '../store';

function UserInput() {
  console.log('user input');

  // const handleOnchange = React.useCallback(() => {
  //   store.handleOnchange;
  // }, []);
  const handleOnclick = React.useCallback(() => {
    store.handleOnclick();
  }, [store.handleOnclick]);

  const value = React.useMemo(() => store.value, [store.value]);

  return (
    <div>
      <MemoizedInput
        name={'todoInput'}
        type="text"
        placeholder="enter todo..."
        onChange={store.handleOnchange}
        value={value}
      />
      <MemoizedButton
        name={'todoAddButton'}
        type={'submit'}
        onClick={handleOnclick}
        value="Add"
      />
    </div>
  );
}

export default observer(UserInput);
