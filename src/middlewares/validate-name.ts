import express from "express";

function validateName(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { name }: { name: string } = request.body;

  if (!name) {
    return response.status(400).json({
      msg: "Campo 'nome' deve ser preenchido.",
    });
  }

  if (name.trim().length < 3) {
    return response.status(400).json({
      msg: "Campo 'nome' deve conter no mínimo 3 caracteres.",
    });
  }

  next();
}

export default validateName;
