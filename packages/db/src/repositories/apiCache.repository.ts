import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export function findCache(normalizedQueryHash: string) {
  return prisma.apiCache.findFirst({
    where: { normalizedQueryHash, expiresAt: { gt: new Date() } },
  })
}

export function upsertCache(data: Prisma.ApiCacheCreateInput) {
  return prisma.apiCache.upsert({
    where: { normalizedQueryHash: data.normalizedQueryHash },
    create: data,
    update: { nutritionData: data.nutritionData, fetchedAt: data.fetchedAt, expiresAt: data.expiresAt },
  })
}
