import express from "express";
import listOfUsers from "../index";

function deleteTransactionById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { userId, id }: { userId?: string; id?: string } = request.params;

  const userIndex = listOfUsers.findIndex((f) => {
    return f.id === userId;
  });

  if (userIndex === -1) {
    return response.status(404).json({
      msg: "Usuário não encontrado.",
    });
  }

  const userTransaction = listOfUsers[userIndex].transactions;
  const searchUserTransaction = userTransaction.findIndex(
    (f: { id: string }) => f.id === id
  );

  if (searchUserTransaction === -1) {
    return response.status(404).json({
      msg: "Transação não encontrada.",
    });
  }

  const transactions = userTransaction.splice(searchUserTransaction, 1);

  return response.status(200).json(transactions);
}

export default deleteTransactionById;
