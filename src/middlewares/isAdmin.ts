import { NextFunction, Request, Response } from "express";
import prismaCLiente from "../prisma";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.user_id;

  if (!userId) {
    res.status(401).json({
      error: "Usuário sem permissão",
    });
    return;
  }

  const user = await prismaCLiente.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(401).json({
      error: "Usuário sem permissão",
    });

    return;
  }

  if (user?.role !== "ADMIN") {
    res.status(401).json({
      error: "Usuário sem permissão",
    });

    return;
  }

  //Usuário é admin... então pode seguir

  next();
};
