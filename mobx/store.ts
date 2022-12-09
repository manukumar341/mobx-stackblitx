import { action, makeAutoObservable } from 'mobx';

export const store = makeAutoObservable({
  data: [],
  value: '',

  get getterValue() {
    return store.data;
  },

  set setterValue(newValue: any) {
    store.data.push(newValue);
  },

  handleOnchange: action((e: React.ChangeEvent<HTMLInputElement>) => {
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
