import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterService {
  name: string
  email: string
  password: string
}

export async function registerService({
  email,
  name,
  password,
}: RegisterService) {
  const passwordHash = await hash(password, 6)
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: passwordHash,
    },
  })
}
