import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckinService } from '../check-in.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInService() {
  const checkInsPrismaRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const checkInService = new CheckinService(
    checkInsPrismaRepository,
    gymsRepository,
  )

  return checkInService
}
