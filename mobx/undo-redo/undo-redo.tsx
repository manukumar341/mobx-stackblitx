import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton } from '../custom-components';
import { storeComponent } from '../todo-app/store/store';
function UndoRedo({
  handleUndoRedoOnclick,
}: {
  handleUndoRedoOnclick: () => void;
}) {
  const store = storeComponent;

  const handleUndoOnclick = React.useCallback(() => {
    store.handleUndo(0);
    handleUndoRedoOnclick();
  }, []);

  const handleRedoOnclick = React.useCallback(() => {
    store.handleRedo();
    handleUndoRedoOnclick();
  }, []);

  return (
    <div>
      <MemoizedButton
        name="undo"
        type="button"
        value="undo"
        onClick={handleUndoOnclick}
      />
      <MemoizedButton
        name="redo"
        type="button"
        value="redo"
        onClick={handleRedoOnclick}
      />
    </div>
  );
}

export default observer(UndoRedo);
