import { observer } from 'mobx-react';
import { memo } from 'react';
import React = require('react');

function Counter({ title, count }: { title: string; count: number }) {
  return (
    <div>
      <h3>
        {title}: {count}
      </h3>
    </div>
  );
}

export default memo(Counter);
