import { Request, Response } from "express";
import { CreateAuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new CreateAuthUserService();
    const session = await authUserService.execute({ email, password });

    res.json(session);
  }
}

export { AuthUserController };
