import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsService } from '../fetch-nearby-gyms.service'

export function makeFetchNearByGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearByGymsService = new FetchNearbyGymsService(gymsRepository)
  return fetchNearByGymsService
}
