import prismaCLiente from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    try {
      const user = await prismaCLiente.user.findFirst({
        where: {
          id: user_id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          created_at: true,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao detalhar o usuário");
    }
  }
}

export { DetailUserService };
