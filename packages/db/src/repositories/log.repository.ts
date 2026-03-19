import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export function createLog(data: Prisma.LogCreateInput) {
  return prisma.log.create({ data })
}

export function updateLog(id: string, data: Prisma.LogUpdateInput) {
  return prisma.log.update({ where: { id }, data })
}

export function findLogsByUser(
  userId: string,
  options?: { from?: Date; to?: Date; limit?: number },
) {
  return prisma.log.findMany({
    where: {
      userId,
      ...(options?.from || options?.to
        ? { createdAt: { gte: options?.from, lte: options?.to } }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: options?.limit,
  })
}
