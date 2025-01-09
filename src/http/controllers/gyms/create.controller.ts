import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const crateGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, phone, title, latitude, longitude } =
    crateGymBodySchema.parse(request.body)

  // Inversão de dependências
  const createGymService = makeCreateGymService()

  await createGymService.execute({
    description,
    phone,
    title,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
