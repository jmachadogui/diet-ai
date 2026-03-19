import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export function createToken(data: Prisma.MagicLinkTokenCreateInput) {
  return prisma.magicLinkToken.create({ data })
}

export function findValidToken(token: string) {
  return prisma.magicLinkToken.findFirst({
    where: { token, expiresAt: { gt: new Date() }, usedAt: null },
  })
}

export function markTokenUsed(id: string) {
  return prisma.magicLinkToken.update({ where: { id }, data: { usedAt: new Date() } })
}
