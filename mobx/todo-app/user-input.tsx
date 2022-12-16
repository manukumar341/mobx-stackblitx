import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton, MemoizedInput } from '../custom-components';
import { storeComponent } from './store/store';

function UserInput() {
  const store = React.useMemo(() => storeComponent, []);
  const handleOnclick = React.useCallback(() => {
    store.handleOnclick();
  }, [store.handleOnclick]);

  const handleOnchange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      store.handleOnchange(e);
    },
    [store.handleOnchange]
  );
  const value = React.useMemo(() => store.value, [store.value]);
  console.log(storeComponent.value);
  return (
    <React.Fragment>
      <MemoizedInput
        name={'todoInput'}
        type="text"
        placeholder="enter todo..."
        onChange={handleOnchange}
        value={store.value}
      />
      <MemoizedButton
        name={'todoAddButton'}
        type={'submit'}
        onClick={handleOnclick}
        value="Add"
      />
    </React.Fragment>
  );
}

export default observer(UserInput);
