import React = require('react');
import { MemoizedButton } from '../custom-components';

function UndoRedo() {
  const undoArr: any = [];
  const redoArr: any = [];

  const handleUndoOnclick = React.useCallback(() => {
    redoArr.push('ui state');
  }, []);

  const handleRedoOnclick = React.useCallback(() => {}, []);

  return (
    <div>
      <MemoizedButton name="undo" type="button" value="undo" />
      <MemoizedButton name="redo" type="button" value="redo" />
    </div>
  );
}

export default React.memo(UndoRedo);
