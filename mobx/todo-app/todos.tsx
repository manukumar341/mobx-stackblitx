import { observer } from 'mobx-react';
import React = require('react');
import { ITodo } from './types';
import { storeComponent } from './store';
import Counter from '../common-components/counter';
import TodoView from '../common-components/todo-view';
import UserInput from './user-input';
import UndoRedo from '../undo-redo/undo-redo';
import styled from 'styled-components';
function Todos() {
  const store = React.useMemo(() => storeComponent, []);
  // console.log('todos');

  const clickOnCheckbox = React.useCallback((e: { target: { id: string } }) => {
    store.handleOnclickOnCheckbox(parseInt(e.target.id));
  }, []);

  const getCounts = React.useCallback(() => {
    let couters: any = [];
    for (let key in store.data) {
      couters.push(<Counter title={key} count={store.data[key].length} />);
    }
    return couters;
  }, [store.data]);

  const arrayMapper = (key: string) => {
    const list: any = [];
    store.data[key].map((items: ITodo) => {
      list.push(
        <TodoView todo={items} key={items.id} onClick={clickOnCheckbox} />
      );
    });
    return list;
  };

  return (
    <div>
      <UserInput />
      <StyledTable>
        <StyledTr>
          <th>New</th>
          <th>completed</th>
        </StyledTr>
        <StyledTr>
          <StyledTd> {arrayMapper('new')}</StyledTd>
          <StyledTd> {arrayMapper('completed')}</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledCounter>
            <Counter title="new" count={store.data.new.length} />
          </StyledCounter>
          <StyledCounter>
            <Counter title="completed" count={store.data.completed.length} />
          </StyledCounter>
        </StyledTr>
      </StyledTable>

      <UndoRedo />
    </div>
  );
}
export default observer(Todos);

const StyledTable = styled.table`
margin:5px;
width:300px;
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
height:50px;
`;
