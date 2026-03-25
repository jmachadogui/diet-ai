export { prisma } from './client'

export * from './repositories/user.repository'
export * from './repositories/userIdentity.repository'
export * from './repositories/magicLinkToken.repository'
export * from './repositories/log.repository'
export * from './repositories/meal.repository'
export * from './repositories/mealItem.repository'
export * from './repositories/apiCache.repository'
export * from './repositories/userWeightHistory.repository'
export * from './repositories/editHistory.repository'

export type {
  User,
  UserIdentity,
  MagicLinkToken,
  Log,
  Meal,
  MealItem,
  ApiCache,
  UserWeightHistory,
  EditHistory,
} from './generated/client'
