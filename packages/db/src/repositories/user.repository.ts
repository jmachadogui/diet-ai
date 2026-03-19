import { prisma } from '../client'
import type { Prisma } from '../generated/client'

export function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data })
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data })
}
