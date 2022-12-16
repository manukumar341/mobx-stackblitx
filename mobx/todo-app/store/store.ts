import { action, computed, makeObservable, observable } from 'mobx';
import { IDataProp, ITodo } from '../types';
import { filterTodo, findTodoById } from './array-filters';

class Store {
  value: string;
  todosArray: Array<ITodo>;
  undoActions: any;
  redoActions: any;

  constructor(value?: string) {
    makeObservable(this, {
      handleOnclick: action,
      handleOnchange: action,
      handleOnclickOnCheckbox: action,
      handleDelete: action,
      handleUndo: action,
      handleRedo: action,
      todosArray: observable,
      getStatus: computed,
      undoActions: observable,
      redoActions: observable,
    });

    this.value = value;
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.todosArray = [];
    this.undoActions = [];
    this.redoActions = [];
  }

  get getStatus() {
    const completed = this.todosArray.filter((item) => item.completed).length;
    const pending = this.todosArray.length - completed;
    return { completed: completed, pending: pending };
  }

  handleRedo() {
    const redoItem = this.redoActions.pop();
    this.undoActions.push(redoItem);
  }
  handleUndo() {
    const undoItem = this.undoActions.pop();
    this.redoActions.push(undoItem);
    this.todosArray.find((item, index) => {
      if (item.id === undoItem.id) {
        this.todosArray[index] = undoItem;
      }
    });
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
    this.todosArray.push(newEntry);
    this.undoActions.push(newEntry);
    this.value = undefined;
  }

  handleOnclickOnCheckbox(id: number) {
    this.todosArray.find((items, index) => {
      if (items.id === id) {
        this.todosArray[index].completed = !this.todosArray[index].completed;
        this.undoActions.push(this.todosArray[index]);
      }
    });
  }

  handleDelete(id: number) {
    const deltedTodo = findTodoById(this.todosArray, id);
    const filteredTodos = filterTodo(this.todosArray, id);
    this.todosArray = filteredTodos.array;
    this.undoActions.push(deltedTodo);
  }
}

export const storeComponent = new Store(undefined);
