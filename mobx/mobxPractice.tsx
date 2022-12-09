import { observer } from 'mobx-react';
import React = require('react');
import { store } from './store';

const mobStore = store({ a: 45 });
function Mob() {
  console.log('tttttttttttt');
  const handleOnclick = () => {
    mobStore.setterValue = { b: 40, c: 30 };
  };

  let res = React.useMemo(() => [], []);
  // let res = [];

  for (const key in mobStore.value) {
    res.push(mobStore.value[key]);
  }

  return (
    <div>
      <h3>{res}</h3>
      <button onClick={handleOnclick}>restore</button>
    </div>
  );
}

export default React.memo(observer(Mob));
