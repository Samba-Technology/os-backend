import { Role } from "@prisma/client"

export function isAdmin(role: String) {
  if (role === Role.ADMIN) {
    return true
  }
  return false
}

export function isUser(role: String) {
  if (role === Role.USER || role === Role.ADMIN) {
    return true
  }
  return false
}