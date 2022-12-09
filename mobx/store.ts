import { makeAutoObservable } from 'mobx';

export const store = (value: any) => {
  console.log('rendfsd');
  return makeAutoObservable({
    value: value,
    get getterValue() {
      return this.value;
    },
    set setterValue(newValue: any) {
      this.value = { ...newValue };
      console.log(this.value);
    },
  });
};
