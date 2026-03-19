import { prisma } from '../client'

export function upsertIdentity(data: {
  platform: string
  platformUserId: string
  userId: string
  linkedAt?: Date
  lastSeenAt?: Date
  isPrimary?: boolean
}) {
  return prisma.userIdentity.upsert({
    where: { platform_platformUserId: { platform: data.platform, platformUserId: data.platformUserId } },
    create: data,
    update: { lastSeenAt: data.lastSeenAt, isPrimary: data.isPrimary },
  })
}

export function findIdentity(platform: string, platformUserId: string) {
  return prisma.userIdentity.findUnique({
    where: { platform_platformUserId: { platform, platformUserId } },
  })
}
