import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile.service'
import { ResourceNotFound } from './erros/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await inMemoryUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          userId: 'wrong user-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
