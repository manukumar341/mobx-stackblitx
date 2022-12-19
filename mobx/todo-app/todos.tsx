import { observer } from 'mobx-react';
import React = require('react');
import { storeComponent } from './store/store';
import styled from 'styled-components';
import ArrayMapper from './array-mapper';
import UserUndoredo from './user-undoredo';

function Todos() {
  const store = React.useMemo(() => storeComponent, []);

  return (
    <div>
      <UserUndoredo />
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
