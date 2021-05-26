import express from "express";

function validateTypeTransaction(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { type }: { type: string } = request.body;

  const typeIncomeOrOutcome = type.toLowerCase();

  if (!type) {
    return response.status(400).json({
      msg: "Campo 'type' deve ser preenchido.",
    });
  }

  if (typeIncomeOrOutcome !== "income") {
    if (typeIncomeOrOutcome !== "outcome") {
      return response.status(400).json({
        msg: "Type deve ser 'income' ou 'outcome'.",
      });
    }
  }

  next();
}

export default validateTypeTransaction;
