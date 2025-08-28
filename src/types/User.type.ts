export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface LiteUser {
  id: string
  email: string
}

export interface AuthUser extends User {
  password_hash?: string
}
