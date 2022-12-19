import { observer } from 'mobx-react';
import React = require('react');
import { storeComponent } from './store/store';
import UserInput from './user-input';
import styled from 'styled-components';
import { MemoizedButton } from '../custom-components';

function UserUndoRedo() {
  const store = React.useMemo(() => storeComponent, []);
  const handleUndoOnclick = React.useCallback(() => {
    store.handleUndo();
  }, []);

  const handleRedoOnclick = React.useCallback(() => {
    store.handleRedo();
  }, []);
  return (
    <div>
      <MemoizedButton
        name="undo"
        type="button"
        value="<"
        onClick={handleUndoOnclick}
        disabled={store.isUndoRedoActive.undo}
      />
      <StyledSpan>
        <UserInput />
      </StyledSpan>

      <MemoizedButton
        name="redo"
        type="button"
        value=">"
        onClick={handleRedoOnclick}
        disabled={store.isUndoRedoActive.redo}
      />
    </div>
  );
}
export default observer(UserUndoRedo);

const StyledSpan = styled.b`
margin:15px;
`;
