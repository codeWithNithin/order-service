export type AuthCookie = {
    accessToken: string
}

export interface AuthRequest {
    sub: string
    role: string
    id?: string
    tenant: string
    firstName: string
    lastName: string
    email: string
}
