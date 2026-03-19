import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export function updateMealItem(id: string, data: Prisma.MealItemUpdateInput) {
  return prisma.mealItem.update({ where: { id }, data })
}

export function deleteMealItem(id: string) {
  return prisma.mealItem.delete({ where: { id } })
}

export function addMealItem(data: Prisma.MealItemCreateInput) {
  return prisma.mealItem.create({ data })
}
