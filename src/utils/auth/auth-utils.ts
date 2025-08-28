import type { LiteUser } from '@/types/User.type'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function generateToken(
  user: LiteUser,
  rememberMe = false
): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  const secret = new TextEncoder().encode(JWT_SECRET)
  const expirationTime = getRememberMeTime(rememberMe).ttl

  return await new SignJWT({
    id: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(secret)
}

export async function verifyToken(
  token: string
): Promise<{ id: string; email: string } | null> {
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    return {
      id: payload.id as string,
      email: payload.email as string,
    }
  } catch {
    return null
  }
}

export const getRememberMeTime = (
  rememberMe: boolean
): { number: number; ttl: string } => {
  return rememberMe
    ? { number: 30 * 24 * 60 * 60, ttl: '30d' }
    : { number: 24 * 60 * 60, ttl: '24h' }
}
