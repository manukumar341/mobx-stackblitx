import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from './types';
import { storeComponent } from './store/store';
import Counter from '../common-components/counter';
import UserInput from './user-input';
import UndoRedo from '../undo-redo/undo-redo';
import styled from 'styled-components';
import arrayMapper from './handlers';

function Todos() {
  const store = React.useMemo(() => storeComponent, []);
  const viewHistory = store.todosArray;

  const handleTodoHistoryViews = React.useCallback(() => {
    let newTodos: JSX.Element[];
    let completedTodos: JSX.Element[];
    if (viewHistory !== undefined) {
      newTodos = arrayMapper(viewHistory).new;
      completedTodos = arrayMapper(viewHistory).completed;
    }
    return {
      newTodos: newTodos,
      completedTodos: completedTodos,
    };
  }, [arrayMapper, viewHistory]);

  const getLenghtAndTodoList = React.useMemo(() => {
    return {
      newCounts: handleTodoHistoryViews().newTodos.length,
      completedCounts: handleTodoHistoryViews().completedTodos.length,
      new: handleTodoHistoryViews().newTodos,
      completed: handleTodoHistoryViews().completedTodos,
    };
  }, [handleTodoHistoryViews]);

  return (
    <div>
      <UserInput />

      <UndoRedo />
      <StyledTable>
        <StyledTr>
          <th>New</th>
          <th>completed</th>
        </StyledTr>
        <StyledTr>
          <StyledTd> {getLenghtAndTodoList.new}</StyledTd>
          <StyledTd> {getLenghtAndTodoList.completed}</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledCounter>
            <Counter title="new" count={getLenghtAndTodoList.newCounts} />
          </StyledCounter>
          <StyledCounter>
            <Counter
              title="completed"
              count={getLenghtAndTodoList.completedCounts}
            />
          </StyledCounter>
        </StyledTr>
      </StyledTable>
    </div>
  );
}
export default observer(Todos);

const StyledTable = styled.table`
margin:5px;
`;

const StyledTr = styled.tr`
border:solid 1px black;

`;

const StyledTd = styled.td`
border:solid 1px black;
width:150px;
height:200px;
`;

const StyledCounter = styled(StyledTd)`
height:10px;
`;
