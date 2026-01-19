import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaCLiente from "../../prisma";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

class CreateAuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const user = await prismaCLiente.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    // Gerar Token JWT

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
  }
}

export { CreateAuthUserService };
