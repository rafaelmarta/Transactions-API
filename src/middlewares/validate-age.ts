import express from "express";

function validateAge(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { age }: { age: number } = request.body;

  if (!age) {
    return response.status(400).json({
      msg: "Campo 'age' deve ser preenchido.",
    });
  }

  if (age < 0) {
    return response.status(400).json({
      msg: "Idade inválida",
    });
  }

  next();
}

export default validateAge;
