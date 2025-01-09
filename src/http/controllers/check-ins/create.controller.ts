import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { ResourceNotFoundError } from '@/services/erros/resource-not-found-error'
import { MaxDistanceError } from '@/services/erros/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/services/erros/max-number-of-check-ins-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const crateCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = crateCheckInBodySchema.parse(request.body)

  // Inversão de dependências
  const checkInService = makeCheckInService()

  try {
    await checkInService.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: 'Gym not found' })
    }

    if (err instanceof MaxNumberOfCheckInsError) {
      return reply
        .status(400)
        .send({ message: 'Max number of check-ins reached' })
    }

    if (err instanceof MaxDistanceError) {
      return reply.status(400).send({ message: 'User is too far from the gym' })
    }

    throw err
  }
  return reply.status(201).send()
}
