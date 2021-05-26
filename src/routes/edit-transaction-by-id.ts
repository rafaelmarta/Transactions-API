import express from "express";
import listOfUsers from "../index";

function editTransactionById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { userId, id }: { userId?: string; id?: string } = request.params;
  const { title, value, type }: { title: string; value: number; type: string } =
    request.body;

  const typeIncomeOrOutcome = type.toLowerCase();
  if (typeIncomeOrOutcome !== "income") {
    if (typeIncomeOrOutcome !== "outcome") {
      return response.status(404).json({
        msg: "Type deve ser 'income' ou 'outcome'.",
      });
    }
  }

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

  transactions.title = title;
  transactions.value = value;
  transactions.type = typeIncomeOrOutcome;
  next();
  return response.status(200).json(transactions);
}

export default editTransactionById;
