import { action, makeObservable, observable } from 'mobx';
import { IDataProp, ITodo } from '../types';
import { filterTodo, findTodoById } from './array-filters';
interface IActionsKeyType {
  key: 'delete' | 'add';
}

interface IActionsHistory {
  IActionsKeyType: ITodo;
}

class Store {
  value: string;
  todosArray: Array<ITodo> | undefined;
  actionsHistory: any;

  constructor(value?: string) {
    makeObservable(this, {
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
      handleDelete: action,
      handleUndo: action,
      handleRedo: action,
      todosArray: observable,
      actionsHistory: observable,
    });

    this.value = value;
    this.actionsHistory = [];
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.handleOnclickOnCheckbox = this.handleOnclickOnCheckbox.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.todosArray = [];
  }

  handleRedo() {
    const length = this.todosArray.length;
  }

  handleUndo() {}

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
      if (this.todosArray.length > 0) {
        this.actionsHistory.push({ add: newEntry.id });
      }
      this.todosArray.push({ ...newEntry });
    }
    console.log('this.todosArray');
    
    this.value = undefined;
  }

  handleOnclickOnCheckbox(id: number) {
    this.todosArray.find((items, index) => {
      if (items.id === id) {
        this.todosArray[index].completed = !this.todosArray[index].completed;
        this.actionsHistory.push({ completed: items.id });
      }
    });
  }

  handleDelete(id: number) {
    const deltedTodo = findTodoById(this.todosArray, id);
    const filteredTodos = filterTodo(this.todosArray, id);
    this.todosArray = { ...filteredTodos };
    this.actionsHistory.push({ delete: deltedTodo });
  }
}
export const storeComponent = new Store(undefined);
