import { observer } from 'mobx-react';
import React = require('react');
import { Input } from './components';
import { store } from './store';

const mobStore = store;

function Input() {
  

  return (
    <div>
     
      <button onClick={mobStore.handleOnclick}>restore</button>
    </div>
  );
}

export default React.memo(observer(Mob));
