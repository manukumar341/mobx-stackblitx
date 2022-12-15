import { action, makeObservable, observable } from 'mobx';
import { IDataProp, ITodo } from '../types';
import { findTodoById } from './array-filters';

class Store {
  value: string;
  history: Array<ITodo>;
  historyCount: number;
  constructor(value?: string) {
    makeObservable(this, {
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
      handleDelete: action,
      handleUndo: action,
      handleRedo: action,
      history: observable,
      historyCount: observable,
    });

    this.value = value;
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.history = [];
    this.historyCount = this.history.length;
  }

  handleRedo() {
    const length = this.history.length;
    if (this.historyCount < length) {
      this.historyCount = this.historyCount + 1;
      console.log(length, this.historyCount);
    }
  }

  handleUndo() {
    if (this.historyCount > 0) {
      this.historyCount = this.historyCount - 1;
    }
  }

  handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    this.value = e.target.value;
  }

  handleOnclick() {
    const id = Date.now();
    const newEntry = {
      id: id,
      todo: this.value,
      completed: false,
    };
    if (this.value) {
      this.history.push({ ...newEntry });
      this.historyCount = this.history.length;
    }
    this.value = undefined;
  }

  handleOnclickOnCheckbox(id: number) {
    const todo = findTodoById(this.history, id);
    this.history.push({ ...todo, completed: !todo.completed });
    this.historyCount = this.history.length;
  }

  handleDelete(id: number) {
    const todo = findTodoById(this.history, id);
    this.history.push({ ...todo, todo: undefined });
    this.historyCount = this.history.length;
  }
}

export const storeComponent = new Store(undefined);
