import { observer } from 'mobx-react';
import React = require('react');
import { MemoizedButton } from '../custom-components';
import { storeComponent } from '../todo-app/store';
function UndoRedo() {
  const { data } = storeComponent;
  const undoArr: any = [];

  const backupUiState = React.useMemo(() => {
    undoArr.push(data);
    console.log(undoArr);
  }, [data]);
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

export default observer(UndoRedo);
