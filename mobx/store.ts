import { action, makeAutoObservable } from 'mobx';
import { handleOnchange } from './functions';

export const store = (value: any) => {
  let val: string;

  return makeAutoObservable({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: true,
      },
    ],
    value: value,
    get getterValue() {
      return this.value;
    },
    set setterValue(newValue: any) {
      this.value = { ...newValue };
    },
    handleOnchange: (e: {
      target: { value: React.SetStateAction<string> };
    }) => {
      val = e.target.value;
      console.log(val);
    },
    handleOnclick() {
      this.value = val;
    },
  });
};
