import express from "express";

function validateValueTransaction(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { value }: { value: number } = request.body;

  if (!value) {
    return response.status(400).json({
      msg: "Campo 'value' deve ser informado.",
    });
  }

  if (value < 0) {
    return response.status(400).json({
      msg: "O 'Value' informado deve ser maior que 0.",
    });
  }

  next();
}

export default validateValueTransaction;
