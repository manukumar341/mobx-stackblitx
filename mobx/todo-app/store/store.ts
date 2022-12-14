import { action, computed, makeObservable, observable } from 'mobx';
import { filterTodo, findTodoById } from './array-filters';
import { IDataProp, ITodo } from '../types';

class Store {
  objOfArr: any;
  data: IDataProp;
  value: string;
  backup: Array<IDataProp>;
  redo: Array<IDataProp>;
  constructor(data: IDataProp, value: string) {
    makeObservable(this, {
      data: observable,
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
    this.backup = [];
    this.redo = [];
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.objOfArr = {
      past: [],
      present: {},
      feature: [],
    };
  }

  handleRedo() {
    if (this.objOfArr.present) {
      this.objOfArr.past.push(this.objOfArr.present);
      this.objOfArr.present = undefined;
    }
    if (this.objOfArr.feature.length > 0) {
      this.objOfArr.present = this.objOfArr.feature.pop();
    }
    console.log(this.objOfArr);
  }
  handleUndo(index: number) {
    if (this.backup.length) {
      this.data.completed = this.backup[0].completed;
      this.data.new = [...this.backup[0].new];
    }
    if (this.objOfArr.present) {
      this.objOfArr.feature.push(this.objOfArr.present);
      this.objOfArr.present = undefined;
    }
    if (this.objOfArr.past.length > 0) {
      this.objOfArr.present = this.objOfArr.past.pop();
    }
    console.log(this.objOfArr);
  }

  handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    this.value = e.target.value;
  }

  handleOnclick() {
    if (this.value) {
      this.backup.push({ ...this.data });
      this.data.new.push({
        id: Date.now(),
        todo: this.value,
        completed: false,
      });

      if (this.objOfArr.present !== {}) {
        this.objOfArr.past.push(this.objOfArr.present);
      }
      this.objOfArr.present = { ...this.data };
      this.value = undefined;
      console.log(this.objOfArr);
    }
  }

  handleOnclickOnCheckbox(id: number) {
    this.backup.push({ ...this.data });

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

    // if (this.objOfArr.present) {
    //   this.objOfArr.past.push(this.objOfArr.present);
    // }
    // this.objOfArr.present = this.data;
  }

  handleDelete(id: number) {
    this.backup.push({ ...this.data });

    const todo = findTodoById(this.data, id)[0];
    const filteredTodo = filterTodo(this.data, todo.completed, id);
    const status = todo.completed ? 'completed' : 'new';
    this.data[status] = filteredTodo;
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
