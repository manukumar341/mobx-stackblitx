import { action, computed, makeObservable, observable } from 'mobx';
import { filterTodo, findTodoById } from './array-filters';
import { IDataProp, ITodo } from '../types';

class Store {
  data: Array<ITodo>;
  value: string;
  backup: IDataProp;
  history: Array<ITodo>;
  historyCount: number;
  temp: any;
  a: any;
  constructor(value?: string) {
    makeObservable(this, {
      data: observable,
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
      handleDelete: action,
      handleUndo: action,
      handleRedo: action,
      history: observable,
      temp: observable,
      historyCount: observable,
    });

    this.data = [];
    this.value = value;
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.temp = {};
    this.history = [];
    this.historyCount = this.history.length - 1;
  }

  handleRedo() {
    const length = this.history.length;
    if (this.historyCount < length - 1) {
      this.historyCount = this.historyCount + 1;
    }
  }

  handleUndo(index: number) {
    if (this.history.length > 0 && this.historyCount > 0) {
      this.historyCount = this.historyCount - 1;
    }
  }

  handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    this.value = e.target.value;
  }

  handleOnclick() {
    if (this.temp !== {}) {
      const item = { ...this.temp };
      this.history.push(item);
      this.historyCount = this.historyCount + 1;
    }
    const id = Date.now();
    const newEntry = {
      id: id,
      todo: this.value,
      completed: false,
    };
    if (this.value) {
      this.data.push({ ...newEntry });
    }
    if (this.data.length > 0) {
      const item: any = { ...this.data[this.data.length - 1] };
      this.temp = item;
    }

    this.value = undefined;
  }

  handleOnclickOnCheckbox(id: number) {
    const item = { ...this.temp };
    this.history.push(item);
    this.historyCount = this.historyCount + 1;
    let temp: any = {};

    this.data.forEach((item, index) => {
      if (item.id === id) {
        let status = this.data[index].completed;
        this.data[index].completed = !status;

        this.history.forEach((history, index) => {
          history.id;
        });

        temp = { ...this.data[index] };
        this.temp = temp;
      }
    });
    console.log(item);
  }

  handleDelete(id: number) {
    const item = { ...this.temp };
    this.history.push(item);
    this.historyCount = this.historyCount + 1;
    this.data.forEach((item, index) => {
      if (item.id === id) {
        this.data.splice(index, 1);
        this.temp = { id: item.id, todo: undefined };
      }
    });

    // this.history.push({ ...deletedTodo });
  }
}

export const storeComponent = new Store(undefined);
