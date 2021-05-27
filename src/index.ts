// IMPORTS

import express, { Request, Response } from "express";

import validateName from "./middlewares/validate-name";
import validateCPF from "./middlewares/validate-cpf";
import validateAge from "./middlewares/validate-age";
import validateEmail from "./middlewares/validate-email";
import findUserById from "./routes/find-user-by-Id";
import editUserById from "./routes/edit-user-by-id";
import deleteUserById from "./routes/delete-user-by-id";
import Transaction from "./classes/transactions";
import User from "./classes/user";
import validateTypeTransaction from "./middlewares/validate-type-transaction";
import validateTitleTransaction from "./middlewares/validate-title-transaction";
import validateValueTransaction from "./middlewares/validate-value-transaction";
import verifyIfUserExistsById from "./middlewares/validate-exists-userId";
import findTransactionById from "./routes/find-transaction-by-id";
import findUserTotalTransaction from "./routes/find-user-total-transactions";
import editTransactionById from "./routes/edit-transaction-by-id";
import deleteTransactionById from "./routes/delete-transaction-by-id";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(process.env.PORT || 3000);

const listOfUsers: any[] = [];

// POST http://localhost:3000/users
app.post(
  "/users",
  validateName,
  validateCPF,
  validateEmail,
  validateAge,
  (request: Request, response: Response) => {
    const {
      name,
      cpf,
      email,
      age,
    }: { name: string; cpf: string; email: string; age: number } = request.body;

    const newUserCreate = new User(name, cpf, email, age);
    listOfUsers.push(newUserCreate);
    return response.status(200).json(newUserCreate);
  }
);

// GET http://localhost:3000/users/:id
app.get("/users/:id", findUserById, () => {});

// GET http://localhost:3000/users
app.get("/users", (request: Request, response: Response) => {
  return response.status(200).json({
    data: listOfUsers.map((m) => {
      return m.getUser();
    }),
  });
});

// PUT http://localhost:3000/users/:id
app.put("/users/:id", editUserById, () => {});

// DELETE http://localhost:3000/users/:id
app.delete("/users/:id", deleteUserById, () => {});

// POST http://localhost:3000/users/:userId/transactions
app.post(
  "/users/:userId/transactions",
  validateTypeTransaction,
  validateTitleTransaction,
  validateValueTransaction,
  verifyIfUserExistsById,
  (request: Request, response: Response) => {
    const { userId }: { userId?: string } = request.params;

    const {
      title,
      value,
      type,
    }: { title: string; value: number; type: string } = request.body;

    const addUserTransaction = listOfUsers.find((f) => {
      return f.id === userId;
    });

    addUserTransaction.transactions.push(new Transaction(title, value, type));
    return response.status(200).json(addUserTransaction);
  }
);

// GET http://localhost:3000/users/:userId/transactions/:id
app.get("/users/:userId/transactions/:id", findTransactionById, () => {});

// GET http://localhost:3000/users/:userId/transacations
app.get("/users/:userId/transactions", findUserTotalTransaction, () => {});

// PUT http://localhost:3000/users/:userId/transacations/:id
app.put("/users/:userId/transactions/:id", editTransactionById, () => {});

// DELETE http://localhost:3000/users/:userId/transacations/:id
app.delete("/users/:userId/transactions/:id", deleteTransactionById, () => {});

export default listOfUsers;
