import express from "express";
import listOfUsers from "../index";

function validateEmail(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { email }: { email: string } = request.body;

  if (!email) {
    return response.status(400).json({
      msg: "Campo 'email' deve ser preenchido.",
    });
  }

  if (email.indexOf("@") == -1) {
    return response.status(400).json({
      msg: "Email inválido.",
    });
  }

  const verifyIfUsedEmail = listOfUsers.find((f) => {
    return f.email === email;
  });

  if (verifyIfUsedEmail) {
    return response.status(400).json({
      msg: "O 'email' informado já está em uso.",
    });
  }

  next();
}

export default validateEmail;
