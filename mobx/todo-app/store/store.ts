import { action, computed, makeObservable, observable } from 'mobx';
import { toJS } from 'mobx';
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
      isUndoRedoActive: computed,
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

  get isUndoRedoActive() {
    const undo = this.historyPosition === 0;
    const redo = this.historyPosition === this.undoActions.length;
    return {
      undo: undo,
      redo: redo,
    };
  }

  get getStatus() {
    const completed = this.todosArray.filter((item) => item.completed).length;
    const pending = this.todosArray.length - completed;
    return { completed: completed, pending: pending };
  }

  setTodoArrayByPrevius(action) {
    switch (action) {
      case 'add': {
        // const findFun = (item: ITodo, index: number) => {
        //   if (item.id === this.undoActions[this.historyPosition].data) {
        //     this.todosArray.splice(index, 1);
        //     this.undoActions[this.historyPosition] = {
        //       type: 'delete',
        //       data: item,
        //     };
        //   }
        //   return item.id === this.undoActions[this.historyPosition].data;
        // };

        // this.todosArray.find((item, index) => findFun(item, index));

        const findMyDog = (item: ITodo, index: number) => {
          if (item.id === this.undoActions[this.historyPosition].data) {
            this.todosArray.splice(index, 1);
            console.log(index);
            console.log(this.todosArray[index]);
          }
          return item.id === this.undoActions[this.historyPosition].data;
        };

        let todo = this.todosArray.find((todo, index) =>
          findMyDog(todo, index)
        );
        console.log(todo);
        this.undoActions[this.historyPosition] = {
          type: 'delete',
          data: todo,
        };

        break;
      }
      case 'markedDone': {
        this.todosArray.find((item, index) => {
          if (item.id === this.undoActions[this.historyPosition].data) {
            this.todosArray.splice(index, 1, {
              ...this.todosArray[index],
              completed: !this.todosArray[index].completed,
            });
          }
        });
        break;
      }
      case 'delete': {
        this.todosArray.push(this.undoActions[this.historyPosition].data);
        this.undoActions[this.historyPosition] = {
          data: this.undoActions[this.historyPosition].data.id,
          type: 'add',
        };
        console.log(toJS(this.undoActions));
        break;
      }
    }
  }

  handleRedo() {
    if (this.historyPosition < this.undoActions.length) {
      this.setTodoArrayByPrevius(this.undoActions[this.historyPosition].type);
      this.historyPosition = this.historyPosition + 1;
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
    // this.value = undefined;
    // console.log(this.value);
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
