import { v4 as uuidv4 } from "uuid";

class Transaction {
  readonly id: string;
  title: string;
  value: number;
  type: string;

  constructor(title: string, value: number, type: string) {
    this.id = uuidv4();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
