import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  async handle({ session, response }: HttpContext, next: () => Promise<void>, allowedRoles: string[]) {
    const user = session.get('user')

    if (!user) {
      return response.redirect('/login')
    }

    if (!allowedRoles.includes(user.role)) {
      // Redirect ke dashboard sesuai role masing-masing
      const fallback = user.role === 'admin' ? '/DashboardAdmin' : '/dashboard'
      return response.redirect(fallback)
    }

    await next()
  }
}