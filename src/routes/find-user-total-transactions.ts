import express from "express";
import listOfUsers from "../index";

function findUserTotalTransaction(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { userId }: { userId?: string } = request.params;

  const userIndex = listOfUsers.findIndex((f) => {
    return f.id === userId;
  });

  const transactions = listOfUsers[userIndex].transactions;

  if (!transactions) {
    return response.status(404).json({
      msg: "ID transactions não encontrado.",
    });
  }

  let totalCredits: number = 0;
  let totalIncome: number = 0;
  let totalOutcome: number = 0;

  transactions.forEach(({ value, type }: { value: number; type: string }) => {
    switch (type) {
      case "income":
        totalIncome += value;
        break;
      case "outcome":
        totalOutcome += value;
        break;
    }
    totalCredits = totalIncome - totalOutcome;
  });
  next();
  return response.status(200).json({
    transactions,
    balance: {
      "Total Recebido:": totalIncome,
      "Total Liquidado:": totalOutcome,
      "Total de Créditos:": totalCredits,
    },
  });
}

export default findUserTotalTransaction;
