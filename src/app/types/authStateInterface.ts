import { role } from '../shared/types/currentRoleInterface'

export interface AuthStateInterface {
    phone: string
    status: 'login' | 'verify' | 'register'
    name: string
    user: 'parent' | 'student' | null
    token: string
    role: role
}
