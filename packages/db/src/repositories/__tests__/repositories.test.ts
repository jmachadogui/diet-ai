jest.mock('../../client')

import { prisma } from '../../client'
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../user.repository'
import {
  upsertIdentity,
  findIdentity,
} from '../userIdentity.repository'
import {
  createToken,
  findValidToken,
  markTokenUsed,
} from '../magicLinkToken.repository'
import {
  createLog,
  findLogsByUser,
} from '../log.repository'
import {
  createMealWithItems,
  findMealById,
} from '../meal.repository'
import {
  deleteMealItem,
  addMealItem,
} from '../mealItem.repository'
import { findCache, upsertCache } from '../apiCache.repository'
import {
  recordWeight,
  getWeightHistory,
} from '../userWeightHistory.repository'
import {
  createEditHistory,
  findEditsByMeal,
} from '../editHistory.repository'

const p = prisma as jest.Mocked<typeof prisma>

beforeEach(() => {
  jest.clearAllMocks()
})

describe('user.repository', () => {
  test('createUser calls prisma.user.create with data', async () => {
    const data = { email: 'a@b.com', passwordHash: 'hash' }
    ;(p.user.create as jest.Mock).mockResolvedValue({ id: '1', ...data })
    await createUser(data as any)
    expect(p.user.create).toHaveBeenCalledWith({ data })
  })

  test('findUserByEmail calls prisma.user.findUnique by email', async () => {
    ;(p.user.findUnique as jest.Mock).mockResolvedValue(null)
    await findUserByEmail('a@b.com')
    expect(p.user.findUnique).toHaveBeenCalledWith({ where: { email: 'a@b.com' } })
  })

  test('findUserById calls prisma.user.findUnique by id', async () => {
    ;(p.user.findUnique as jest.Mock).mockResolvedValue(null)
    await findUserById('123')
    expect(p.user.findUnique).toHaveBeenCalledWith({ where: { id: '123' } })
  })

  test('updateUser calls prisma.user.update', async () => {
    ;(p.user.update as jest.Mock).mockResolvedValue({})
    await updateUser('123', { email: 'new@b.com' })
    expect(p.user.update).toHaveBeenCalledWith({ where: { id: '123' }, data: { email: 'new@b.com' } })
  })
})

describe('userIdentity.repository', () => {
  test('upsertIdentity calls prisma.userIdentity.upsert', async () => {
    ;(p.userIdentity.upsert as jest.Mock).mockResolvedValue({})
    await upsertIdentity({ platform: 'telegram', platformUserId: 'tg1', userId: 'u1' })
    expect(p.userIdentity.upsert).toHaveBeenCalled()
  })

  test('findIdentity calls prisma.userIdentity.findUnique', async () => {
    ;(p.userIdentity.findUnique as jest.Mock).mockResolvedValue(null)
    await findIdentity('telegram', 'tg1')
    expect(p.userIdentity.findUnique).toHaveBeenCalledWith({
      where: { platform_platformUserId: { platform: 'telegram', platformUserId: 'tg1' } },
    })
  })
})

describe('magicLinkToken.repository', () => {
  test('createToken calls prisma.magicLinkToken.create', async () => {
    ;(p.magicLinkToken.create as jest.Mock).mockResolvedValue({})
    const data = { userId: 'u1', platform: 'telegram', token: 'tok', expiresAt: new Date(), user: { connect: { id: 'u1' } } }
    await createToken(data as any)
    expect(p.magicLinkToken.create).toHaveBeenCalledWith({ data })
  })

  test('findValidToken returns null for expired token', async () => {
    ;(p.magicLinkToken.findFirst as jest.Mock).mockResolvedValue(null)
    const result = await findValidToken('expired-tok')
    expect(result).toBeNull()
    expect(p.magicLinkToken.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ token: 'expired-tok', usedAt: null }) }),
    )
  })

  test('findValidToken returns null for already used token', async () => {
    ;(p.magicLinkToken.findFirst as jest.Mock).mockResolvedValue(null)
    const result = await findValidToken('used-tok')
    expect(result).toBeNull()
  })

  test('markTokenUsed calls prisma.magicLinkToken.update with usedAt', async () => {
    ;(p.magicLinkToken.update as jest.Mock).mockResolvedValue({})
    await markTokenUsed('tok-id')
    const call = (p.magicLinkToken.update as jest.Mock).mock.calls[0][0]
    expect(call.where).toEqual({ id: 'tok-id' })
    expect(call.data.usedAt).toBeInstanceOf(Date)
  })
})

