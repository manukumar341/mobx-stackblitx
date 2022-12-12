import { observer } from 'mobx-react';
import { memo } from 'react';
import React = require('react');

interface ICounterProp {
  new: any[];
  inProgress: any[];
  done: any[];
}

function Counter({ data }: { data: ICounterProp }) {
  return (
    <div>
      <h3>New: {data.new.length}</h3>
      <h3>Inprogress: {data.inProgress.length}</h3>
      <h3>completed: {data.done.length}</h3>
    </div>
  );
}

export default observer(Counter);
