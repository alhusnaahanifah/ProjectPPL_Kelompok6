/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// start/routes.ts
import router from '@adonisjs/core/services/router'
import hash from '@adonisjs/core/services/hash'

// Benar:
router.on('/').renderInertia('LandingPage')
router.on('/plant-quiz').renderInertia('PlantQuiz')
router.on('/7-day-challenge').renderInertia('SevenDayChallenge')
router.on('/guides').renderInertia('Guides')
// router.on('/login').renderInertia('Auth/Login')
// router.on('/signup').renderInertia('AuthPages')
// router.on('/dash').renderInertia('Dashboard')

import AuthController from '#controllers/auth_controller'
router.post('/login', [AuthController, 'login'])
// router.get('/login', async ({ inertia }) => {
//   return inertia.render('Auth/Login', {
//     isLogin: true,
//   })
// })

router.get('/login', async ({ inertia }) => {
  return inertia.render('Auth/Login') // atau 'Auth/Login' sesuai lokasi file
})



router.get('/logout', [AuthController, 'logout'])


router.get('/signup', async ({ inertia }) => {
    return inertia.render('Auth/Signup') // gunakan page yang sama (AuthPages.vue)
  })
  
router.post('/signup', [AuthController, 'signup'])


router.get('/dashboard', async ({ auth, inertia, response }) => {
  try {
    await auth.use('web').authenticate()
    return inertia.render('Dashboard')
  } catch {
    return response.redirect('/login')
  }
})

router.get('/profile', async ({ auth, inertia, response }) => {
  try {
    await auth.use('web').authenticate()
    return inertia.render('Profile', {
      user: auth.user,
    })
  } catch {
    return response.redirect('/login')
  }
})

router.post('/profile/update', async ({ auth, request, response }) => {
  try {
    await auth.use('web').authenticate()
    const user = auth.user!

    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

    user.fullName = fullName
    user.email = email
    if (password) {
      user.password = await hash.use('scrypt').make(password)
    }

    await user.save()

    return response.redirect().back()
  } catch {
    return response.redirect('/profile') // ✅ Inertia-compatible
  }
})

router.get('/profile/edit', async ({ auth, inertia, response }) => {
  try {
    await auth.use('web').authenticate()
    return inertia.render('ProfileEdit', {
      user: auth.user,
    })
  } catch {
    return response.redirect('/profile')
  }
})



