import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  redirectTo = '/login'

  async handle({ session, response }: HttpContext, next: NextFn) {
    const user = session.get('user')

    if (!user) {
      return response.redirect(this.redirectTo)
    }

    // lanjut ke next middleware/controller
    await next()
  }
}

