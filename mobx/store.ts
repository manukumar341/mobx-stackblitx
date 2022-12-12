import { action, computed, makeObservable, observable } from 'mobx';
import { useCallback } from 'react';
console.log('store');
interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}
interface IDataProp {
  new: Array<ITodo>;
  completed: Array<ITodo>;
}

class Store {
  data: IDataProp;
  value: string;

  constructor(data: IDataProp, value: string) {
    makeObservable(this, {
      data: observable,
      getterValue: computed,
      setterValue: computed,
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
    });
    this.data = data;
    this.value = value;
  }

  get getterValue() {
    return this.data;
  }

  set setterValue(newValue: any) {
    this.data.new.push(newValue);
  }

  handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    this.value = e.target.value;
  }

  handleOnclick() {
    this.setterValue = {
      id: Date.now(),
      title: this.value,
      completed: false,
    };
    this.value = '';
  }

  handleOnclickOnCheckbox(id: number) {
    const completed = this.data.new.find((item) => id === item.id);
    this.data.completed.push(completed);
  }
}

export const store = new Store({ new: [], completed: [] }, '');