describe('log.repository', () => {
  test('createLog calls prisma.log.create', async () => {
    ;(p.log.create as jest.Mock).mockResolvedValue({})
    const data = { userId: 'u1', platform: 'telegram', rawText: 'hi', processingStatus: 'pending', user: { connect: { id: 'u1' } } }
    await createLog(data as any)
    expect(p.log.create).toHaveBeenCalledWith({ data })
  })

  test('findLogsByUser calls findMany with orderBy createdAt desc', async () => {
    ;(p.log.findMany as jest.Mock).mockResolvedValue([])
    await findLogsByUser('u1')
    expect(p.log.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: 'desc' } }),
    )
  })
})

describe('meal.repository', () => {
  test('createMealWithItems calls prisma.$transaction and creates Meal and MealItems', async () => {
    const meal = { id: 'm1' }
    const item = { id: 'i1' }
    ;(p.$transaction as jest.Mock).mockImplementation(async (fn: any) => {
      const tx = {
        meal: { create: jest.fn().mockResolvedValue(meal) },
        mealItem: { create: jest.fn().mockResolvedValue(item) },
      }
      return fn(tx)
    })
    const mealData = { userId: 'u1', consumedAt: new Date() }
    const items = [{ foodName: 'apple', quantity: 1, unit: 'pc', meal: { connect: { id: 'm1' } } }]
    const result = await createMealWithItems(mealData as any, items as any)
    expect(p.$transaction).toHaveBeenCalled()
    expect(result.meal).toEqual(meal)
    expect(result.items).toEqual([item])
  })

  test('findMealById includes items', async () => {
    ;(p.meal.findUnique as jest.Mock).mockResolvedValue(null)
    await findMealById('m1')
    expect(p.meal.findUnique).toHaveBeenCalledWith({ where: { id: 'm1' }, include: { items: true } })
  })
})

describe('mealItem.repository', () => {
  test('addMealItem calls prisma.mealItem.create', async () => {
    ;(p.mealItem.create as jest.Mock).mockResolvedValue({})
    const data = { foodName: 'banana', quantity: 1, unit: 'pc', meal: { connect: { id: 'm1' } } }
    await addMealItem(data as any)
    expect(p.mealItem.create).toHaveBeenCalledWith({ data })
  })

  test('deleteMealItem calls prisma.mealItem.delete', async () => {
    ;(p.mealItem.delete as jest.Mock).mockResolvedValue({})
    await deleteMealItem('i1')
    expect(p.mealItem.delete).toHaveBeenCalledWith({ where: { id: 'i1' } })
  })
})

describe('apiCache.repository', () => {
  test('findCache returns null when expiresAt is in the past', async () => {
    ;(p.apiCache.findFirst as jest.Mock).mockResolvedValue(null)
    const result = await findCache('hash123')
    expect(result).toBeNull()
    const call = (p.apiCache.findFirst as jest.Mock).mock.calls[0][0]
    expect(call.where.normalizedQueryHash).toBe('hash123')
    expect(call.where.expiresAt.gt).toBeInstanceOf(Date)
  })

  test('upsertCache calls prisma.apiCache.upsert', async () => {
    ;(p.apiCache.upsert as jest.Mock).mockResolvedValue({})
    const data = {
      vendor: 'fatsecret',
      queryString: 'apple',
      normalizedQueryHash: 'hash123',
      nutritionData: {},
      expiresAt: new Date(),
    }
    await upsertCache(data as any)
    expect(p.apiCache.upsert).toHaveBeenCalled()
  })
})

describe('userWeightHistory.repository', () => {
  test('recordWeight calls prisma.userWeightHistory.create', async () => {
    ;(p.userWeightHistory.create as jest.Mock).mockResolvedValue({})
    await recordWeight('u1', 75.5, 'manual')
    expect(p.userWeightHistory.create).toHaveBeenCalledWith({
      data: { userId: 'u1', weightKg: 75.5, source: 'manual' },
    })
  })

  test('getWeightHistory orders by recordedAt desc', async () => {
    ;(p.userWeightHistory.findMany as jest.Mock).mockResolvedValue([])
    await getWeightHistory('u1')
    expect(p.userWeightHistory.findMany).toHaveBeenCalledWith({
      where: { userId: 'u1' },
      orderBy: { recordedAt: 'desc' },
    })
  })
})

describe('editHistory.repository', () => {
  test('createEditHistory calls prisma.editHistory.create', async () => {
    ;(p.editHistory.create as jest.Mock).mockResolvedValue({})
    const data = { editType: 'update', user: { connect: { id: 'u1' } }, meal: { connect: { id: 'm1' } } }
    await createEditHistory(data as any)
    expect(p.editHistory.create).toHaveBeenCalledWith({ data })
  })

  test('findEditsByMeal orders by changedAt desc', async () => {
    ;(p.editHistory.findMany as jest.Mock).mockResolvedValue([])
    await findEditsByMeal('m1')
    expect(p.editHistory.findMany).toHaveBeenCalledWith({
      where: { mealId: 'm1' },
      orderBy: { changedAt: 'desc' },
    })
  })
})
