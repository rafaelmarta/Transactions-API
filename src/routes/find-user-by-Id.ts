import express from "express";
import listOfUsers from "../index";

function findUserById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { id }: { id?: string } = request.params;

  if (!id) {
    return response.status(400).json({
      msg: "ID deve ser informado.",
    });
  }

  const searchUserById = listOfUsers.find((f) => {
    return f.id === id;
  });

  if (!searchUserById) {
    return response.status(404).json({
      msg: "ID do usuário não encontrado.",
    });
  }

  next();
  return response.status(200).json({
    data: searchUserById?.getUser(),
  });
}

export default findUserById;
