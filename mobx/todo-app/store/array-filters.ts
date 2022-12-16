import { IDataProp, ITodo } from '../types';

export const findTodoById = (data: Array<ITodo>, id: number) => {
  let selectedTodo = data.find((item, index) => id === item.id);
  return { ...selectedTodo };
};

export const filterTodo = (data: Array<ITodo>, id: number) => {
  let filteredTodos: Array<ITodo> = [];
  let index: number;
  filteredTodos = data.filter((item, index) => {
    index = index;
    id !== item.id;
  });
  return { array: filteredTodos, index: index };
};
