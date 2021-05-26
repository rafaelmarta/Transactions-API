import { v4 as uuidv4 } from "uuid";
import Transaction from "./transactions";

class User {
  readonly id: string;
  name: string;
  readonly cpf: string;
  email: string;
  readonly age: number;
  transactions: Array<Transaction>;

  constructor(name: string, cpf: string, email: string, age: number) {
    this.id = uuidv4();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.age = age;
    this.transactions = [];
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      cpf: this.cpf,
    };
  }
}

export default User;
