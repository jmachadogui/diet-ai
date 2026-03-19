import { prisma } from '../client'

export function recordWeight(userId: string, weightKg: number, source?: string) {
  return prisma.userWeightHistory.create({ data: { userId, weightKg, source } })
}

export function getWeightHistory(userId: string) {
  return prisma.userWeightHistory.findMany({
    where: { userId },
    orderBy: { recordedAt: 'desc' },
  })
}
