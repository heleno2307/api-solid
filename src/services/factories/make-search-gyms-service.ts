import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsService } from '../search-gyms.service'

export function makeFetchNearByGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsService = new SearchGymsService(gymsRepository)
  return searchGymsService
}
