import { action, computed, makeObservable, observable } from 'mobx';
import { IDataProp, ITodo } from './types';

class Store {
  data: IDataProp;
  value: string;
  constructor(data: IDataProp, value: string) {
    makeObservable(this, {
      data: observable,
      getterValue: action,
      setterValue: action,
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
    });
    this.data = data;
    this.value = value;
  }

  getterValue(type?: string) {
    if (type === 'new') {
      return this.data.new;
    } else if (type === 'completed') {
      return this.data.completed;
    } else {
      return this.data;
    }
  }

  setterValue(newValue: ITodo) {
    this.data.new.push(newValue);
  }

  handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    const val = ' e.target.value';
  }

  handleOnclick() {
    this.data.new.push({
      id: Date.now(),
      todo: this.value,
      completed: false,
    });
    this.value = '';
  }

  handleOnclickOnCheckbox(id: number) {
    const todo = findTodoById(id)[0];
    const filteredTodo = filterTodo(todo.completed, id);

    if (!todo.completed) {
      todo.completed = true;
      this.data.completed.push(todo);
      this.data.new = filteredTodo;
    } else {
      todo.completed = false;
      this.data.new.push(todo);
      this.data.completed = filteredTodo;
    }
  }
}

export const store = new Store(
  {
    new: [{ id: 1, todo: 'mobx', completed: false }],
    completed: [{ id: 2, todo: 'mobx key stone', completed: true }],
  },
  null
);

const findTodoById = (id: number) => {
  let selectedTodo = store.data.completed.filter((item) => id === item.id);
  if (selectedTodo.length === 0) {
    selectedTodo = store.data.new.filter((item) => id === item.id);
  }
  return selectedTodo;
};

const filterTodo = (isCompleted: boolean, id: number) => {
  let filteredTodos: Array<ITodo> = [];
  if (isCompleted) {
    filteredTodos = store.data.completed.filter((item) => id !== item.id);
  } else {
    filteredTodos = store.data.new.filter((item) => id !== item.id);
  }
  return filteredTodos;
};
