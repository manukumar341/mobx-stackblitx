import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton } from '../custom-components';
import { storeComponent } from '../todo-app/store/store';
function UndoRedo() {
  const store = storeComponent;
  const undoArr: any = [];
  const redoArr: any = [];

  const handleUndoOnclick = React.useCallback(() => {
    redoArr.push('ui state');
  }, []);

  const handleRedoOnclick = React.useCallback(() => {}, []);

  return (
    <div>
      <MemoizedButton
        name="undo"
        type="button"
        value="undo"
        onClick={store.handleUndo}
      />
      <MemoizedButton name="redo" type="button" value="redo" />
    </div>
  );
}

export default observer(UndoRedo);
