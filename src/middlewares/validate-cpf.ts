import express from "express";
import listOfUsers from "../index";

function validateCPF(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { cpf }: { cpf: string } = request.body;

  if (!cpf) {
    return response.status(400).json({
      msg: "Campo 'CPF' deve ser preenchido.",
    });
  }

  if (cpf.length !== 11) {
    return response.status(400).json({
      msg: "Número de CPF inválido",
    });
  }

  const verifyIfUsedCPF = listOfUsers.find((f) => {
    return f.cpf === cpf;
  });

  if (verifyIfUsedCPF) {
    return response.status(400).json({
      msg: "O CPF informado já está em uso.",
    });
  }

  next();
}

export default validateCPF;
