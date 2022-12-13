import React = require('react');
import { MemoizedButton } from '../custom-components';

function UndoRedo() {
  return (
    <div>
      <MemoizedButton name="undo" type="button" value="undo" />
      <MemoizedButton name="redo" type="button" value="redo" />
    </div>
  );
}

export default React.memo(UndoRedo);
