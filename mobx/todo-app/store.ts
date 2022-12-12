import { action, computed, makeObservable, observable } from 'mobx';
import { IDataProp, ITodo } from './types';

console.log('store');

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
    console.log(this.value);
  }

  handleOnclickOnCheckbox(id: number) {
    const completed = this.data.new.find((item) => id === item.id);
    const newToto = this.data.new.filter((item) => id === item.id);
    console.log(id);
    if (completed) {
      this.data.completed.push(completed);
    }
  }
}

export const store = new Store(
  {
    new: [{ id: 1, todo: 'mobx', completed: false }],
    completed: [{ id: 2, todo: 'mobx key stone', completed: false }],
  },
  null
);
