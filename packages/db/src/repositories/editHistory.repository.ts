import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export function createEditHistory(data: Prisma.EditHistoryCreateInput) {
  return prisma.editHistory.create({ data })
}

export function findEditsByMeal(mealId: string) {
  return prisma.editHistory.findMany({
    where: { mealId },
    orderBy: { changedAt: 'desc' },
  })
}
