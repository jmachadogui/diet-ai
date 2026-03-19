import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export async function createMealWithItems(
  mealData: Prisma.MealUncheckedCreateWithoutItemsInput,
  items: Prisma.MealItemCreateWithoutMealInput[],
) {
  return prisma.$transaction(async (tx) => {
    const meal = await tx.meal.create({ data: mealData })
    const created = await Promise.all(
      items.map((item) => tx.mealItem.create({ data: { ...item, mealId: meal.id } })),
    )
    return { meal, items: created }
  })
}

export function findMealsByDay(userId: string, date: Date) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)
  return prisma.meal.findMany({
    where: { userId, consumedAt: { gte: start, lte: end } },
    include: { items: true },
  })
}

export function findMealById(id: string) {
  return prisma.meal.findUnique({ where: { id }, include: { items: true } })
}

export function updateMealTotals(
  id: string,
  totals: Pick<Prisma.MealUpdateInput, 'totalCalories' | 'totalProteinG' | 'totalCarbsG' | 'totalFatG'>,
) {
  return prisma.meal.update({ where: { id }, data: totals })
}

export function deleteMeal(id: string) {
  return prisma.meal.delete({ where: { id } })
}
