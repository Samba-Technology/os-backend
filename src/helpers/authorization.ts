import { Role } from '@prisma/client';

export function isAdmin(role: string) {
  if (role === Role.ADMIN) {
    return true;
  }
  return false;
}

export function isUser(role: string) {
  if (role === Role.USER || role === Role.ADMIN) {
    return true;
  }
  return false;
}
