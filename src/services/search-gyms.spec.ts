import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsService } from './search-gyms.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gmys-repository'

let inMemoryGymsRepository: InMemoryGymsRepository

let sut: SearchGymsService

describe('Search Gyms Service.', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(inMemoryGymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      id: 'user-1',
      latitude: 0,
      longitude: 0,
      title: 'Test gym',
    })

    await inMemoryGymsRepository.create({
      id: 'user-1',
      latitude: 0,
      longitude: 0,
      title: 'JavaScript Gym',
    })

    const { gyms } = await sut.execute({
      query: 'Test gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Test gym',
      }),
    ])
  })

  it('should be able to paginated paginated gyms search.', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        id: 'user-1',
        latitude: 0,
        longitude: 0,
        title: `Test gym - ${i}`,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Test gym',
      page: 2,
    })

    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Test gym - 21',
      }),
      expect.objectContaining({
        title: 'Test gym - 22',
      }),
    ])
  })
})
