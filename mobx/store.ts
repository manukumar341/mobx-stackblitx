import { action, makeAutoObservable } from 'mobx';
console.log('store');

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
