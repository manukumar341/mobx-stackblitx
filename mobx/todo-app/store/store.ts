import { action, computed, makeObservable, observable } from 'mobx';
import { filterTodo, findTodoById } from './array-filters';
import { IDataProp, ITodo } from '../types';

class Store {
  data: IDataProp;
  value: string;
  backup: Array<IDataProp>;
  redo: Array<IDataProp>;
  constructor(data: IDataProp, value: string) {
    makeObservable(this, {
      data: observable,
      backup: observable,
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
      handleDelete: action,
      handleUndo: action,
      handleRedo: action,
      redo: observable,
    });
    this.data = data;
    this.value = value;
    this.handleOnchange = this.handleOnchange.bind(this);
    this.backup = [this.data];
    this.redo = [];
    this.handleUndo = this.handleUndo.bind(this);
  }

  handleRedo() {}

  handleUndo() {
    // this.data = this.backup[this.backup.length - 1];
    // this.data = { ...this.backup[this.backup.length - 2] };
    // this.data.completed = this.backup[0].completed;
    for (let i = 0; i < this.backup.length; i++) {
      console.log({ ...this.backup[i] });
    }
  }

  handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    this.value = e.target.value;
  }

  handleOnclick() {
    this.data.new.push({
      id: Date.now(),
      todo: this.value,
      completed: false,
    });
    this.value = undefined;
  }

  handleOnclickOnCheckbox(id: number) {
    const todo = findTodoById(this.data, id)[0];
    const filteredTodo = filterTodo(this.data, todo.completed, id);

    if (!todo.completed) {
      todo.completed = true;
      this.data.completed.push(todo);
      this.data.new = filteredTodo;
    } else {
      todo.completed = false;
      this.data.new.push(todo);
      this.data.completed = filteredTodo;
    }
    this.backup.push({ ...this.data });
  }

  handleDelete(id: number) {
    const todo = findTodoById(this.data, id)[0];
    const filteredTodo = filterTodo(this.data, todo.completed, id);
    const status = todo.completed ? 'completed' : 'new';
    this.data[status] = filteredTodo;
    this.backup.push({ ...this.data });
  }
}

export const storeComponent = new Store(
  {
    new: [
      { id: 1, todo: 'mobx', completed: false },
      { id: 3, todo: 'js', completed: false },
    ],
    completed: [{ id: 2, todo: 'mobx key stone', completed: true }],
  },
  undefined
);
