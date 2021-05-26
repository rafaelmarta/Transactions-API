import express from "express";

function validateTitleTransaction(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { title }: { title: string } = request.body;

  if (!title) {
    return response.status(400).json({
      msg: "A transação deve contar um 'Title'.",
    });
  }

  next();
}

export default validateTitleTransaction;
