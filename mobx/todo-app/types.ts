export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}
export interface IDataProp {
  new: Array<ITodo>;
  completed: Array<ITodo>;
}
