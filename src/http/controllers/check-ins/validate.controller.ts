import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/services/erros/resource-not-found-error'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { LateCheckInValidationError } from '@/services/erros/late-check-in-validation-error'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  // Inversão de dependências
  const validateCheckinService = makeValidateCheckInService()

  try {
    await validateCheckinService.execute({
      checkInId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: 'Check-in not found' })
    }

    if (err instanceof LateCheckInValidationError) {
      return reply
        .status(400)
        .send({ message: 'Check-in is late for validation' })
    }

    throw err
  }
  return reply.status(204).send()
}
