import { action, makeAutoObservable } from 'mobx';
import { useCallback } from 'react';
console.log('store');

// function actions() {
//   const getObject = useCallback((todo: string) => {
//     return {
//       id: Date.now(),
//       title: todo,
//       completed: false,
//     };
//   }, []);

//   return getObject;
// }

export const store = makeAutoObservable({
  data: {
    new: [],
    inProgress: [],
    done: [],
  },
  value: '',

  get getterValue() {
    return store.data;
  },

  set setterValue(newValue: any) {
    store.data.new.push(newValue);
  },

  handleOnchange: action((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    store.value = e.target.value;
  }),

  handleOnclick: action(() => {
    store.setterValue = {
      id: Date.now(),
      title: store.value,
      completed: false,
    };
    store.value = '';
  }),
});
