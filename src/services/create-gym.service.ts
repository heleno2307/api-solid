import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymServiceRequest {
  title: string
  description?: string | null
  latitude: number
  longitude: number
  phone?: string | null
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gmysRepository: GymsRepository) {}

  async execute({
    latitude,
    longitude,
    title,
    description,
    phone,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gmysRepository.create({
      latitude,
      longitude,
      title,
      description,
      phone,
    })
    return {
      gym,
    }
  }
}
