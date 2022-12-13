import { IDataProp, ITodo } from '../types';

export const findTodoById = (data: IDataProp, id: number) => {
  let selectedTodo = data.completed.filter((item) => id === item.id);
  if (selectedTodo.length === 0) {
    selectedTodo = data.new.filter((item) => id === item.id);
  }
  return selectedTodo;
};

export const filterTodo = (
  data: IDataProp,
  isCompleted: boolean,
  id: number
) => {
  let filteredTodos: Array<ITodo> = [];
  if (isCompleted) {
    filteredTodos = data.completed.filter((item) => id !== item.id);
  } else {
    filteredTodos = data.new.filter((item) => id !== item.id);
  }
  return filteredTodos;
};
