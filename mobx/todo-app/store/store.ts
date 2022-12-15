import { action, computed, makeObservable, observable } from 'mobx';
import { IDataProp, ITodo } from '../types';
import { filterTodo, findTodoById } from './array-filters';

class Store {
  value: string;
  todosArray: Array<ITodo>;
  undoActions: any;
  redoActions: any;
  historyPosition: number;

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
      historyPosition: observable,
    });

    this.value = value;
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
    this.todosArray = [];
    this.undoActions = [];
    this.redoActions = [];
    this.historyPosition = this.undoActions.length;
    this.setTodoArrayByPrevius = this.setTodoArrayByPrevius.bind(this);
  }

  get getStatus() {
    const completed = this.todosArray.filter((item) => item.completed).length;
    const pending = this.todosArray.length - completed;
    return { completed: completed, pending: pending };
  }

  setTodoArrayByPrevius(action) {
    switch (action) {
      case 'add': {
        const todo = this.undoActions[this.historyPosition];
        const id = this.undoActions[this.historyPosition].data.id;
        this.todosArray.find((item, index) => {
          if (item.id === id) {
            this.todosArray.splice(index, 1);
            this.undoActions[this.historyPosition] = {
              ...todo,
              type: 'delete',
            };
          }
        });
        break;
      }
      case 'markedDone': {
        this.todosArray.find((item, index) => {
          if (item.id === this.undoActions[this.historyPosition].data) {
            const todo = this.todosArray[index];
            const id = Date.now();
            this.todosArray.splice(index, 1, {
              id: id,
              todo: todo.todo,
              completed: !this.todosArray[index].completed,
            });
            this.undoActions[this.historyPosition].data = id;
          }
        });
        break;
      }
      case 'delete': {
        const item = this.undoActions[this.historyPosition];
        this.todosArray.push(item.data);
        this.undoActions[this.historyPosition] = { ...item, type: 'add' };
        break;
      }
    }
  }

  handleRedo() {
    if (this.historyPosition < this.todosArray.length - 1) {
      this.historyPosition = this.historyPosition + 1;
      this.setTodoArrayByPrevius(this.undoActions[this.historyPosition].type);
    }
  }
  handleUndo() {
    if (this.historyPosition > 0) {
      this.historyPosition = this.historyPosition - 1;
      this.setTodoArrayByPrevius(this.undoActions[this.historyPosition].type);
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
    this.todosArray.push(newEntry);
    this.undoActions.push({ type: 'add', data: newEntry.id });
    this.historyPosition = this.undoActions.length;
    this.value = undefined;
  }

  handleOnclickOnCheckbox(id: number) {
    this.todosArray.find((items, index) => {
      if (items.id === id) {
        this.todosArray[index].completed = !this.todosArray[index].completed;
        this.undoActions.push({ type: 'markedDone', data: items.id });
        this.historyPosition = this.undoActions.length;
      }
    });
  }

  handleDelete(id: number) {
    const deltedTodo = findTodoById(this.todosArray, id);
    const filteredTodos = filterTodo(this.todosArray, id);
    this.todosArray = filteredTodos;
    this.undoActions.push({ type: 'delete', data: deltedTodo });
    this.historyPosition = this.undoActions.length;
  }
}

export const storeComponent = new Store(undefined);
