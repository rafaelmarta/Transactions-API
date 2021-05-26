import express from "express";
import listOfUsers from "../index";

function verifyIfUserExistsById(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const { userId }: { userId?: string } = request.params;

  const searchUserById = listOfUsers.find((f) => {
    return f.id === userId;
  });

  if (!searchUserById) {
    return response.status(404).json({
      msg: "ID do usuário não encontrado.",
    });
  }

  next();
}

export default verifyIfUserExistsById;
