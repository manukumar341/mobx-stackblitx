import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from './types';
import { storeComponent } from './store/store';
import Counter from '../common-components/counter';
import TodoView from '../common-components/todo-view';
import UserInput from './user-input';
import UndoRedo from '../undo-redo/undo-redo';
import styled from 'styled-components';
function Todos() {
  const [onclickOnUndoRedo, setOnclickOnUndoRedo] = React.useState(false);
  const store = React.useMemo(() => storeComponent, []);
  const handleUndoRedoOnclick = () => {
    setOnclickOnUndoRedo(true);
  };

  const viewHistory = store.history.slice(0, store.historyCount);
  console.log(viewHistory);

  const clickOnCheckbox = React.useCallback((e: { target: { id: string } }) => {
    store.handleOnclickOnCheckbox(parseInt(e.target.id));
  }, []);

  const handleDeleteTodo = React.useCallback(
    (e: { target: { id: string } }) => {
      store.handleDelete(parseInt(e.target.id));
    },
    []
  );

  const handleOnclick = React.useCallback(() => {
    // setOnclickOnUndoRedo(false);
    store.handleOnclick();
  }, [store.handleOnclick]);

  const arrayMapper = React.useCallback((array: ITodo[]) => {
    const list: any = { new: [], completed: [] };
    array.map((items: ITodo) => {
      let temp = (
        <TodoView
          todo={items}
          key={items.id}
          onClickCheckbox={clickOnCheckbox}
          onClickDelete={handleDeleteTodo}
        />
      );
      items.completed ? list.completed.push(temp) : list.new.push(temp);
    });
    return list;
  }, []);

  const handleTodoHistoryViews = React.useCallback(() => {
    let newTodos: any;
    let completedTodos: any;

    if (onclickOnUndoRedo) {
      newTodos = arrayMapper(viewHistory).new;
      completedTodos = arrayMapper(viewHistory).completed;
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
