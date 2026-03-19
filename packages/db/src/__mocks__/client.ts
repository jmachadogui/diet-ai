export const prisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  userIdentity: {
    upsert: jest.fn(),
    findUnique: jest.fn(),
  },
  magicLinkToken: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  log: {
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  meal: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  mealItem: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  apiCache: {
    findFirst: jest.fn(),
    upsert: jest.fn(),
  },
  userWeightHistory: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  editHistory: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  $transaction: jest.fn(),
}
