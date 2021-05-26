import express from "express";
import listOfUsers from "../index";

function findTransactionById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { userId, id }: { userId?: string; id?: string } = request.params;

  const userIndex = listOfUsers.findIndex((f) => {
    return f.id === userId;
  });

  const transactions = listOfUsers[userIndex].transactions.find(
    (transactions: any) => transactions.id === id
  );

  if (!transactions) {
    return response.status(404).json({
      msg: "ID transactions não encontrado.",
    });
  }
  next();

  return response.status(200).json(transactions);
}

export default findTransactionById;
