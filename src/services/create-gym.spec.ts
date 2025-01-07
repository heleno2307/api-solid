import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gmys-repository'
import { CreateGymService } from './create-gym.service'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(inMemoryGymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      latitude: 0,
      longitude: 0,
      title: 'Gym test',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
