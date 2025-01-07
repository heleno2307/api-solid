import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckinService } from '../validate-check-in.service'

export function makeCheckInService() {
  const checkInsPrismaRepository = new PrismaCheckInsRepository()

  const validateCheckinService = new ValidateCheckinService(
    checkInsPrismaRepository,
  )

  return validateCheckinService
}
