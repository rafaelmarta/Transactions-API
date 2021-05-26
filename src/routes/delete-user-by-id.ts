import express from "express";
import listOfUsers from "../index";

function deleteUserById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { id }: { id?: string } = request.params;

  const userIndex = listOfUsers.findIndex((f) => {
    return f.id === id;
  });

  if (userIndex === -1) {
    return response.status(404).json({
      msg: "Usuário não encontrado",
    });
  }

  const userDelete = listOfUsers.splice(userIndex, 1);

  next();
  return response.status(200).json(userDelete);
}

export default deleteUserById;
