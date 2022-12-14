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
  const [onclickOnUndoRedo, setOnclickOnUndoRedo] = React.useState(false);
  const store = React.useMemo(() => storeComponent, []);
  const handleUndoRedoOnclick = () => {
    setOnclickOnUndoRedo(true);
  };

  const handleOnclick = React.useCallback(() => {
    setOnclickOnUndoRedo(false);
    store.handleOnclick();
  }, [store.handleOnclick]);

  const viewHistory = store.history.slice(1, store.historyCount + 1);

  console.log(viewHistory);
  console.log(arrayMapper(viewHistory));
  const handleTodoHistoryViews = React.useCallback(() => {
    let newTodos: any;
    let completedTodos: any;

    if (onclickOnUndoRedo && viewHistory !== undefined) {
      console.log(viewHistory);
      // console.log(store.data);
      newTodos = [1, 2, 3, 4];
      completedTodos = [23];

      // newTodos = arrayMapper(viewHistory).new;
      // console.log(newTodos);
      // completedTodos = arrayMapper(viewHistory).completed;
    } else {
      newTodos = arrayMapper(store.data).new;
      completedTodos = arrayMapper(store.data).completed;
    }
    return {
      newTodos: newTodos,
      completedTodos: completedTodos,
    };
  }, [arrayMapper, viewHistory, onclickOnUndoRedo]);

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
      <UserInput handleOnclick={handleOnclick} />

      <UndoRedo handleUndoRedoOnclick={handleUndoRedoOnclick} />
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
