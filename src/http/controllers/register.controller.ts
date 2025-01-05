import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '@/services/register.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services/erros/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    // Inversão de dependências
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    await registerService.execute({
      email,
      name,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
