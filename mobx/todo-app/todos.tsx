import { observer } from 'mobx-react';
import React = require('react');
import { storeComponent } from './store/store';
import UserInput from './user-input';
import styled from 'styled-components';
import ArrayMapper from './handlers';
import { MemoizedButton } from '../custom-components';

function Todos() {
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
        disabled={store.historyPosition === 0 ? true : false}
      />
      <StyledSpan>
        <UserInput />
      </StyledSpan>

      <MemoizedButton
        name="redo"
        type="button"
        value=">"
        onClick={handleRedoOnclick}
        disabled={
          store.historyPosition === store.undoActions.length ? true : false
        }
      />
      <StyledDiv>
        <StyledSpan>New: {store.getStatus.pending}</StyledSpan>
        <StyledSpan>Completed: {store.getStatus.completed}</StyledSpan>
      </StyledDiv>
      <ArrayMapper />
    </div>
  );
}
export default observer(Todos);

const StyledSpan = styled.b`
margin:15px;
`;

const StyledDiv = styled.div`
margin:15px;


`;

const StyledTd = styled.td`
border:solid 1px black;
width:150px;
height:200px;
`;

const StyledCounter = styled(StyledTd)`
height:10px;
`;
