// ✅ Benar
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class ProfileController {
  public async update({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const fullName = request.input('fullName')
    const email = request.input('email')
    const password = request.input('password')

    user.fullName = fullName
    user.email = email
    if (password) {
      user.password = await hash.use('scrypt').make(password)
    }

    await user.save()

    return response.redirect('/profile') // atau response.redirect().toRoute('profile')
  }
}