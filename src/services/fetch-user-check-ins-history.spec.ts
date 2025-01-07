import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history.service'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository

let sut: FetchUserCheckInsHistoryService

describe('Fetch User check-ins history service.', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(inMemoryCheckInsRepository)
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 2,
    })

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
      }),
    ])
  })

  it('should be able to fetch in history', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-2',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-1',
      }),
      expect.objectContaining({
        gym_id: 'gym-2',
      }),
    ])
  })
})
