import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics.service'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository

let sut: GetUserMetricsService

describe('Get User metrics Service.', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(inMemoryCheckInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-2',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
