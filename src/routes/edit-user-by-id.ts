import express from "express";
import listOfUsers from "../index";

function editUserById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { name, email }: { name: string; email: string } = request.body;

  if (!name) {
    return response.status(400).json({
      msg: "Campo 'name' deve ser preenchido.",
    });
  }

  if (name.trim().length < 3) {
    return response.status(400).json({
      msg: "Campo 'name' deve conter no mínimo 3 caracteres.",
    });
  }

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

  const { id }: { id?: string } = request.params;

  const changeUserInfoById = listOfUsers.find((f) => {
    return f.id === id;
  });

  if (!changeUserInfoById) {
    return response.status(404).json({
      msg: "ID do usuário não encontrado.",
    });
  }

  changeUserInfoById.name = name;
  changeUserInfoById.email = email;
  next();
  return response.status(200).json(changeUserInfoById);
}

export default editUserById;
