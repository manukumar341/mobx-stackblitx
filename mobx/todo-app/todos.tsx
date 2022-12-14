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
  const store = React.useMemo(() => storeComponent, []);

  const clickOnCheckbox = React.useCallback((e: { target: { id: string } }) => {
    store.handleOnclickOnCheckbox(parseInt(e.target.id));
  }, []);

  const handleDeleteTodo = React.useCallback(
    (e: { target: { id: string } }) => {
      store.handleDelete(parseInt(e.target.id));
    },
    []
  );

  const arrayMapper = React.useCallback(() => {
    const list: any = { new: [], completed: [] };
    store.data.map((items: ITodo) => {
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

  const newTodos = arrayMapper().new;
  const completedTodos = arrayMapper().completed;

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
          <StyledTd> {newTodos}</StyledTd>
          <StyledTd> {completedTodos}</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledCounter>
            <Counter title="new" count={newTodos.length} />
          </StyledCounter>
          <StyledCounter>
            <Counter title="completed" count={completedTodos.length} />
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
